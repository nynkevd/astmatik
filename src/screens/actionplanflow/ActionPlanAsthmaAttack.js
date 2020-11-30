import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';

const ActionPlanAsthmaAttack = () => {
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
  }
});

export default ActionPlanAsthmaAttack;