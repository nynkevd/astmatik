import React, {useState} from 'react';
import {
  CheckBox,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import ScreenTitle from '../../components/ScreenTitle';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';
import MainLayout from '../../components/MainLayout';

const LogAsthmaAttack = () =>{
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const durationOptions =["5 minuten", "10 minuten", "15 minuten", "20 minuten", "25 minuten",
"30 minuten", "35 minuten", "40 minuten", "45 minuten","50 minuten", "55 minuten", "60 minuten",
"1,5 uur", "2 uur", "2,5 uur", "3 uur", "langer dan 3 uur", "langer dan 6 uur", "langer dan 9 uur",
"langer dan 12 uur", "langer dan een dag", "langer dan twee dagen"]

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      let dateTimeString = JSON.stringify(date);
      setDate(dateTimeString.substring(1,11));
      setTime(dateTimeString.substring(12,17));
      console.log("A date has been picked: ", dateTimeString);
      hideDatePicker();
    };
  return(
    <View style={styles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScreenTitle
          title="Astma-aanval"
          subTitle="Ik heb een aanval (gehad)"
          />
        <Text style={GlobalStyles.label}>Datum en Tijdstip</Text>
        <TouchableOpacity style={styles.picker} onPress={showDatePicker}>
            <Text>{date + "    " + time}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={GlobalStyles.label}>Duur van de aanval</Text>
        <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden'}}>
          <Picker style={styles.picker}>
          <Picker.Item label="---" value="0" />
                  {
                    durationOptions.map((item, index) =>
                      <Picker.Item label={item} value={item} key={index} />
                    )
                  }
          </Picker>
        </View>
        <Text style={GlobalStyles.label}>Trigger</Text>
        <TouchableOpacity style={styles.picker} onPress={showDatePicker}>
            <Text>{date + "    " + time}</Text>
        </TouchableOpacity>
        <Text style={GlobalStyles.label}>Medicatie gebruikt?</Text>
        <Text style={GlobalStyles.label}>Medicatie geholpen?</Text>
        <Text style={GlobalStyles.label}>Gebruikte medicatie</Text>
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
  picker:{
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    elevation: 3,
    paddingHorizontal: 15
  }
});

export default LogAsthmaAttack;
