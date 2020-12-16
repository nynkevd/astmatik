import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
    LogBox
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Constants from 'expo-constants';
import axios from 'axios';
import moment from 'moment';
import {AuthContext} from '../../context/context';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import InputField from "../../components/InputField";
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from "../../components/AppButton";

const MeasurePeakflowScreen = () => {
    const {retrieveToken} = React.useContext(AuthContext);
    const {userToken} = retrieveToken();

    const [timestamp, setTimestamp] = useState(moment());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const [peakflowBeforeMed, setPeakflowBeforeMed] = useState("");
    const [peakflowAfterMed, setPeakflowAfterMed] = useState("");
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const handleConfirm = (date) => {
        setTimestamp(date);
        setIsDatePickerVisible(false)
      };

    const handleSave = async () => {
        let body = {
            timestamp,
            beforeMedication: peakflowBeforeMed,
            afterMedication: peakflowAfterMed,
            notes,
        };

        setIsLoading(true);

      await axios({
        method: 'POST',
        url: `${Constants.manifest.extra.API_URL}/peakflow/add`,
        headers: {
          'X-Auth-Token': userToken
        },
        data: body
      }).then((res) => {
        // alert('De informatie is opgeslagen');
        navigation.navigate('Overzicht',  {update: true, timestamp: Date.now()});
        console.log("gelukt");
      }).catch((error) => {
        console.log(error);
      })

      console.log("klaar");

      setIsLoading(false);
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Peakflow"
                    subTitle="Voer jouw peakflow-meting in"
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

                <Text style={styles.bodyText}>Blaas drie keer en noteer daarvan de hoogste waarde</Text>
                

                <InputField
                    label={"Waarde vóór medicatie"}
                    value={peakflowBeforeMed}
                    onChange={setPeakflowBeforeMed}
                    placeholder={"540"}
                />

                <InputField
                    label={"Waarde ná medicatie"}
                    value={peakflowAfterMed}
                    onChange={setPeakflowAfterMed}
                    placeholder={"580"}
                />

                <InputField
                    label={"Logboek"}
                    value={notes}
                    onChange={setNotes}
                    multiline={true}
                    placeholder={"Zet hier overige notities neer met betrekking tot deze waardes"}
                />

                <AppButton
                    text={"opslaan"}
                    onPress={() => handleSave()}
                />
                
                {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
                
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
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
    bodyText: {
        fontSize: 16,
        color: COLORS.darkBlue
    },
});

export default MeasurePeakflowScreen;
