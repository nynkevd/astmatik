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
            <Text style={styles.label}> {props.label} </Text>
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
        margin: 15,
        alignSelf: 'stretch',
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 18,
        marginBottom: 8,
        color: COLORS.darkBlue,
    },
    input: {
        height: 40,
        color: COLORS.darkBlue,
        borderColor: COLORS.darkBlue,
        borderWidth: 1,
        marginLeft: 0,
        borderRadius: 10,
        fontSize: 16,
        padding: 8,
        paddingLeft: 12,
    },
});

export default InputField;
