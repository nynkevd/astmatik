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
    const complainOptions = ["Benauwdheid", "Piepen", "Hoesten", "Kortademig"];

    const navigation = useNavigation();

    const onConfirm = async () => {
        console.log("confirm");
        // navigation.navigate("Grafieken");
    };

    const [key, setKey] = useState('defaultValue'); 
    const [option1, setOption1] = useState(false) 
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    const [option4, setOption4] = useState(false);

    const radioHandler = () => {
        if(option1){
            setKey(option1);
            setOption1(false);
        } else {
            setOption1(true);
            setKey(option1);
        }
    }

    const radioHandler2 = () => {
        if(option2){
            setKey(option2);
            setOption2(false);
        } else {
            setKey(option2);
            setOption2(true);
        }
    }

    const radioHandler3 = () => {
        if(option3){
            setKey(option3);
            setOption4(false);
        } else {
            setKey(option3);
            setOption3(true);
        }
    }

    const radioHandler4 = () => {
        if(option4){
            setKey(option4);
            setOption4(false);
        } else {
            setKey(option4);
            setOption4(true);
        }
    }

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Medicatie"
                    subTitle="Voer de medicatie in die je hebt genomen"
                />
                
                <Text>Medicatie</Text>
                <Dropdown
                    value={duration}
                    changeValue={setDuration}
                    list={durationOptions}
                />

                <Text>Hoeveelheid</Text>
                <Dropdown
                    value={quantity}
                    changeValue={setQuantity}
                    list={quantityOptions}
                />

                <Text>Tijdstip</Text>
                <Dropdown
                    value={timestamp}
                    changeValue={setTimestamp}
                    list={timestampOptions}
                />

                <Text>Klachten</Text>
                <View style={styles.klachten}>
                    <View style={styles.subKlachten}>
                        <RadioButton checked={option1} onPress={radioHandler}/>
                        <Text>Benauwdheid</Text>
                    </View>

                    <View style={styles.subKlachten}>
                        <RadioButton checked={option2} onPress={radioHandler2}/>
                        <Text>Piepen</Text>
                    </View>

                    <View style={styles.subKlachten}>
                        <RadioButton checked={option3} onPress={radioHandler3}/>
                        <Text>Hoesten</Text>
                    </View>

                    <View style={styles.subKlachten}>
                        <RadioButton checked={option4} onPress={radioHandler4}/>
                        <Text>Kortademig</Text>
                    </View>
                </View>

                <AppButton
                    text={"opslaan"}
                    onPress={() => onConfirm}
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
        height: 125,
        justifyContent: 'center',
        elevation: 3,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    subKlachten: {
        flexDirection: "row",
        paddingBottom: 5,
        paddingTop: 5,
    },
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

export default MedicationLogger;
