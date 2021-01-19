import React, { useState, useContext } from 'react';
import {
    AsyncStorage,
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Button,
} from 'react-native';
import Constants from "expo-constants";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import {COLORS} from '../../constants/Colors';
import MainLayout from '../../components/MainLayout';
import GlobalStyles from '../../constants/GlobalStyles';
import InputField from "../../components/InputField";
import AppButton from "../../components/AppButton";
import {AuthContext} from '../../context/context';

const SignUpScreen = () => {
    const [firstname, onChangeFirstname] = useState('');
    const [lastname, onChangeLastname] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [repeatPassword, onChangeRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const {signUp} = useContext(AuthContext);

    const signupHandler = async () => {
        await AsyncStorage.setItem('userFirstName', firstname);
        await AsyncStorage.setItem('userLastName', lastname);
        await AsyncStorage.setItem('userEmail', email);
        setTimeout(() => {
            navigation.navigate('Astma gegevens', {email, password});
        }, 500);
    };

    return (
        <View style={GlobalStyles.container}>
          <MainLayout />
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={GlobalStyles.contentContainer} >
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
                noCap
            />

            <InputField
                label="Wachtwoord *"
                value={password}
                onChange={onChangePassword}
                secure
                noCap
            />

            <InputField
                label="Wachtwoord herhalen *"
                value={repeatPassword}
                onChange={onChangeRepeatPassword}
                secure
                noCap
            />

            {/* {error ? <Text style={GlobalStyles.errorText}> {error} </Text> : null} */}

            <AppButton
                onPress={() => signupHandler()}
                text="registreren"
                accessibilityLabel="Registreren"
            />

            <Text style={{color: COLORS.darkBlue, marginTop: 10}}>* verplichte velden</Text>

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
})

export default SignUpScreen;
