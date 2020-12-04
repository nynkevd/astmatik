import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

import AppButton from "../../components/AppButton";
import InputField from "../../components/InputField";
import {COLORS} from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState('false');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');

    const loginHandler = async () => {
        let body = {
            email,
            password,
        };
        setIsLoading(true);
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
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <MainLayout />
            <ScrollView contentContainerStyle={styles.contentContainer}>
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

                {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    error: {
        color: 'red',
    }
})

export default LoginScreen;
