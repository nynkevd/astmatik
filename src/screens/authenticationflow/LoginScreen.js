import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import axios from 'axios';

import AppButton from "../../components/AppButton";
import InputField from "../../components/InputField";

import GlobalStyles from '../../constants/GlobalStyles';

const LoginScreen = () => {
    const API_URL = "https://astmatik-api.herokuapp.com/api";

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');

    const loginHandler = async () => {
        setError("nog geen error");
        let body = {
            email,
            password,
        };

        await axios({
            method: 'POST',
            url: `${API_URL}/user/login`,
            header: {
                'content-type': 'application/json'
            },
            data: body
        }).then((res) => {
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
