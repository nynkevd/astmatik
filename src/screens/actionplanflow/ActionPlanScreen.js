import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';

const ActionPlanScreen = () => {
  return(
    <SafeAreaView style={styles.container}>
      <MainLayout colored />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScreenTitle
          title="Astma-actieplan"
          subTitle="Wat te doen bij een verergering van symptomen of een astma-aanval"
          />
        <ActionCard
          actionplan
          destination="Goed"
          title="Ik voel me goed"
          subtitle="Mijn astma is onder controle, ik heb geen klachten"
          color={COLORS.green}/>
        <ActionCard
          actionplan
          destination="Minder"
          title="Het gaat minder"
          subtitle="Mijn astma wordt erger, mijn klachten nemen toe"
          color={COLORS.yellow}/>
        <ActionCard
          actionplan
          destination="Geen verbetering"
          title="Er is geen verbetering"
          subtitle="Klachten en/of peakflow verbetert niet binnen 48 uur"
          color={COLORS.orange}/>
        <ActionCard
          actionplan
          destination="Aanval"
          title="Ernstige astma-aanval"
          subtitle="Klachten blijven aanhouden en medicatie helpt niet"
          color={COLORS.red}/>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer:{
    paddingHorizontal: 18,
    paddingBottom: 70,
  },
});

export default ActionPlanScreen;