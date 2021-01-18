import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ContactCard from '../../components/ContactCard';
import ScreenTitle from '../../components/ScreenTitle';
import AppButton from '../../components/AppButton';

import { COLORS } from '../../constants/Colors';

const ActionPlanFeelingBad = ({route}) => {
  const navigation = useNavigation();

  const [lungMedic, setLungMedic] = useState("");
  const [nrLungMedic, setNrLungMedic] = useState("");
  const [locLungMedic, setLocLungMedic] = useState("");

  const [doc, setDoc] = useState("");
  const [nrDoc, setNrDoc] = useState("");
  const [locDoc, setLocDoc] = useState("");

  const [contactPerson, setContactPerson] = useState("");
  const [nrContactPerson, setNrContactPerson] = useState("");
  const [locContactPerson, setLoccontactPerson] = useState("");

  const settingsPress = () => {
      navigation.navigate("Wijzig gegevens", {update: false, lungMedic, nrLungMedic, locLungMedic, doc, nrDoc, locDoc, contactPerson, nrContactPerson,locContactPerson});
  }

  const [update, forceUpdate] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [hasUpdated, setHasUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!!route.params && route.params.update == true && lastUpdate !== route.params.timestamp) {
      setLastUpdate(route.params.timestamp);
      setHasUpdated(false);
  }

  if (!!route.params && route.params.update == true && hasUpdated == false) {
      forceUpdate(!update);
      setHasUpdated(true);
  }

  useEffect( () => {
    (async () =>{
      let data = await AsyncStorage.getItem('ActionPlanBad');
      if(data !== null){
        data = JSON.parse(data);
        setLungMedic(data.lungMedic);
        setNrLungMedic(data.nrLungMedic);
        setLocLungMedic(data.locLungMedic);
        setDoc(data.doc);
        setNrDoc(data.nrDoc);
        setLocDoc(data.locDoc);
        setContactPerson(data.contactPerson);
        setNrContactPerson(data.nrContactPerson);
        setLoccontactPerson(data.locContactPerson);
      }
    })();
  }, [update]);

  return(
    <View style={styles.container}>
    <MainLayout />
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <ScreenTitle
        title="Er is geen verbetering"
        subTitle="Klachten en/of peakflow verbeteren niet binnen 48 uur"
      />

      <TouchableOpacity style={styles.settingsButton} onPress={settingsPress}>
        <Feather name="settings" size={22} color={COLORS.darkBlue}/>
      </TouchableOpacity>

      <ActionCard
        bold
        planText="Neem direct contact op met uw longarts of huisarts"
        color={COLORS.orange}
      />
        <Text style={[styles.contactLabel, {marginTop: 30}]}>Longarts</Text>
      { lungMedic !== "" || nrLungMedic !== ""
        ?<>
          <ContactCard
            name={lungMedic}
            phoneNumber={nrLungMedic}
            location={locLungMedic}/>
        </>
        :<TouchableOpacity style={styles.cardContainer} onPress={() => settingsPress()}>
          <Text style={{fontSize: 16, color: COLORS.darkBlue, padding: 20,}}>Voeg meer informatie over uw longarts toe</Text>
         </TouchableOpacity>

      }
      <Text style={styles.contactLabel}>Huisarts</Text>
      { doc !== "" || nrDoc !== ""
        ? <>
          <ContactCard
            name={doc}
            phoneNumber={nrDoc}
            location={locDoc}/>
        </>
        :<TouchableOpacity style={styles.cardContainer} onPress={() => settingsPress()}>
          <Text style={{fontSize: 16, color: COLORS.darkBlue, padding: 20}}>Voeg meer informatie over uw huisarts toe</Text>
         </TouchableOpacity>
      }

      <Text style={styles.contactLabel}>Contactpersoon</Text>
      { contactPerson !== "" || nrContactPerson !== ''
        ?<>
          <ContactCard
            name={contactPerson}
            phoneNumber={nrContactPerson}
            location={locContactPerson}
            />
        </>
        :<TouchableOpacity style={styles.cardContainer} onPress={() => settingsPress()}>
          <Text style={{fontSize: 16, color: COLORS.darkBlue, padding: 20}}>Voeg informatie over uw contactpersoon toe</Text>
         </TouchableOpacity>
      }

      <View style={{marginVertical: 10}}></View>
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
  contactLabel:{
    marginTop: 15,
    fontSize: 16,
    color: COLORS.darkBlue
  },
  settingsButton: {
    position: 'absolute',
    right: 15,
    width: 30,
    top: 40
  },
  cardContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.orange,
    borderRadius: 10,
    marginVertical: 10
  },
});

export default ActionPlanFeelingBad;
