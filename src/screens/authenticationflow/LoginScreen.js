import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

import AppButton from "../../components/AppButton";
import InputField from "../../components/InputField";

import GlobalStyles from '../../constants/GlobalStyles';

const LoginScreen = () => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');

    const loginHandler = async () => {
        let body = {
            email,
            password,
        };

        await axios({
            method: 'POST',
            url: `${Constants.manifest.extra.API_URL}/user/login`,
            header: {
                'content-type': 'application/json'
            },
            data: body
        }).then((res) => {
            // TODO: Koppelen aan context/reducer of iets dergelijks van storage
            console.log(res.data.userId);
        }).catch((error) => {
            console.log(error.response.data);
            setError(error.response.data.message);
        })

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

            {error ? <Text style={GlobalStyles.errorText}> {error} </Text> : null}

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
    error: {
        color: 'red',
    }
})

export default LoginScreen;
