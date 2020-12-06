import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
// import {FontAwesome5, Entypo, Feather, MaterialCommunityIcons} from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles'
import InputField from '../../components/InputField';
import AppButton from '../../components/AppButton';

const EditUserScreen = ({route}) => {
  const userId = "5fbfb5630c36fb00173a13d4";

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [asthmaType, setAsthmaType] = useState(route.params.asthmaType);

  const navigation = useNavigation();

  const handleSave = async (req, res) => {
    let body = {
      firstname: firstName,
      lastname: lastName || '',
      email,
      password: password || '',
      asthmaType
    }

    setIsLoading(true);
    await axios({
      method: 'PATCH',
      url: `${Constants.manifest.extra.API_URL}/user/edit/${userId}`,
      data: body
    }).then((res) => {
      console.log("success");
      navigation.navigate('Profiel', {update: true, timestamp: Date.now()});
    }).catch((error) => {
      console.log(error);
    });
    setIsLoading(false);
  }

  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
        <ScreenTitle
          title="Instellingen"
        />

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
          onPress={handleSave}        
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
