import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {Feather} from '@expo/vector-icons';

import {COLORS} from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const FloatingActionButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.floatingActionButtonContainer, GlobalStyles.shadowed]}>
            <Feather name="plus" size={26} color="white"/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    floatingActionButtonContainer: {
        position: "absolute",
        bottom: 65,
        right: 15,
        backgroundColor: COLORS.cyan,
        borderRadius: 100,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default FloatingActionButton;