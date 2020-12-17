import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';
import {OPTIONS} from '../../constants/Options';
import Dropdown from '../../components/Dropdown';
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
    //TODO: Je navigeert ALTIJD, ook als de request niet gelukt is...
    setTimeout(() => {
        navigation.navigate('Profiel', {update: true, timestamp: Date.now()});
    }, 1000);
  }

  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
        <View style={styles.titleContainer}>
          <ScreenTitle
            title="Instellingen"
          />
          <TouchableOpacity onPress={signOut}>
            <FontAwesome5 name="sign-out-alt" size={22} color={COLORS.darkBlue}/>
          </TouchableOpacity>
        </View>
        
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

        <Text style={GlobalStyles.label}>Astma type</Text>
        <Dropdown
          value={asthmaType}
          changeValue={setAsthmaType}
          list={OPTIONS.asthmaTypeOptions}
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default EditUserScreen;
