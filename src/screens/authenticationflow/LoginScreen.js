import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import MainLayout from "../../components/MainLayout";
import AppButton from "../../components/AppButton";
import InputField from "../../components/InputField";
import {COLORS} from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';

import {AuthContext} from '../../context/context';

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigation = useNavigation();
    const {signIn} = React.useContext(AuthContext);

    const loginHandler = async (email, password) => {
      setIsLoading(true)
        signIn(email, password);
    };

    return (
        <View style={styles.container}>
            <MainLayout />
            <ScrollView contentContainerStyle={[GlobalStyles.contentContainer, {alignItems: 'center', justifyContent: 'center'}]}>
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

                {/* {error ? <Text style={GlobalStyles.errorText}> {error} </Text> : null} */}

                <AppButton
                    onPress={() => loginHandler(email, password)}
                    text="inloggen"
                />

              {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}

              <TouchableOpacity onPress={() => navigation.navigate('Registreren') } >
                <Text style={GlobalStyles.text}>Nog geen account? Registreer</Text>
              </TouchableOpacity>
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
