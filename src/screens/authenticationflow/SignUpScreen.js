import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet, Button,
} from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';

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

            <View style={GlobalStyles.inputWrapper}>
                <Text style={GlobalStyles.label}> Wachtwoord herhalen </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={text => onChangeRepeatPassword(text)}
                    value={repeatPassword}
                />
            </View>

            <View style={GlobalStyles.inputWrapper}>
                <Text style={GlobalStyles.label}> Type astma </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={text => onChangeAsthmaType(text)}
                    value={asthmaType}
                />
            </View>

            <Button
                onPress={signupHandler}
                title="registreren"
                accessibilityLabel="Registreren"
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

export default SignUpScreen;
