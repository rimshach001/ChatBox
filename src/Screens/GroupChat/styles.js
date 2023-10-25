import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    Container: {
        width: wp(100),
        height: hp(100),
        backgroundColor: 'lightgrey',
        paddingTop: wp(7),
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#E3F1DF',
        flex:1
    },
    ChatWith:{
        borderBottomWidth:wp(0.5),
        borderBottomColor:'#87332A', 
        height:60, 
        justifyContent:'center',
         flex:0.07,
         alignItems:'center'
         },
    MsgBox:{
        flex:0.86,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        marginBottom:10,
        marginRight:10,
        marginLeft:10
    },
    MsgSend:{
        flex:0.07,
        // backgroundColor:'grey',
        borderWidth:wp(0.5),
        borderColor:'#87332A',
        marginBottom:wp(3) ,
        borderRadius:wp(8),
        flexDirection:'row'
    },
    typeMsg:{
        flex:0.8,
        marginLeft:wp(2),
        justifyContent:'center',
        // alignItems:'center',
    },
    sendMsg:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center',
        marginRight:wp(2)
        
        
    },
    // senderMessage:{
    //     backgroundColor:'red',
    //     height:wp(10),

    // },
    // receiverMessage:{
    //     backgroundColor:'grey',
    //     alignItems:'flex-start',
    //     justifyContent:'flex-start',
    //     height:wp(10),
    //     marginVertical:wp(1),
    //     paddingHorizontal:wp(1),
    //     alignContent:'center',

    // }
    senderMessage: {
        backgroundColor:'#87332A', // Customize the background color for sender messages
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'flex-end', // Right-align sender messages
        maxWidth: wp(70), // Adjust as needed
      },
    
      receiverMessage: {
        backgroundColor: 'grey', // Customize the background color for receiver messages
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'flex-start', // Left-align receiver messages
        maxWidth: wp(70), // Adjust as needed
      },
    
      messageText: {
        fontSize: 16,
        color: 'white', // Customize text color
      },
      messageSender: {
        fontSize: 12,
        color: 'white', // Customize text color
      },
      timestamp:{
        color:'white',
        // marginLeft:wp(10)
    },
    timeMsg:{
        //   backgroundColor:'red',
        alignItems:'flex-end',
      }
   

})


export default styles