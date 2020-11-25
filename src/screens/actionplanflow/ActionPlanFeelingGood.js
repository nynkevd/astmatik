import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  CheckBox,
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';

const ActionPlanFeelingGood = () => {
  const [medicationSelected, setMedicationSelection] = useState(false);
  const [techniqueSelected, setTechniqueSelection] = useState(false);
  const [chamberSelected, setChamberSelection] = useState(false);
  const [airwayProtector, setAirwayProtector] = useState("");
  const [airwayRemover, setAirwayRemover] = useState("");
  const [noseSpray, setNoseSpray] = useState("");

  console.log(airwayProtector);
  return(
    <SafeAreaView style={styles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <ScreenTitle
        title="Ik voel me goed"
        subTitle="Mijn astma is onder controle, ik heb geen klachten"
        />
      <ActionCard
        color={COLORS.green}
        planText='Met mijn dagelijkse medicatie heb ik geen luchtwegklachten.' />
      <Text style={styles.headline}>Medicatie</Text>
      <Text style={styles.label}>Luchtwegbeschermer</Text>
      <TextInput
        style={styles.input}
        value={airwayProtector}
        onChangeText={value => setAirwayProtector(value)} />
      <Text style={styles.label}>Luchtwegverwijder</Text>
      <TextInput
        style={styles.input}
        value={airwayRemover}
        onChangeText={value => setAirwayRemover(value)} />
      <Text style={styles.label}>Neusspray</Text>
      <TextInput
        style={styles.input}
        value={noseSpray}
        onChangeText={value => setNoseSpray(value)} />
      <Text style={styles.headline}>Check</Text>
      <View style={styles.checkContainer}>
        <CheckBox
          tintColors={{ true: COLORS.darkBlue }}
          value={medicationSelected}
          onValueChange={setMedicationSelection}
          style={styles.checkbox}
        />
        <Text style={styles.checkLabel}>Ik neem elke dag mijn medicatie</Text>
      </View>
      <View style={styles.checkContainer}>
        <CheckBox
          tintColors={{ true: COLORS.darkBlue }}
          value={techniqueSelected}
          onValueChange={setTechniqueSelection}
          style={styles.checkbox}
        />
        <Text style={styles.checkLabel}>Ik gebruik de juiste techniek</Text>
      </View>
      <View style={styles.checkContainer}>
        <CheckBox
          tintColors={{ true: COLORS.darkBlue }}
          value={chamberSelected}
          onValueChange={setChamberSelection}
          style={styles.checkbox}
        />
        <Text style={styles.checkLabel}>Ik gebruik mijn voorzetkamer</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  headline: {
    color: COLORS.darkBlue,
    fontSize: 16,
    marginTop: 25,
    fontWeight: "bold"
  },
  label: {
    color: COLORS.darkBlue,
    fontSize: 14,
    marginVertical: 5,
  },
  input:{
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  checkContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox:{
    borderColor: COLORS.darkBlue
  },
  checkLabel: {
    color: COLORS.darkBlue
  }
});

export default ActionPlanFeelingGood;
