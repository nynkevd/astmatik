import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
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

const MeasurePeakflowScreen = ({route}) => {
    const {retrieveToken} = React.useContext(AuthContext);
    const {userToken} = retrieveToken();

    const [morning, setMorning] = useState(true);
    const [peakflowBeforeMed, setPeakflowBeforeMed] = useState("");
    const [peakflowAfterMed, setPeakflowAfterMed] = useState("");
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        console.log("setting morning");
        setMorning(route.params.morning);
    }, [route.params.morning])

    useEffect(() => {
        if (route.params.edit) {
            setPeakflowBeforeMed(route.params.pf_beforeMed && route.params.pf_beforeMed.toString() || "");
            setPeakflowAfterMed(route.params.pf_afterMed && route.params.pf_afterMed.toString() || "");
            setNotes(route.params.pf_notes.toString());
            setMorning(route.params.morning);
        }
    }, [route.params.edit])

    const handleSave = async () => {
        console.log("saving");
        let body = {
            morning,
            timestamp: moment(),
            beforeMedication: peakflowBeforeMed,
            afterMedication: peakflowAfterMed,
            notes,
        };
        console.log(body);

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
            ToastAndroid.show("ongeldige invoer", ToastAndroid.SHORT);
        });

        setIsLoading(false);
    };

    const handleEdit = async () => {
        let body = {
            id: route.params.pf_id,
            morning,
            timestamp: moment(),
            beforeMedication: peakflowBeforeMed,
            afterMedication: peakflowAfterMed,
            notes,
        };
        console.log(body);

        setIsLoading(true);

        await axios({
            method: 'PATCH',
            url: `${Constants.manifest.extra.API_URL}/peakflow/edit`,
            headers: {
            'X-Auth-Token': userToken
            },
            data: body
        }).then((res) => {
            navigation.navigate('Overzicht',  {update: true, timestamp: Date.now()});
        }).catch((error) => {
            console.log(error);
            ToastAndroid.show("ongeldige invoer", ToastAndroid.SHORT);
        });

        setIsLoading(false);
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Peakflow"
                    subTitle={`Voer jouw ${morning ? "ochtend" : "middag/avond"} peakflow-meting in`}
                />

                <Text style={styles.bodyText}>Blaas drie keer en noteer daarvan de hoogste waarde</Text>


                <InputField
                    label={"Waarde vóór medicatie *"}
                    value={peakflowBeforeMed}
                    onChange={setPeakflowBeforeMed}
                    placeholder={"540"}
                    keyboardType="numeric"
                />

                <InputField
                    label={"Waarde ná medicatie"}
                    value={peakflowAfterMed}
                    onChange={setPeakflowAfterMed}
                    placeholder={"580"}
                    keyboardType="numeric"
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
                    onPress={route.params.edit ? () => handleEdit() : () => handleSave()}
                />

                  <Text style={{color: COLORS.darkBlue, marginTop: 10}}>* verplichte velden</Text>

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
