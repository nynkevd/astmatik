import React, { useState } from 'react';
import {
    AsyncStorage,
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
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
    const [firstname, onChangeFirstname] = React.useState('');
    const [lastname, onChangeLastname] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [repeatPassword, onChangeRepeatPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const {signUp} = React.useContext(AuthContext);

    const signupHandler = async (firstname, lastname, email, password) => {
      try{
        await AsyncStorage.setItem('userFirstName', firstname);
        await AsyncStorage.setItem('userLastName', lastname);
        await AsyncStorage.setItem('userEmail', email);
      } catch(error){
        console.log(error);
      } finally {
        setTimeout(() => {
            navigation.navigate('Astma gegevens', {email, password});
        }, 200);
      }
    };

    return (
        <View style={GlobalStyles.container}>
          <MainLayout />
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer} >
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

            {/* {error ? <Text style={GlobalStyles.errorText}> {error} </Text> : null} */}

            <AppButton
                onPress={() => signupHandler(firstname,lastname,email,password)}
                text="registreren"
                accessibilityLabel="Registreren"
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
})

export default SignUpScreen;
