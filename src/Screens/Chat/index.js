import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { app } from '../../firebaseConfig';
import { getDatabase, onValue, push, ref, set } from '@firebase/database';
import { FlatList } from 'react-native';

const Chat = ({ route }) => {
    const { reciever } = route.params;
    const { sender } = route.params;
    const Sender = sender.Name
    console.log(reciever, "---reciever---");
    console.log(Sender, "----sender-----");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const rtdb = getDatabase(app)
    const chatRef = ref(rtdb, `ChatList/${reciever}/Messages`);
    const lastChatRef = ref(rtdb, `ChatList/${reciever}/lastMsg`);
    console.log(chatRef, "AND", lastChatRef);
    useEffect(() => {
        onValue(chatRef, (snapshot) => {
            console.log(snapshot, "snapshotttttttt");
            if (snapshot.exists()) {
                const chatData = snapshot.val();
                const chatMessages = Object.values(chatData);
                setMessages(chatMessages);
                // console.log(chatRef, "--------");
            }
            // console.log("----end if----");
        });
    }, []);
    const dateFormat = ((timestamp) => {
        const date = new Date(timestamp);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    })
    // console.log(newMessage, "-------");
    const send = () => {
        const chatRoomRef1 = ref(rtdb, `ChatList/${reciever}/Messages`);
        const newMessageRef1 = push(chatRoomRef1);
        const chatRoomRef2 = ref(rtdb, `ChatList/${Sender}/Messages`);
        const newMessageRef2 = push(chatRoomRef2);
        const messageData = {
            text: newMessage,
            timestamp: new Date().getTime(),
            Sender: Sender,
            Reciever: reciever
        };
        set(newMessageRef1, messageData);
        set(newMessageRef2, messageData);
        const LastChatRef1 = ref(rtdb, `ChatList/${reciever}/lastMsg`);
        set(LastChatRef1, newMessage);
        const LastChatRef2 = ref(rtdb, `ChatList/${Sender}/lastMsg`);
        set(LastChatRef2, newMessage);
        setNewMessage('');
    };
    return (
        <View style={styles.Container}>
            <View style={styles.ChatWith}>
                <Text style={{ color: '#87332A', fontSize: 30, marginLeft: 10 }}> {reciever}</Text>
            </View>
            <View style={styles.MsgBox}>
                <View >
                    <FlatList
                        data={messages.filter(item => item.Sender === reciever || item.Sender === Sender)}
                        keyExtractor={(item, index) => index.toString()}

                        renderItem={({ item }) => {
                            console.log(item, "----sender----", item.Sender, "---reciever---", item.Reciever)
                            return (
                                <View style={{ flexDirection: item.Sender === Sender ? 'row-reverse' : 'row' }}>
                                    <View style={item.Sender === Sender ? styles.senderMessage : styles.receiverMessage}>
                                        <Text style={styles.messageText}>{item.text}</Text>
                                        <View style={styles.timeMsg}>
                                            <Text style={styles.timestamp}>{dateFormat(item.timestamp)}</Text>
                                        </View>
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

export default Chat