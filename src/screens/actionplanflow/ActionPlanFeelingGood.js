import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    CheckBox,
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import InputField from "../../components/InputField";
import GlobalStyles from "../../constants/GlobalStyles";

const ActionPlanFeelingGood = () => {
    const [medicationSelected, setMedicationSelection] = useState(false);
    const [techniqueSelected, setTechniqueSelection] = useState(false);
    const [chamberSelected, setChamberSelection] = useState(false);
    const [airwayProtector, setAirwayProtector] = useState("");
    const [airwayRemover, setAirwayRemover] = useState("");
    const [noseSpray, setNoseSpray] = useState("");

    console.log(airwayProtector);
    return (
        <SafeAreaView style={styles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ScreenTitle
                    title="Ik voel me goed"
                    subTitle="Mijn astma is onder controle, ik heb geen klachten"
                />
                <ActionCard
                    color={COLORS.green}
                    planText='Met mijn dagelijkse medicatie heb ik geen luchtwegklachten.'/>
                <Text style={GlobalStyles.headline}>Medicatie</Text>

                <InputField
                    label={"Luchtwegbeschermer"}
                    value={airwayProtector}
                    onChange={setAirwayProtector}
                />

                <InputField
                    label={"Luchtwegverwijder"}
                    value={airwayRemover}
                    onChange={setAirwayRemover}
                />

                <InputField
                    label={"Neusspray"}
                    value={noseSpray}
                    onChange={setNoseSpray}
                />

                <Text style={GlobalStyles.headline}>Check</Text>
                <View style={styles.checkContainer}>
                    <CheckBox
                        tintColors={{true: COLORS.darkBlue}}
                        value={medicationSelected}
                        onValueChange={setMedicationSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkLabel}>Ik neem elke dag mijn medicatie</Text>
                </View>
                <View style={styles.checkContainer}>
                    <CheckBox
                        tintColors={{true: COLORS.darkBlue}}
                        value={techniqueSelected}
                        onValueChange={setTechniqueSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkLabel}>Ik gebruik de juiste techniek</Text>
                </View>
                <View style={styles.checkContainer}>
                    <CheckBox
                        tintColors={{true: COLORS.darkBlue}}
                        value={chamberSelected}
                        onValueChange={setChamberSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkLabel}>Ik gebruik mijn voorzetkamer</Text>
                </View>
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

export default ActionPlanFeelingGood;
