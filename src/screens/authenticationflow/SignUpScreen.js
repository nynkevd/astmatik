import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet, Button,
} from 'react-native';
import Constant from "expo-constants";
import axios from "axios";

import GlobalStyles from '../../constants/GlobalStyles';
import InputField from "../../components/InputField";
import AppButton from "../../components/AppButton";


const SignUpScreen = () => {
    const [firstname, onChangeFirstname] = React.useState('');
    const [lastname, onChangeLastname] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [repeatPassword, onChangeRepeatPassword] = React.useState('');
    const [asthmaType, onChangeAsthmaType] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = useState(false);

    const signupHandler = async () => {
        setError("bezig");
        let body = {
            firstname,
            lastname: lastname || null,
            email,
            password,
            asthmaType
        };

        setIsLoading(true);

        await axios({
            method: 'POST',
            url: `${Constants.manifest.extra.API_URL}/user/signup`,
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
            <Text style={GlobalStyles.titleText}>Welkom bij</Text>
            <Text style={GlobalStyles.appName}>Astmatik</Text>

            <InputField
                label="Voornaam *"
                value={firstname}
                onChange={onChangeFirstname}
            />

            <InputField
                label="Achternaam"
                value={lastname}
                onChange={onChangeLastname}
            />

            <InputField
                label="Email *"
                value={email}
                onChange={onChangeEmail}
            />

            <InputField
                label="Wachtwoord *"
                value={password}
                onChange={onChangePassword}
            />

            <InputField
                label="Wachtwoord herhalen *"
                value={repeatPassword}
                onChange={onChangeRepeatPassword}
            />

            {/*TODO: Willen we hier een dropdown van maken?*/}
            <InputField
                label="Type astma *"
                value={asthmaType}
                onChange={onChangeAsthmaType}
            />

            {error ? <Text style={GlobalStyles.errorText}> {error} </Text> : null}

            <AppButton
                onPress={signupHandler}
                text="registreren"
                accessibilityLabel="Registreren"
            />

            {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}

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
})

export default SignUpScreen;
