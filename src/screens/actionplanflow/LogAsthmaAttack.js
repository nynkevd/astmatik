import React, {useState} from 'react';
import {
  CheckBox,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import Constants from "expo-constants";

import Dropdown from '../../components/Dropdown';
import ScreenTitle from '../../components/ScreenTitle';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';
import MainLayout from '../../components/MainLayout';

const LogAsthmaAttack = () =>{
  const navigation = useNavigation();

  const [timestamp, setTimestamp] = useState(moment());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [duration, setDuration] = useState('5 minuten');
  const [trigger, setTrigger] = useState('Geen');
  const [usedMedication, setUsedMedication] = useState('');
  const [medsUsed, setMedsUsed] = useState(false);
  const [medsHelped, setMedsHelped] = useState(false);
  const durationOptions =["5 minuten", "10 minuten", "15 minuten", "20 minuten", "25 minuten",
  "30 minuten", "35 minuten", "40 minuten", "45 minuten","50 minuten", "55 minuten", "60 minuten",
  "1,5 uur", "2 uur", "2,5 uur", "3 uur", "langer dan 3 uur", "langer dan 6 uur",
  "langer dan 9 uur","langer dan 12 uur", "langer dan een dag", "langer dan twee dagen"];

  const [isLoading, setIsLoading] = useState(false);

  //should be changed to user info
  const triggers = ['Geen', 'Mist', 'Koude lucht', 'Pollen'];
  const medication = ['Salbutamol', 'Budesonide'];


  //TODO: Change userId to loggedIn user
  const asthmaAttackHandler = async () => {
      let body = {
        timestamp,
        duration,
        trigger,
        takenMedication: medsUsed,
        medicationTaken: usedMedication,
        medicationHelped: medsHelped,
        userId: Constants.manifest.extra.USER_ID,
      };

      setIsLoading(true);

      await axios({
        method: 'POST',
        url: `${Constants.manifest.extra.API_URL}/attack/add`,
        header: {
          'content-type': 'application/json'
        },
        data: body
      }).then((res) => {
        // alert('De informatie is opgeslagen');
        navigation.navigate('Actieplan');
      }).catch((error) => {
        console.log(error.response.data);
      })

      setIsLoading(false);
      
  };

//set time and date
  const handleConfirm = (date) => {
    setTimestamp(date);
    setIsDatePickerVisible(false);
  };

  return(
    <View style={styles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScreenTitle
          title="Astma-aanval"
          subTitle="Ik heb een aanval (gehad)"
          />
        <Text style={GlobalStyles.label}>Datum en Tijd</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => {setIsDatePickerVisible(true)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, paddingLeft: 8}}>{moment(timestamp).format("YYYY-MM-DD") + "  " + moment(timestamp).format("HH:mm")}</Text>
            <FontAwesome style={{position: 'absolute', right: 10}} name="caret-down" size={16} color="#808080" />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
           isVisible={isDatePickerVisible}
           mode="datetime"
           onConfirm={handleConfirm}
           onCancel={() => {setIsDatePickerVisible(false)}}
         />
        <Text style={GlobalStyles.label}>Duur van de aanval</Text>
        <Dropdown
          value={duration}
          changeValue={setDuration}
          list={durationOptions}
          />
        <Text style={GlobalStyles.label}>Trigger</Text>
        <Dropdown
          value={trigger}
          changeValue={setTrigger}
          list={triggers}
          />
        <View style={styles.checkContainer}>
          <CheckBox
            tintColors={{ true: COLORS.darkBlue }}
            value={medsUsed}
            onValueChange={setMedsUsed}
            style={styles.checkbox}
          />
          <Text style={styles.checkLabel}>Medicatie gebruikt</Text>
        </View>
        <View style={styles.checkContainer}>
          <CheckBox
            tintColors={{ true: COLORS.darkBlue }}
            value={medsHelped}
            onValueChange={setMedsHelped}
            style={styles.checkbox}
          />
          <Text style={styles.checkLabel}>Medicatie geholpen</Text>
        </View>
        { medsUsed
        ? <View>
          <Text style={GlobalStyles.label}>Gebruikte medicatie</Text>
          <Dropdown
            value={usedMedication}
            changeValue={setUsedMedication}
            list={medication}
            />

        </View>
        : <></>
        }
        <View style={{marginVertical: 15}}></View>
        <AppButton
          onPress={asthmaAttackHandler}
          text="opslaan"/>
        
        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer:{
    paddingHorizontal: 18,
    paddingBottom: 70,
    minHeight: '100%',
    minWidth: '100%'
  },
  dropdown:{
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    elevation: 3,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  checkContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '90%',
  },
  checkbox:{
    borderColor: COLORS.darkBlue
  },
  checkLabel: {
    color: COLORS.darkBlue
  }
});

export default LogAsthmaAttack;
