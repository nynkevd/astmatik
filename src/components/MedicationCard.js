import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';
import {COLORS} from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const MedicationCard = (props) => {
    const navigation = useNavigation();

    let data = props.data;  

    return (
        <View style={styles.MedicationCard}>
            <View>
                <Text style={styles.card_time}> {data.time} {data.notes ? " -  " + data.notes : null} </Text>
                <View style={styles.card_value}>
                    <Text> Genomen medicatie: </Text>
                    <Text> {data.beforeMedication} </Text>
                </View>

                <View style={styles.card_value}>
                    <Text> Aantal: </Text>
                    <Text> {data.amount} </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {console.log("aanpassen")}}>
                <Entypo name="pencil" size={24} color={COLORS.darkBlue} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    MedicationCard: {
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginVertical: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.darkBlue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card_time: {
        color: COLORS.darkBlue,
        fontWeight: 'bold',
        fontSize: 15
    },
    card_value : {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
});

export default MedicationCard;