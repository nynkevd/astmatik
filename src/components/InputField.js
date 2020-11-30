import React from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants/Colors';

const InputField = (props) => {
    return (
        <View style={styles.inputWrapper}>
            {props.label ? <Text style={styles.label}> {props.label} </Text> : null}
            <TextInput
                style={styles.input}
                onChangeText={text => props.onChange(text)}
                value={props.value}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    inputWrapper: {
        marginHorizontal: 0,
        alignSelf: 'stretch',
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 14,
        marginVertical: 5,
        color: COLORS.darkBlue,
    },
    input: {
        height: 40,
        color: COLORS.darkBlue,
        backgroundColor: COLORS.white,
        borderColor: COLORS.darkBlue,
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 16,
        padding: 8,
        paddingHorizontal: 12,
    },
});

export default InputField;