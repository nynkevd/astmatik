import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import InputField from "../../components/InputField";
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from "../../components/AppButton";

const StatisticsScreen = () => {
    const [peakflowBeforeMed, setPeakflowBeforeMed] = useState("");
    const [peakflowAfterMed, setPeakflowAfterMed] = useState("");
    const [logboek, setLogboek] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ScreenTitle
                    title="Peakflow"
                    subTitle="Voer jouw peakflow in van vandaag"
                />

                <Text style={GlobalStyles.bodyText}>Blaas 3 keer en noteer daarvan de hoogste Waarde</Text>

                <InputField
                    label={"Waarde vóór medicatie"}
                    value={peakflowBeforeMed}
                    onChange={setPeakflowBeforeMed}
                />

                <InputField
                    label={"Waarde ná medicatie"}
                    value={peakflowAfterMed}
                    onChange={setPeakflowAfterMed}
                />

                <InputField
                    label={"Logboek"}
                    value={logboek}
                    onChange={setLogboek}
                    multiline
                />

                <AppButton
                    text={"opslaan"}
                    onPress={console.log("test")}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        paddingHorizontal: 18,
        paddingBottom: 70,
        minHeight: '100%'
    },
    titleContainer: {
        color: COLORS.darkBlue,
        marginVertical: 10,
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        borderColor: COLORS.darkBlue
    },
    checkLabel: {
        color: COLORS.darkBlue
    }
});

export default StatisticsScreen;