import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet, Button,
} from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import InputField from "../../components/InputField";
import AppButton from "../../components/AppButton";

const SignUpScreen = () => {

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [repeatPassword, onChangeRepeatPassword] = React.useState('');
    const [asthmaType, onChangeAsthmaType] = React.useState('');

    const signupHandler = async () => {
        let body = {
            email,
            password,
            repeatPassword,
            asthmaType
        }

        console.log(body);
    };

    return (
        <View style={styles.container}>
            <Text style={GlobalStyles.titleText}>Welkom bij</Text>
            <Text style={GlobalStyles.appName}>Astmatik</Text>

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

            <InputField
                label="Wachtwoord herhalen"
                value={repeatPassword}
                onChange={onChangeRepeatPassword}
            />

            {/*TODO: Willen we hier een dropdown van maken?*/}
            <InputField
                label="Type astma"
                value={asthmaType}
                onChange={onChangeAsthmaType}
            />

            <AppButton
                onPress={signupHandler}
                text="registreren"
                accessibilityLabel="Registreren"
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

export default SignUpScreen;
