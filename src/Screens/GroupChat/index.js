import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { app } from '../../firebaseConfig';
import { getDatabase, onValue, push, ref, set } from '@firebase/database';
import { FlatList } from 'react-native';

const GroupChat = ({ route }) => {
    const { receiver } = route.params;
    const { sender } = route.params;
    const Sender = sender.Name
    const Receiver = receiver.Name
    // console.log(receiver, "---reciever---");
    // console.log(Sender, "----sender-----");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const rtdb = getDatabase(app)
    const chatRef = ref(rtdb, `ChatList/${Receiver}/Messages`);
    const lastChatRef = ref(rtdb, `ChatList/${Receiver}/lastMsg`);
    // console.log(chatRef, "AND", lastChatRef);
    // const isGroupChat = Array.isArray(receiver.Members); // Check if it's a group chat

    // useEffect(() => {
    //     if (isGroupChat) {
    //         receiver.Members
    //         console.log("its a group")
    //     } else {
    //         console.log("not group");
    //     }
    // }, [isGroupChat, receiver]);
    useEffect(() => {
        onValue(chatRef, (snapshot) => {
            // console.log(snapshot, "snapshotttttttt");
            if (snapshot.exists()) {
                const chatData = snapshot.val();
                const chatMessages = Object.values(chatData);
                setMessages(chatMessages);
                console.log(chatMessages, "--------");
            }
            // console.log("----end if----");
        });
    }, [receiver]);
    const dateFormat = ((timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    })
    // console.log(newMessage, "-------");
    const send = () => {
        const chatRoomRef1 = ref(rtdb, `ChatList/${Receiver}/Messages`);
        const newMessageRef1 = push(chatRoomRef1);
        // const chatRoomRef2 = ref(rtdb, `ChatList/${Sender}/Messages`);
        // const newMessageRef2 = push(chatRoomRef2);
        const messageData = {
            text: newMessage,
            timestamp: new Date().getTime(),
            Sender: Sender,
            Reciever: receiver.Name
        };
        set(newMessageRef1, messageData);
        // set(newMessageRef2, messageData);
        const LastChatRef1 = ref(rtdb, `ChatList/${Receiver}/lastMsg`);
        set(LastChatRef1, newMessage);
        // const LastChatRef2 = ref(rtdb, `ChatList/${Sender}/lastMsg`);
        // set(LastChatRef2, newMessage);
        setNewMessage('');
    };
    const detailOfChat = (() => {
        if (receiver.Members !== null && Array.isArray(receiver.Members)) {
            const membersList = receiver.Members.join('\n'); // Join members as a string
            Alert.alert('Members List', membersList);
        }
    })
    return (
        <View style={styles.Container}>
            <View style={styles.ChatWith}>
                <TouchableOpacity onPress={() => detailOfChat()}>
                    <Text style={{ color: '#87332A', fontSize: 30, marginLeft: 10 }}>Group {Receiver}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.MsgBox}>
                <View >
                    <FlatList
                        data={messages}
                        keyExtractor={(item, index) => index.toString()}

                        renderItem={({ item }) => {
                            console.log(item.Sender)
                            // console.log(item, "----sender----", item.Sender, "---reciever---", item.Reciever)
                            return (
                                <View style={{ flexDirection: item.Sender === Sender ? 'row-reverse' : 'row' }}>
                                    <View style={item.Sender === Sender ? styles.senderMessage : styles.receiverMessage}>
                                        <Text style={styles.messageText}>{item.text}</Text>
                                        <Text style={styles.messageSender}>{item.Sender}   {dateFormat(item.timestamp)}</Text>
                                        {/* <View style={styles.timeMsg}>
                                       
                                    <Text style={styles.timestamp}>{dateFormat(item.timestamp)}</Text>
                                  
                                        </View> */}
                                    </View>

                                </View>
                            )
                        }
                        }
                    />
                </View>
            </View>
            <View style={styles.MsgSend}>
                <View style={styles.typeMsg}>

                    <TextInput
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Type your message"
                    />
                </View>
                <View style={styles.sendMsg}>
                    <TouchableOpacity onPress={() => send()}>

                        <Text style={{ fontSize: 15, color: '#87332A', fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default GroupChat