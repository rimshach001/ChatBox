import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// import { firebase } from "@react-native-firebase/auth";
import { getDatabase, onValue, ref } from "@firebase/database";
const firebaseConfig = {
  apiKey: 'AIzaSyB0sV8ztheOW3yNJwEgbD-t8bdGw4vjjpI',
  authDomain: 'chatbox-33520.firebaseapp.com',
  projectId: 'chatbox-33520',
  storageBucket: 'chatbox-33520.appspot.com',
  // messagingSenderId: '889678013137',
  appId: '1:504634071702:android:cde5bdd698979aa31240b7',
  // databaseURL: 'https://console.firebase.google.com/u/0/project/projectsigninexpo/database/projectsigninexpo-default-rtdb/data/~2F'
};
export const app = initializeApp(firebaseConfig)
// console.log(app, "okkkkk");

export const db = getFirestore(app)
// console.log(db, "db");

export const rtdb = getDatabase(app); // Initialize the Realtime Database
// console.log(rtdb, 'Realtime Database initialized');

// const chatListRef = ref(rtdb, 'ChatList');
// onValue(chatListRef, (snapshot) => {
//   if (snapshot.exists()) {
//     const chatListData = snapshot.val();
//     console.log('Chat List Data:', chatListData);
//   } else {
//     console.log('Chat List node does not exist or is empty.');
//   }
// }, {
//   onlyOnce: true, // This option makes sure the listener is triggered only once to retrieve the initial data.
// });