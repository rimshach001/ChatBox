import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, setDoc } from '@firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message';
// import Toast from 'react-native-root-toast';
import styles from './Style'
import { Image } from 'react-native'
import images from '../../Images/image'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import database from '@react-native-firebase/database'
import { get, getDatabase, onValue, ref, set } from '@firebase/database'
// import { v4 ,validate } from 'react-native-uuid';

const Signup = () => {
    const rtdatabase = getDatabase(app)
    const [currentUser, setCurrentUser] = useState("")
    const [Name, setName] = useState('')
    const [members, setMembers] = useState([]);
    const Navigation = useNavigation()
    // setMembers(Name)
    const fetchData = async () => {
        try {
            const chatListRef = ref(rtdatabase, 'ChatList');

            onValue(chatListRef, (snapshot) => {
                if (snapshot.exists()) {
                    const chatListData = snapshot.val();
                    // console.log('---Chat List Data:', chatListData);
                } else {
                    console.log('Chat List node does not exist or is empty.');
                }
            }, {
                onlyOnce: true,
            });

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const addData = async () => {
        try {
            const newDocData = {
                Name: Name,
                Time: new Date().getTime(),
                Messages: [],
                lastMsg: "",
                Members:[Name]
                // senderId:senderId
            };
            const userRef = ref(rtdatabase, 'ChatList/' + Name);

            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                console.log('Name document already exists.');
                const chatListData = snapshot.val();
                setCurrentUser(chatListData)
                // console.log('current:', chatListData.Name);
                Navigation.navigate("home", { data: chatListData })
            } else {
                await set(userRef, newDocData);
                // console.log('Document added with ID: ', Name);
                Navigation.navigate("home", { data: newDocData })
                // setShow(false);
                setName('');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage({
                message: 'Enter your Name first',
                type: 'warning',
            });
        }
    };


    return (
        <View style={{ backgroundColor: '#E3F1DF', flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 190 }}>
                <Image source={images.Logo} style={styles.logoImg} />
                <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.LogoText}>Connect easily with your friends and family over countries.</Text>
                </View>
                <TextInput style={{
                    borderWidth: 1, width: 200, marginVertical: 5, paddingLeft: 3,
                    borderColor: '#87332A', height: 50, width: 250, marginTop: 40, borderRadius: 20
                }}
                    placeholderTextColor='#87332A' placeholder=' Enter Name'
                    value={Name} onChangeText={setName} />
                <TouchableOpacity style={{
                    backgroundColor: '#87332A', width: 100, height: 40,
                    borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 20
                }} onPress={addData}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Welcome</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Signup