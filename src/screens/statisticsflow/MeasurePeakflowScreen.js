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

const MeasurePeakflowScreen = () => {
    const [peakflowBeforeMed, setPeakflowBeforeMed] = useState("");
    const [peakflowAfterMed, setPeakflowAfterMed] = useState("");
    const [logboek, setLogboek] = useState("");

    const [morning, setMorning] = useState(true);

    const navigation = useNavigation();

    const onConfirm = async () => {
        console.log("confirm");
        // navigation.navigate("Grafieken");
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Peakflow"
                    subTitle="Voer jouw peakflow in van vandaag"
                />

                <Text style={styles.bodyText}>Blaas drie keer en noteer daarvan de hoogste waarde</Text>
                <View style={[styles.filterButtons, GlobalStyles.shadowed]}>
                    <TouchableOpacity onPress={() => setMorning(true)} style={[morning ? styles.activeFilter : styles.inActiveFilter, {borderTopLeftRadius: 25, borderBottomLeftRadius: 25}]}>
                        <Text style={morning ? styles.activeFilterText : styles.inActiveFilterText}>ochtend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMorning(false)} style={[morning ? styles.inActiveFilter : styles.activeFilter, {borderTopRightRadius: 25, borderBottomRightRadius: 25}]}>
                        <Text style={morning ? styles.inActiveFilterText : styles.activeFilterText}>avond</Text>
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
                    onPress={() => onConfirm}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    filterButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 25,
        padding: 0,
    },
    activeFilter: {
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        alignItems: 'center',
        padding: 5,
        height: '100%'
    },
    inActiveFilter: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        padding: 5,
        height: '100%'
    },
    activeFilterText: {
        fontFamily: "Roboto",
        color: COLORS.white,
        fontSize: 16,
    },
    inActiveFilterText: {
        fontFamily: "Roboto",
        color: COLORS.darkBlue,
        fontSize: 16,
    },
    bodyText: {
        fontSize: 16,
        color: COLORS.darkBlue
    },
});

export default MeasurePeakflowScreen;
