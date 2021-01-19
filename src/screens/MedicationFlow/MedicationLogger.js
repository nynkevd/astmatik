import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    AsyncStorage
} from 'react-native';
import RadioButton from '../../components/RadioButton';
import Dropdown from '../../components/Dropdown';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from "../../components/AppButton";
import { useSafeArea } from 'react-native-safe-area-context';
import { duration } from 'moment';

const MedicationLogger = ({route}) => {
    const [update, forceUpdate] = useState(false);
    const [updateState, setUpdateState] = useState(route.params.update);
    const [medication, setMedication] = useState('');
    const [medicationList, setMedicationList] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [complaints, setComplaints] = useState('');

    useEffect(() => {
        (async function loadData() {
        let meds = JSON.parse(await AsyncStorage.getItem('userMedication'));
        console.log(meds);
        let medArray = [];
        meds.forEach(med => {
            medArray.push(med.name);
        });
        console.log(medArray);
        setMedicationList(medArray);
      })();
    }, [update]);

    // const durationOptions = ["budesonide", "vilanterol", "salbutamol"];
    const quantityOptions = ["1 puf", "2 pufs", "3 pufs", "4 pufs", "5 pufs"];
    const morningOptions = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"];
    const middayOptions = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
    const eveningOptions = ["20:00", "21:00", "22:00", "23:00", "24:00", "01:00", "02:00", "03:00", "04:00", "05:00"];
    const complainOptions = ["Benauwdheid", "Piepen", "Hoesten", "Kortademig", "Slijm"];

    const navigation = useNavigation();

    const onConfirm = async () => {
        console.log("confirming");
        let complaintsArr = [];
        option1 && complaintsArr.push("Benauwdheid");
        option2 && complaintsArr.push("Piepen");
        option3 && complaintsArr.push("Hoesten");
        option4 && complaintsArr.push("Kortademig");
        let body = {
          medication,
          quantity,
          timestamp,
          complaints: complaintsArr
        }
        let loggedMeds = JSON.parse(await AsyncStorage.getItem('loggedMeds'));
        console.log();
        let date = moment().format("DD-MM-yyyy").toString();
        if (!loggedMeds) {loggedMeds = { }; }
        if (!loggedMeds[date]) { loggedMeds[date] = {} };
        loggedMeds[date][route.params.tod === 0 && "morning" || route.params.tod === 1 && "midday" || route.params.tod === 2 && "evening"] = body;
        console.log(loggedMeds);
        await AsyncStorage.setItem('loggedMeds', JSON.stringify(loggedMeds));
        navigation.navigate("Medicatie", {update: !updateState, timestamp: Date.now()});
    };

    const [key, setKey] = useState('defaultValue');
    const [option1, setOption1] = useState(false)
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    const [option4, setOption4] = useState(false);

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Medicatie"
                    subTitle="Voer de medicatie in die je hebt genomen"
                />

                <Text style={GlobalStyles.label}>Medicatie</Text>
                <Dropdown
                    value={medication}
                    changeValue={setMedication}
                    list={medicationList}
                />

                <Text style={GlobalStyles.label}>Hoeveelheid</Text>
                <Dropdown
                    value={quantity}
                    changeValue={setQuantity}
                    list={quantityOptions}
                />

                <Text style={GlobalStyles.label}>Tijdstip</Text>
                <Dropdown
                    value={timestamp}
                    changeValue={setTimestamp}
                    list={route.params.tod === 0 && morningOptions || route.params.tod === 1 && middayOptions || route.params.tod === 2 && eveningOptions}
                    // list={morningOptions}
                />

                <Text style={GlobalStyles.label}>Klachten</Text>
                <View style={styles.klachten}>
                    <View style={styles.subKlachten}>
                        <RadioButton checked={option1} onPress={() => setOption1(!option1)}/>
                        <Text style={GlobalStyles.text}>Benauwdheid</Text>
                    </View>

                    <View style={styles.subKlachten}>
                        <RadioButton checked={option2} onPress={() => setOption2(!option2)}/>
                        <Text style={GlobalStyles.text}>Piepen</Text>
                    </View>

                    <View style={styles.subKlachten}>
                        <RadioButton checked={option3} onPress={() => setOption3(!option3)}/>
                        <Text style={GlobalStyles.text}>Hoesten</Text>
                    </View>

                    <View style={styles.subKlachten}>
                        <RadioButton checked={option4} onPress={() => setOption4(!option4)}/>
                        <Text style={GlobalStyles.text}>Kortademig</Text>
                    </View>
                </View>

                <AppButton
                    text={"opslaan"}
                    onPress={() => onConfirm()}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    klachten: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        elevation: 3,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    subKlachten: {
        flexDirection: "row",
        paddingVertical: 5
    },
});

export default MedicationLogger;
