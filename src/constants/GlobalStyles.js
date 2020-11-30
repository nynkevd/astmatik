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
    errorText: {
        color: 'red',
        marginVertical: 10,
    }
});