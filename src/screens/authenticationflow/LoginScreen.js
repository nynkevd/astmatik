import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

import AppButton from "../../components/AppButton";
import InputField from "../../components/InputField";

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

            <InputField
                label="Email"
                value={email}
                onChange={onChangeEmail}
            />

            <InputField
                label="Wachtwoord"
                value={password}
                onChange={onChangePassword}
            />

            <AppButton
                onPress={loginHandler}
                text="inloggen"
                accessibilityLabel="Login"
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
})

export default LoginScreen;
