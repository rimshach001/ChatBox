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
  // const groupsData=data.Groups;
  const [docData, setDocData] = useState([]);
  const [groupdata1, setgroupdata1]=useState([])
  const Navigation = useNavigation()
  // const [dataArray, setDataArray] = useState([]); 
  const rtdatabase = getDatabase(app)
  // setgroupdata1(data.Groups)
  // console.log(groupdata1, "the person loginedd groups");
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
          // console.log('---Chat List Data:', docData);
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
  const currentUserId = data.Name;
  // const filteredArray = Object.values(docData).filter(item => item.Name !== currentUserId);
  const filteredArray = Object.values(docData).filter(item => item.Name !== currentUserId);
  const filteredGroups = filteredArray.filter(group => group.Members && group.Members.includes(currentUserId));
  // const dataArray= filteredGroups

  const oneToOneChatArray = Object.values(docData).filter(chat => !chat.Members && chat.Name !== currentUserId);

// Combine the two arrays to get the final dataArray
const dataArray = filteredGroups.concat(oneToOneChatArray);
  console.log(dataArray,"---data array---");
  const ChatOpen = (item) => {
    // const receiverName = item.Members ? item.Members : item.Name;
    // console.log(receiverName,"---recieved name---");
    if(item.Members != null){
      Navigation.navigate("groupChat", { receiver: item, sender: data });
    }
    else{
      Navigation.navigate("chat", { receiver: item, sender: data });
    }
};

  const LoginedUser = (() => {
    Alert.alert(data.Name, "is Loginned User")
  })
  const addGroup=(()=>{
    Navigation.navigate("addGroupMember", {data: dataArray, logined:data})

  })
  const dateFormat = ((timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; 
  })
  return (
    <View style={styles.Container}>
      <View style={styles.topPart}>
      <TouchableOpacity style={{
          height: 30, width: 60, marginLeft: 20, justifyContent: 'center',
          alignItems: 'center', marginTop: 10
        }} onPress={() => addGroup()}>
          {/* <Image source={images.person} style={{ height: 30, width: 30, }} /> */}
          <Text style={{ color: '#87332A', }}>Add</Text>
        </TouchableOpacity>
        <Text style={styles.top}>ChatBox</Text>
        <TouchableOpacity style={{
          height: 30, width: 60, marginLeft: 30, justifyContent: 'center',
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
          <TouchableOpacity onPress={() => ChatOpen(item)}>
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
       {/* <FlatList
        data={groupdata1}
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
      /> */}
    </View>
  )
}

export default Home