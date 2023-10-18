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
        justifyContent: 'center',
        alignItem: 'center',
        backgroundColor: '#E3F1DF'
    },
    msg: {
        paddingBottom: 15
    },
    topPart: {
        height: hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    top: {
        fontSize: 40,
        color: '#87332A',
        marginLeft: 100
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
        flex: 1

    },
    chatImg: {
        width: wp(10),
        height: wp(10),
    },
    chatpart: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        flex: 0.9,
        // backgroundColor:'red'
    },
    name: {
        fontSize: 18,
        // marginTop: 15
        // width:wp(40)
    },
    time: {
        marginTop: wp(5),
        // marginLeft: 180,
        // width:wp(20)
    },
    timepart: {
        flexDirection: 'row',
        flex: 0.55
    },
    lastmsgg:{
        flex:0.45
    },
    namepart:{
        // backgroundColor:'red',
        justifyContent:'flex-end',
        flex:0.7,
        // height:wp(17)
        // alignItems:'flex-start'
        
    },
    datepart:{
        // backgroundColor:'blue',
        fontSize:20,
        flex:0.3,
        marginLeft:40
    }


})


export default styles