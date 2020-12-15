import {StyleSheet} from 'react-native';
import {COLORS} from "./Colors";

export default StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    titleText: {
        fontFamily: 'Roboto',
        fontSize: 28,
        textAlign: 'center',
        color: '#012D53'
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer:{
        minWidth: '100%',
        paddingHorizontal: 18,
        paddingBottom: 70,
        minHeight: '100%'
    },
    appName: {
        fontFamily: 'Roboto',
        fontSize: 28,
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#012D53',
        fontWeight: 'bold'
    },
    headline: {
        color: COLORS.darkBlue,
        fontSize: 16,
        marginTop: 25,
        fontWeight: "bold"
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 14,
        marginVertical: 5,
        color: COLORS.darkBlue,
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    },
    shadowed: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});
