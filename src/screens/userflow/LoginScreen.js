import React from 'react';
import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';

const LoginScreen = () => {

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const loginHandler = async () => {
        let body = {
            email,
            password,
        }

        console.log(body);
    };

    return (
        <View style={styles.container}>
            <Text style={GlobalStyles.titleText}>Welkom bij</Text>
            <Text style={GlobalStyles.appName}> Astmatik</Text>

            <View style={GlobalStyles.inputWrapper}>
                <Text style={GlobalStyles.label}> Email </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                />
            </View>

            <View style={GlobalStyles.inputWrapper}>
                <Text style={GlobalStyles.label}> Wachtwoord </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={text => onChangePassword(text)}
                    value={password}
                />
            </View>

            <Button
                onPress={loginHandler}
                title="inloggen"
                accessibilityLabel="Login"
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
})

export default LoginScreen;
