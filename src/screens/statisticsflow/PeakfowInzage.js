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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import InputField from "../../components/InputField";
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from "../../components/AppButton";
import PeakflowSchema from "../../components/PeakflowSchema";

const PeakflowInzage = () => {
    const [peakflowBeforeMed, setPeakflowBeforeMed] = useState("");
    const [peakflowAfterMed, setPeakflowAfterMed] = useState("");
    const [logboek, setLogboek] = useState("");

    const navigation = useNavigation();

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <SafeAreaView style={styles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ScreenTitle
                    title="Mijn week in cijfers"
                    subTitle="Bekijk hier jouw gegevens van vandaag"
                />

                <View style={{ flexDirection:"row", alignSelf: "center" }}>
                    <TouchableOpacity style={styles.leftButton}>
                        <Text style={styles.nonActiveButtonText}>vandaag</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.activeButton}>
                        <Text style={styles.activeButtonText}>deze week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nonActiveButton}>
                        <Text style={styles.nonActiveButtonText}>deze maand</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection:"row", alignSelf: "center", paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity style={styles.peakflowButon}>
                        <Text style={styles.activeButtonText}>peakflow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.medicationButton}>
                        <Text style={styles.activeButtonText}>medicatie</Text>
                    </TouchableOpacity>
                </View>

                <PeakflowSchema
                    title={"Peakflow"}
                    subTitle={"vóór medicatie"}
                />

                <PeakflowSchema
                    title={"Peakflow"}
                    subTitle={"na medicatie"}
                />

                <AppButton
                    text={"opslaan"}
                    onPress={() => navigation.navigate("SchemaWeergave")}
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
    leftButton: {
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 5,
        width: 100,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    activeButton: {
        alignItems: "center",
        backgroundColor: COLORS.darkBlue,
        padding: 5,
        width: 100,
    },
    nonActiveButton: {
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 5,
        width: 100,
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
    peakflowButon: {
        padding: 5,
        marginRight: 20,
        width: 120,
        backgroundColor: COLORS.darkBlue,
        alignItems: "center",
        borderRadius: 5,
    },
    medicationButton: {
        padding: 5,
        width: 120,
        backgroundColor: COLORS.cyan,
        alignItems: "center",
        borderRadius: 5,
    },
});

export default PeakflowInzage;
