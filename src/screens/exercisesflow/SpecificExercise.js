import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';
import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';

import {Feather} from '@expo/vector-icons';


const SpecificExercise = ({route}) => {
  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        <ScreenTitle
          title={route.params.specExercise.title}
          subTitle={route.params.specExercise.explanation}
        />
        <View style={styles.card}>
          {/* <Text style={styles.number}>1</Text> */}
          <Feather name="wind" size={24} style={styles.number}/>
          <Text style={styles.step}>{route.params.specExercise.stepOne}</Text>
        </View>
        <View style={styles.card}>
          {/*<Text style={styles.number}>2</Text> */}
            <Feather name="wind" size={24} style={[styles.number, styles.numberRotate]}/>
            <Text style={styles.step}>{route.params.specExercise.stepTwo}</Text>
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  card:{
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    marginVertical: 10,
  },
  number: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    width: '15%',
    textAlign: 'center',
    alignSelf: 'center',
    paddingVertical: 35,
    backgroundColor: COLORS.lightBlue,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  numberRotate: {
    transform: [{rotate: '180deg'}],
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  step: {
    paddingHorizontal: 15,
    maxWidth: '80%',
    alignSelf:'center',
    fontSize: 14,
    color: COLORS.darkBlue
  }
});

export default SpecificExercise;
