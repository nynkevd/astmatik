import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ContactCard from '../../components/ContactCard';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';

const ActionPlanFeelingBad = () => {
  return(
    <View style={styles.container}>
    <MainLayout />
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <ScreenTitle
        title="Er is geen verbetering"
        subTitle="Klachten en/of peakflow verbeteren niet binnen 48 uur"
      />
      <ActionCard
        bold
        planText="Neem direct contact op met uw longarts of huisarts"
        color={COLORS.orange}
      />
      <Text style={styles.contactLabel}>Longarts</Text>
      <ContactCard
        name="DR. N. Van Dijk"
        phoneNumber="06 12345678"
        location="Leiden"/>
      <Text style={styles.contactLabel}>Huisarts</Text>
      <ContactCard
        name="DR. DC Rademaker"
        phoneNumber="06 23456789"
        location="Nieuw-Vennep"/>
      <Text style={styles.contactLabel}>Contactpersoon</Text>
      <ContactCard
        name="K. van den Berge"
        phoneNumber="06 10293847"
        location="Rotterdam"/>
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
  contactLabel:{
    marginTop: 15,
    fontSize: 16,
    color: COLORS.darkBlue
  }
});

export default ActionPlanFeelingBad;
