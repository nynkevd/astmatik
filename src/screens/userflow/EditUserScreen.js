import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
import {FontAwesome5} from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles'
import InputField from '../../components/InputField';
import AppButton from '../../components/AppButton';

import {AuthContext} from '../../context/context';

const EditUserScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [asthmaType, setAsthmaType] = useState(route.params.asthmaType);
  const {signOut, updateProfile,} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const handleSave = async (firstName, lastName, email, password, asthmaType) => {
    setIsLoading(true);
    updateProfile(firstName, lastName, email, password, asthmaType);
    setTimeout(() => {
        navigation.navigate('Profiel', {update: true, timestamp: Date.now()});
    }, 1000);
  }

  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
        <ScreenTitle
          title="Instellingen"
        />
        <TouchableOpacity onPress={signOut}>
          <FontAwesome5 name="sign-out-alt" size={22} color={COLORS.darkBlue}/>
        </TouchableOpacity>
        <InputField
          label="Voornaam"
          value={firstName}
          onChange={setFirstName}
        />

        <InputField
          label="Achternaam"
          value={lastName}
          onChange={setLastName}
        />

        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
        />

        <InputField
          label="Nieuw wachtwoord"
          value={password}
          onChange={setPassword}
        />

        <InputField
          label="Astma Type"
          value={asthmaType}
          onChange={setAsthmaType}
        />

        <AppButton
          text={'opslaan'}
          onPress={() => handleSave(firstName, lastName, email, password, asthmaType)}
        />

        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default EditUserScreen;
