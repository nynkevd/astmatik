import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../constants/Colors';

const ScreenTitle = (props) => {
  return(
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subTitle}>{props.subTitle}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  titleContainer:{
    color: COLORS.darkBlue,
    marginVertical: 10,
  },
  title:{
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 20,
    color: COLORS.darkBlue,
  },
  subTitle:{
    fontSize: 18,
    color: COLORS.darkBlue
  }
});

export default ScreenTitle;
