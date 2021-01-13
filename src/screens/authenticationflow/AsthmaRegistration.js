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

const AsthmaRegistration= ({route}) => {
  const navigation = useNavigation();
  const [asthmaType, setAsthmaType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showTriggerList, setShowTriggerList] = useState(false);
  const [showMedicationList, setShowMedicationList] = useState(false);
  const {signUp} = React.useContext(AuthContext);
  let myMedication = [];
  let myTriggers = [];

  let password = route.params && route.params.password;

  const signupHandler = async () => {
    // TODO: Loadingspinner toevoegen!
    let firstname = await AsyncStorage.getItem('userFirstName');
    let lastname = await AsyncStorage.getItem('userLastName');
    let email = await AsyncStorage.getItem('userEmail');
    myMedication = JSON.parse(await AsyncStorage.getItem('userMedication'));
    myTriggers = JSON.parse(await AsyncStorage.getItem('userTriggers'));
    console.log(asthmaType);
    signUp(firstname, lastname, email, password, asthmaType, myMedication, myTriggers);
  };

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
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {setShowTriggerList(!showTriggerList); setModalVisible(true);}}>
                  <Text style={[GlobalStyles.text , {textAlign: 'center', fontWeight: 'bold'}]}>Toon trigger lijst</Text>
                </TouchableOpacity>
                <Text style={GlobalStyles.label}>Medicatie</Text>
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {setShowMedicationList(!showMedicationList); setModalVisible(true)}}>
                  <Text style={[GlobalStyles.text , {textAlign: 'center', fontWeight: 'bold'}]}>Toon medicatie lijst</Text>
                </TouchableOpacity>

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
    textAlign: 'center'
  }
});

export default AsthmaRegistration;
