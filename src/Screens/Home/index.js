import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Style'
import images from '../../Images/image';
import { Image } from 'react-native';
import { app, db } from '../../firebaseConfig';
import { collection, getDocs } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Database, get, getDatabase, onValue, ref } from '@firebase/database';
const Home = ({ route }) => {
  const { data } = route.params;
  console.log(data, "the person loginedddddd");
  const [docData, setDocData] = useState([]);
  const Navigation = useNavigation()
  const rtdatabase = getDatabase(app)
  // console.log(rtdatabase);
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {

  }, [docData])
  const fetchData = async () => {
    try {
      const chatListRef = ref(rtdatabase, 'ChatList');

      onValue(chatListRef, (snapshot) => {
        if (snapshot.exists()) {
          const chatListData = snapshot.val();
          setDocData(chatListData)
          console.log('---Chat List Data:', docData);
        } else {
          console.log('Chat List node does not exist or is empty.');
        }
      }, {
        onlyOnce: true,
      });
      console.log(chatListRef);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  const LoginUser = data
  const ChatOpen = ((name) => {
    Navigation.navigate("chat", { reciever: name, sender: data })
  })
  const LoginedUser = (() => {
    Alert.alert(data.Name, "is Loginned User")
  })
  const dateFormat = ((timestamp) => {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // Format the time into a string in the desired format (e.g., HH:mm:ss)
    return`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
  })
  const currentUserId = data.Name;
  const dataArray = Object.values(docData).filter(item => item.Name !== currentUserId);
  return (
    <View style={styles.Container}>
      <View style={styles.topPart}>
        <Text style={styles.top}>ChatBox</Text>
        <TouchableOpacity style={{
          height: 30, width: 60, marginLeft: 20, justifyContent: 'center',
          alignItems: 'center', marginTop: 10
        }} onPress={() => LoginedUser()}>
          <Image source={images.person} style={{ height: 30, width: 30, }} />
          <Text style={{ color: '#87332A', }}>{data.Name}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataArray}
        keyExtractor={(item) => item.Name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => ChatOpen(item.Name)}>
            <View style={styles.chats}>
              <View style={{ flex: 0.1 }}>
                <Image source={images.user} style={styles.chatImg} />
              </View>
              <View style={styles.chatpart}>
                <View style={styles.timepart}>
                  <View style={styles.namepart}>
                    <Text style={styles.name}>{item.Name}</Text>
                  </View>
                  <View style={styles.datepart}>
                    <Text style={styles.time}>{dateFormat(item.Time)}</Text>
                  </View>
                </View>
                <View style={styles.lastmsgg}>
                <Text style={styles.msg}>{item.lastMsg}</Text>
                </View>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Home