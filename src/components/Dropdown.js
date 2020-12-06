import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from '../constants/Colors';

const Dropdown = (props) =>{
  return(
    <View style={styles.picker}>
      <Picker
      mode="dropdown"
      selectedValue={props.value}
      onValueChange={value => props.changeValue(value)}
      >
        {
          props.list.map((item, index) =>
            <Picker.Item label={item} value={item} key={index} />
          )
        }
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  picker:{
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    elevation: 3,
    paddingHorizontal: 15,
    marginBottom: 10
  },
});

export default Dropdown;
