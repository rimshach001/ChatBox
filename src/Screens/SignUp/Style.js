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
        marginTop: wp(7),
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
    LogoText: {
        fontSize: 22,
        width: wp(60),
        color: '#87332A',
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'center'
    },
    chats: {
        height: hp(10),
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#87332A',
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
    },
    name: {
        fontSize: 20,
        marginTop: 20
        // width:wp(40)
    },
    time: {
        marginTop: 25,
        marginLeft: 180,
        // width:wp(20)
    },
    timepart: {
        flexDirection: 'row',
        flex: 1
    }


})


export default styles