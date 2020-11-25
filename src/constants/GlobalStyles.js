import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
    inputWrapper: {
        margin: 15,
        alignSelf: 'stretch',
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 18,
        marginBottom: 8,
        color: '#012D53',
    },
    input: {
        height: 40,
        color: '#012D53',
        borderColor: '#012D53',
        borderWidth: 1,
        marginLeft: 0,
        borderRadius: 10,
        fontSize: 16,
        padding: 8,
        paddingLeft: 12,
    },
    buttonNormal: {
        backgroundColor: '#012D53',
        color: '#012D53'
    }

});