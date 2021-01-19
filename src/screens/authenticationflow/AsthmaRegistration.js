import React, {useState, useEffect} from 'react';
import {
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MainLayout from '../../components/MainLayout';
import {COLORS} from '../../constants/Colors';
import {OPTIONS} from '../../constants/Options';
import InputField from "../../components/InputField";
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from '../../components/AppButton';
import Dropdown from '../../components/Dropdown';
import {AuthContext} from '../../context/context';
import { FontAwesome } from '@expo/vector-icons';

const AsthmaRegistration= ({route}) => {
  const navigation = useNavigation();
  const [asthmaType, setAsthmaType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showTriggerList, setShowTriggerList] = useState(false);
  const [beenOnTriggers, setBeenOnTriggers] = useState(false);
  const [showTriggerCheck, setShowTriggerCheck] = useState(false);
  const [showMedicationList, setShowMedicationList] = useState(false);
  const [beenOnMedications, setBeenOnMedications] = useState(false);
  const [showMedicationCheck, setShowMedicationCheck] = useState(false);
  const {signUp} = React.useContext(AuthContext);
  let myMedication = [];
  let myTriggers = [];

  let password = route.params && route.params.password;

  const signupHandler = async () => {
    // TODO: Loadingspinner toevoegen!
    console.log('signed up!');
    let firstname = await AsyncStorage.getItem('userFirstName');
    let lastname = await AsyncStorage.getItem('userLastName');
    let email = await AsyncStorage.getItem('userEmail');
    myMedication = JSON.parse(await AsyncStorage.getItem('userMedication'));
    myTriggers = JSON.parse(await AsyncStorage.getItem('userTriggers'));
    await AsyncStorage.setItem('userAsthmaType', asthmaType);
    signUp(firstname, lastname, email, password, asthmaType, myMedication, myTriggers);
  };

  useEffect(() => {
    console.log(beenOnTriggers);
    beenOnTriggers && !showTriggerList ? setShowTriggerCheck(true) : null;
    //TODO: veranderen naar beenOnTriggers zodra de dubbele tap niet meer nodig is.
  }, [showTriggerList]);

  useEffect(() => {
    console.log(beenOnMedications);
    beenOnMedications && !showMedicationList ? setShowMedicationCheck(true) : null;
    //TODO: veranderen naar beenOnTriggers zodra de dubbele tap niet meer nodig is.
  }, [showMedicationList]);

  const setTriggersVisible = (value) => {
    setShowTriggerList(value);
  }
  const setMedicationVisible = (value) => {
    setShowMedicationList(value);
  }

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
              <Text style={GlobalStyles.titleText}>Welkom bij</Text>
              <Text style={GlobalStyles.appName}>Astmatik</Text>
                <View style={{marginVertical: 10}}></View>
                <Text style={GlobalStyles.label}>Astma type</Text>
                <Dropdown
                  value={asthmaType}
                  changeValue={setAsthmaType}
                  list={OPTIONS.asthmaTypeOptions}
                />
                <Text style={GlobalStyles.label}>Triggers</Text>
                <View style={styles.selectorWrapper}>
                  <TouchableOpacity
                    style={[styles.pickerStyle, showTriggerCheck && styles.withCheck]}
                    onPress={() => {setShowTriggerList(true); setBeenOnTriggers(true)}}>
                    <Text style={[GlobalStyles.text , {textAlign: 'center', fontWeight: 'bold'}]}>Toon trigger lijst</Text>
                  </TouchableOpacity>
                  <View style={showTriggerCheck ? styles.checkMarkWrapper : {width: 0}}>
                  {
                     showTriggerCheck ? <FontAwesome style={styles.checkMark} name="check" size={24} color={COLORS.darkBlue} /> : <Text> Hi </Text>
                  }
                  </View>

                </View>

                <Text style={GlobalStyles.label}>Medicatie</Text>
                <View style={styles.selectorWrapper}>
                  <TouchableOpacity
                    style={[styles.pickerStyle, showMedicationCheck && styles.withCheck]}
                    onPress={() => {setShowMedicationList(true); setBeenOnMedications(true)}}>
                    <Text style={[GlobalStyles.text , {textAlign: 'center', fontWeight: 'bold'}]}>Toon medicatie lijst</Text>
                  </TouchableOpacity>
                  <View style={showMedicationCheck ? styles.checkMarkWrapper : {width: 0}}>
                    {
                      showMedicationCheck ? <FontAwesome style={styles.checkMark} name="check" size={24} color={COLORS.darkBlue} /> : <Text> Hi </Text>
                    }
                  </View>
                </View>


                <AppButton
                  text="opslaan"
                  onPress={() => signupHandler()}
                />

                {showTriggerList
                  ?<Dropdown
                    title={"Mogelijke triggers"}
                    modalVisible
                    listOverview
                    changeValue={() => setShowTriggerList(!showTriggerList)}
                    list={OPTIONS.triggerOptions}
                    setTriggersVisible={setTriggersVisible}
                  />
                  :<></>
                }
                {showMedicationList
                ?  <Dropdown
                    title={"Mogelijke medicijnen"}
                    modalVisible
                    listOverview
                    changeValue={() => setShowMedicationList(!showMedicationList)}
                    list={OPTIONS.medicationOptions}
                    setMedicationVisible={setMedicationVisible}
                  />
                :<></>}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  pickerStyle:{
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    elevation: 3,
    paddingHorizontal: 15,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%'
  },
  withCheck: {
    width: '90%'
  },
  selectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%'
  },
  checkMarkWrapper: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AsthmaRegistration;
