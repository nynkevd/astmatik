import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants/Colors';

const AppButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        backgroundColor: COLORS.darkBlue,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default AppButton;
