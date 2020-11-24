import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

const LoginScreen = () => {

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welkom bij</Text>
            <Text style={styles.appName}> Astmatik</Text>

            <Text style={styles.label}> Email </Text>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeEmail(text)}
                value={email}
            />

            <Text style={styles.label}> Wachtwoord </Text>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangePassword(text)}
                value={password}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 28,
        textAlign: 'center',
    },
    appName: {
        fontFamily: 'Roboto',
        fontSize: 28,
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 18,
        alignSelf: 'stretch',
        marginLeft: 10,
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'stretch',
        margin: 10,
        marginLeft: 15,
        borderRadius: 5,
    }
})

export default LoginScreen;
