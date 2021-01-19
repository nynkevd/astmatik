import React, {useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import AppButton from '../../components/AppButton';
import InputField from '../../components/InputField';

import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';

const EditFeelingBad = ({route}) => {
  const navigation = useNavigation();

  const [lungMedic, setLungMedic] = useState(route.params.lungMedic);
  const [nrLungMedic, setNrLungMedic] = useState(route.params.nrLungMedic);
  const [locLungMedic, setLocLungMedic] = useState(route.params.locLungMedic);

  const [doc, setDoc] = useState(route.params.doc);
  const [nrDoc, setNrDoc] = useState(route.params.nrDoc);
  const [locDoc, setLocDoc] = useState(route.params.locDoc);

  const [contactPerson, setContactPerson] = useState(route.params.contactPerson);
  const [nrContactPerson, setNrContactPerson] = useState(route.params.nrContactPerson);
  const [locContactPerson, setLoccontactPerson] = useState(route.params.locContactPerson);

  const [isLoading, setIsLoading] = useState(false);
  const [updateState, setUpdateState] = useState(route.params.update);

  const handleConfirm = async () => {
    let body = {
      lungMedic,
      nrLungMedic,
      locLungMedic,
      doc,
      nrDoc,
      locDoc,
      contactPerson,
      nrContactPerson,
      locContactPerson,
    }
    setIsLoading(true);
    await AsyncStorage.setItem('ActionPlanBad', JSON.stringify(body));
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('Geen verbetering', {update: !updateState, timestamp: Date.now()});
    }, 250);
  }

  return(
    <View style={styles.container}>
    <MainLayout />
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <ScreenTitle
        title="Wijzig contactgegevens"
        subTitle="Wijzig hier de contactgegevens van uw artsen en contactpersoon. "
      />

      <InputField
        label="Longarts naam"
        value={lungMedic}
        onChange={setLungMedic}
      />

      <InputField
        label="Longarts nummer"
        value={nrLungMedic}
        keyboardType="phone-pad"
        onChange={setNrLungMedic}
      />

      <InputField
        label="Longarts locatie"
        value={locLungMedic}
        onChange={setLocLungMedic}
      />

      <View style={{marginVertical:15}}></View>

      <InputField
        label="Huisarts naam"
        value={doc}
        onChange={setDoc}
      />

      <InputField
        label="Huisarts nummer"
        value={nrDoc}
        keyboardType="phone-pad"
        onChange={setNrDoc}
      />

      <InputField
        label="Huisarts locatie"
        value={locDoc}
        onChange={setLocDoc}
      />

      <View style={{marginVertical:15}}></View>

      <InputField
        label="Contactpersoon naam"
        value={contactPerson}
        onChange={setContactPerson}
      />

      <InputField
        label="Contactpersoon nummer"
        value={nrContactPerson}
        keyboardType="phone-pad"
        onChange={setNrContactPerson}
      />

      <InputField
        label="Contactpersoon locatie"
        value={locContactPerson}
        onChange={setLoccontactPerson}
      />

      <View style={{marginVertical: 10}}></View>
      <AppButton
        text="opslaan"
        onPress={() => handleConfirm()}
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
    alignItems: 'center'
  },
  contentContainer:{
    paddingHorizontal: 18,
    paddingBottom: 70,
    minHeight: '100%'
  },
});

export default EditFeelingBad;
