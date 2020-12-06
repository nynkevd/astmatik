import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


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

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ScreenTitle
                    title="Peakflow"
                    subTitle="Voer jouw peakflow in van vandaag"
                />

                <Text style={styles.bodyText}>Blaas drie keer en noteer daarvan de hoogste waarde</Text>
                <View style={{ flexDirection:"row", alignSelf: "center" }}>
                    <TouchableOpacity style={styles.activeButton}>
                        <Text style={styles.activeButtonText}>ochtend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveButton}>
                        <Text style={styles.nonActiveButtonText}>avond</Text>
                    </TouchableOpacity>
                </View>

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
                    onPress={() => navigation.navigate("Grafieken")}
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
    },
    activeButton: {
        alignItems: "center",
        backgroundColor: COLORS.darkBlue,
        padding: 5,
        width: 150,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    nonActiveButton: {
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 5,
        width: 150,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    activeButtonText: {
        fontFamily: "Roboto",
        color: COLORS.white,
        fontSize: 16,
    },
    nonActiveButtonText: {
        fontFamily: "Roboto",
        color: COLORS.darkBlue,
        fontSize: 16,
    },
    bodyText: {
        fontSize: 16,
        color: COLORS.darkBlue
    },
});

export default StatisticsScreen;
