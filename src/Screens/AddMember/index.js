import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import images from '../../Images/image'
import { Alert } from 'react-native'
import { app } from '../../firebaseConfig'
import { get, getDatabase, ref, set } from '@firebase/database'
import { useNavigation } from '@react-navigation/native'

const AddGroupMember = ({ route }) => {
    const { data } = route.params
    const { logined } = route.params
    const LoginedUser=logined.Name
    const Navigation=useNavigation()
    console.log(LoginedUser,"logined user-----");
    const rtdatabase = getDatabase(app)
    const [member, addMember] = useState([LoginedUser])
    const [groupName, setGroupName]=useState('')
    // useEffect(() => {
    //     console.log(member, "member of group")
    // },[member])
    const filteredData = data.filter(item => !item.Members);

    const Add = (name) => {
        if (member.includes(name)) {
            Alert.alert(
                'Member Already Added',
                'This member is already in the group.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Member Already Added'),
                        style: 'cancel',
                    }
                ]
            );
        } else {
            Alert.alert(
                'Add Member to Group',
                'Would you like to add this member to the group?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Add New',
                        onPress: () => addNew(name),
                    },
                ]
            );
        }
    }
    
    const addNew = ((name) => {
        addMember([...member, name]);

    })
    // const makeGroup = async () => {
    //     try {
    //         const newDocData = {
    //             Name: groupName,
    //             Time: new Date().getTime(),
    //             Messages:[],
    //             lastMsg:""
    //             // senderId:senderId
    //         };
    //         const userRef = ref(rtdatabase, `ChatList/${logined}` + groupName);

    //         // const snapshot = await get(userRef);

    //         if (snapshot.exists()) {
    //             console.log('Name document already exists.');
    //             const chatListData = snapshot.val();
    //             setCurrentUser(chatListData)
    //             console.log('current:', chatListData.Name);
    //             Navigation.navigate("home",{data:chatListData})
    //         } else {
    //             await set(userRef, newDocData);
    //             console.log('Document added with ID: ', Name);
    //             Navigation.navigate("home",{data:newDocData})
    //             // setShow(false);
    //             setName('');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
            
    //     }
    // };
    const makeGroup = async () => {
        try {
            const newDocData = {
                Name: groupName, 
                Members: member,
                Time: new Date().getTime(),
                Messages: [],
                lastMsg: ""
            };
            
            // Assuming you want to create a new group under "ChatList" with the group name as the key
            const groupRef = ref(rtdatabase, `ChatList/${groupName}`);
    
            // Check if the group already exists
            const groupSnapshot = await get(groupRef);
    
            if (groupSnapshot.exists()) {
                console.log('Group document already exists.');
                const groupData = groupSnapshot.val();
                // Handle existing group data as needed
            } else {
                // If the group doesn't exist, create it
                await set(groupRef, newDocData);
                console.log('Group document added with ID: ', groupName);
                Navigation.navigate("home", { data: logined });
                // Clear the group name input field if needed: setGroupName('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.topText}>Add Member to Group</Text>
            </View>
            <View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.Name}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => Add(item.Name)}>
                        <View style={styles.chats}>
                            <View style={{ flex: 0.1 }}>
                                <Image source={images.user} style={styles.chatImg} />
                            </View>
                            <View style={styles.namepart}>
                                <Text style={styles.name}>{item.Name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                />
            </View>
            <View style={styles.createContainer}>
            <TextInput style={{
                    borderWidth: 1, width: 200, marginVertical: 5, paddingLeft: 3,
                    borderColor: '#87332A', height: 50, width: 250, marginTop: 40, borderRadius: 20
                }}
                    placeholderTextColor='#87332A' placeholder=' Enter Name'
                    value={groupName} onChangeText={setGroupName} />
                <TouchableOpacity onPress={()=>makeGroup()} style={styles.createBtn}>
                    <Text style={styles.createText}>Create Group</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddGroupMember