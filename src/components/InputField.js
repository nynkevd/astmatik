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
            {props.multiline ? 
                <TextInput
                    style={[styles.input, styles.multiline]}
                    onChangeText={text => props.onChange(text)}
                    value={props.value}
                    multiline={true}
                    numberOfLines={8}
                    placeholder={props.placeholder || null}
                    placeholderTextColor={COLORS.gray}
                /> :
                <TextInput
                    style={styles.input}
                    onChangeText={text => props.onChange(text)}
                    value={props.value}
                    placeholder={props.placeholder || null}
                    placeholderTextColor={COLORS.gray}
                />
            }
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
    multiline: {
        textAlignVertical: 'top',
        height: 160,
    }
});

export default InputField;
