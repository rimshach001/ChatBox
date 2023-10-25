import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        flex:1,
        marginTop:20
    },
    top:{
        height:wp(10),
        alignItems:'center',
        justifyContent:'center'
    },
    topText:{
        fontSize:wp(5),
        color:'#87332A',
        fontWeight:'bold'
    },
    chats: {
        height: hp(10),
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#87332A',
        paddingHorizontal: 20,
        flex: 1,


    },
    chatImg: {
        width: wp(10),
        height: wp(10),
    },
   
    namepart:{
        // backgroundColor:'red',
        justifyContent:'flex-end',
        flex:0.8,
        marginLeft:wp(5)
        // height:wp(17)
        // alignItems:'flex-start'
        
    },
    createContainer:{
        // backgroundColor:'grey',
        height:wp(10),
        alignItems:'center',
        justifyContent:'center',
        marginVertical:wp(2)
    },
    createBtn:{
        backgroundColor:'#87332A',
        borderRadius:wp(3)
    },
    createText:{
        color:'white',
        paddingHorizontal:wp(4),
        paddingVertical:wp(2)
    }

})
export default styles