import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const ActionPlanAsthmaAttack = () => {
  //should be changed
  const phoneNumberMedic = '+31612345678';
  const phoneNumberLungMedic = '+31623456789';
  return(
    <View style={styles.container}>
    <MainLayout />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScreenTitle
          title="Ernstige astma-aanval"
          subTitle="Klachten blijven aanhouden en medicijnen helpen weinig / niet"
        />
        <ActionCard
          bold
          planText="Neem direct contact op met uw longarts of huisarts of ga naar de spoedeisende hulp"
          color={COLORS.red}
          />
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsText}>1. Zit rechtop, ga niet liggen</Text>
            <Text style={styles.stepsText}>2. Neem 4 puffen salbutamol via voorzetkamer</Text>
            <Text style={styles.stepsText}>3. Na 5 minuten geen verbetering? nogmaals 4 puffen salbutamol</Text>
            <Text style={styles.stepsText}>4. Neem direct contact op met longarts of huisarts</Text>
            <Text style={styles.stepsExtra}>* Als u geen arts kunt bereiken: ga naar de spoedeisende hulp of bel 112</Text>
          </View>
          <View style={styles.phoneContainer}>
            <View style={{marginHorizontal: 50}}>
              <Text style={{color: COLORS.darkBlue}}>Longarts</Text>
              <TouchableOpacity  onPress={() => {Linking.openURL('tel:' + phoneNumberLungMedic)}} style={styles.phoneButton}>
                <FontAwesome name="phone" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 50}}>
              <Text style={{color: COLORS.darkBlue}}>Huisarts</Text>
              <TouchableOpacity onPress={() => {Linking.openURL('tel:' + phoneNumberMedic)}} style={styles.phoneButton}>
                <FontAwesome name="phone" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: 10}}></View>
          <AppButton
            text="ik heb een aanval (gehad)"
            />
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer:{
    paddingHorizontal: 18,
    paddingBottom: 70,
    minHeight: '100%'
  },
  stepsContainer:{
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 10,
    marginVertical: 30,
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  stepsText:{
    marginVertical: 5,
    color: COLORS.darkBlue,
    fontSize: 16
  },
  stepsExtra: {
    color: COLORS.darkBlue,
    marginTop: 20
  },
  phoneContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  phoneButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkBlue,
    width: 60,
    height: 60,
    borderRadius: 50,
    elevation: 3,
    marginVertical: 5,
    transform: [{rotate: '270deg' }],
  }
});

export default ActionPlanAsthmaAttack;
