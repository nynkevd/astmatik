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
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';
import { OPTIONS } from '../../constants/Options';
import Dropdown from '../../components/Dropdown';
import GlobalStyles from '../../constants/GlobalStyles'
import InputField from '../../components/InputField';
import AppButton from '../../components/AppButton';

import {AuthContext} from '../../context/context';

const EditUserScreen = ({route}) => {
  const [showPersonalSettings, setShowPersonalSettings] = useState(true);
  const [showTriggerSettings, setShowTriggerSettings] = useState(false);
  const [showMedicationSettings, setShowMedicationSettings] = useState(false);
  
  const [updateState, setUpdateState] = useState(route.params.update);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [asthmaType, setAsthmaType] = useState(route.params.asthmaType);

  const [allTriggers, setAllTriggers] = useState(OPTIONS.triggerOptions);
  const [allMedication, setAllMedication] = useState(OPTIONS.medicationOptions);
  const [currentTriggers, setCurrentTriggers] = useState(route.params.triggers || []);
  const [currentMedication, setCurrentMedication] = useState(route.params.medication || []);
  const [checked, setChecked] = useState(false);

  const {signOut, updateProfile} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const handleSave = async (firstName, lastName, email, password, asthmaType, triggers, medication) => {
    setIsLoading(true);
    console.log(medication);
    await updateProfile(firstName, lastName, email, password, asthmaType, triggers, medication);
    //TODO: Je navigeert ALTIJD, ook als de request niet gelukt is...
    setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Profiel', {update: !updateState, timestamp: Date.now()});
    }, 250);
    
  }

  const setActiveSettings = (selected) => {
    if (selected == 1) {
      setShowPersonalSettings(true);
      setShowTriggerSettings(false);
      setShowMedicationSettings(false);
    } else if (selected == 2) {
      setShowPersonalSettings(false);
      setShowTriggerSettings(true);
      setShowMedicationSettings(false);
    } else if (selected == 3) {
      setShowPersonalSettings(false);
      setShowTriggerSettings(false);
      setShowMedicationSettings(true);
    }
  }

  const checkTrigger = (id, name) => {
    if (currentTriggers.some(e => e.id === id)) {
      let newArray = currentTriggers;
      newArray.splice(newArray.findIndex(function(i){
        return i.id === id;
      }), 1);
      setCurrentTriggers(newArray);
    } else {
      let newArray = currentTriggers;
      newArray.push({id, name});
      setCurrentTriggers(newArray);
    }
    setChecked(!checked);
  }

  const checkMedication = (id, name) => {
    console.log(currentMedication);
    if (currentMedication.some(e => e.id === id)) {
      console.log("removing");
      let newArray = currentMedication;
      newArray.splice(newArray.findIndex(function(i){
        return i.id === id;
      }), 1);
      setCurrentMedication(newArray);
    } else {
      console.log("adding");
      let newArray = currentMedication;
      newArray.push({id, name});
      setCurrentMedication(newArray);
    }
    console.log(currentMedication);
    setChecked(!checked);
  }

  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={[GlobalStyles.contentContainer, styles.contentContainer]}>

        <View style={styles.titleContainer}>
          <ScreenTitle
            title="Instellingen"
          />
          <TouchableOpacity onPress={signOut}>
            <FontAwesome5 name="sign-out-alt" size={22} color={COLORS.darkBlue}/>
          </TouchableOpacity>
        </View>

        <View style={styles.tabNavigator}>
          <TouchableOpacity onPress={() => {setActiveSettings(1)}} style={[styles.tab, showPersonalSettings ? styles.tabSelected : null]}>
              <Text style={[styles.tabText, showPersonalSettings ? styles.tabTextSelected : null]}>persoonlijk</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {setActiveSettings(2)}} style={[styles.tab, showTriggerSettings ? styles.tabSelected : null, styles.middleTab]}>
              <Text style={[styles.tabText, showTriggerSettings ? styles.tabTextSelected : null]}>triggers</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {setActiveSettings(3)}} style={[styles.tab, showMedicationSettings ? styles.tabSelected : null]}>
              <Text style={[styles.tabText, showMedicationSettings ? styles.tabTextSelected : null]}>medicijnen</Text>
          </TouchableOpacity>
        </View> 
        
        {showPersonalSettings ? 
        <>
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
        </>
        : null}

        {showTriggerSettings ?
        <>
          {/* <Text style={GlobalStyles.text}>Triggers</Text> */}
          {
            allTriggers.map((trigger, index) =>
            <View key={index} style={styles.checkItem}>
              <CheckBox
                    tintColors={{true: COLORS.darkBlue}}
                    value={currentTriggers.some(e => e.id === trigger.db_id) ? true : false}
                    onValueChange={() => {checkTrigger(trigger.db_id, trigger.key)}}
                    />
              <Text style={GlobalStyles.text}> {trigger.key} </Text>
            </View>
            )
          }
        </>
        : null}
        
        {showMedicationSettings ?
        <>
          {/* <Text style={GlobalStyles.text}>Medicijnen</Text> */}
          {
            allMedication.map((medication, index) =>
              <View key={index} style={styles.checkItem}>
                <CheckBox
                      tintColors={{true: COLORS.darkBlue}}
                      value={currentMedication.some(e => e.id === medication.db_id) ? true : false}
                      onValueChange={() => {checkMedication(medication.db_id, medication.key)}}  />
                <Text style={GlobalStyles.text}> {medication.key} </Text>
              </View>
            )
          }
        </>
        : null}

        <AppButton
          style={styles.saveButton}
          text={'opslaan'}
          onPress={() => handleSave(firstName, lastName, email, password, asthmaType, currentTriggers, currentMedication)}
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
  tabNavigator: {
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.darkBlue,
  },
  tab: {
    backgroundColor: 'white',
    color: COLORS.darkBlue,
    padding: 5,
    flex: 1,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.darkBlue,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  tabText: {
    textAlign: 'center',
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  },
  tabTextSelected: {
    color: 'white'
  },
  tabSelected: {
    backgroundColor: COLORS.darkBlue,
    color: 'white'
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default EditUserScreen;
