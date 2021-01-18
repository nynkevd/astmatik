import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import RadioButton from '../../components/RadioButton';
import Dropdown from '../../components/Dropdown';
import { useNavigation } from '@react-navigation/native';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from "../../components/AppButton";

const MedicationLogger = () => {
    const [duration, setDuration] = useState('');
    const [quantity, setQuantity] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [complaints, setComplaints] = useState('');

    const durationOptions = ["budesonide", "vilanterol", "salbutamol"];
    const quantityOptions = ["1 puf", "2 pufs", "3 pufs", "4 pufs", "5 pufs"];
    const timestampOptions = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];
    const complainOptions = ["Benauwdheid", "Piepen", "Hoesten", "Kortademig", "Slijm"];

    const navigation = useNavigation();

    const onConfirm = () => {
        let body = {
          duration,
          quantity,
          timestamp,
          complaints,
        }
        console.log(body);
        // navigation.navigate("Grafieken");
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
                    value={duration}
                    changeValue={setDuration}
                    list={durationOptions}
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
                    list={timestampOptions}
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
