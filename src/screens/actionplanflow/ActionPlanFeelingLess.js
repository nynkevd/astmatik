import React, {useState} from 'react';
import {
  CheckBox,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';

const ActionPlanFeelingLess = () => {
  const [complaintsSelected, setComplaintsSelection] = useState(false);
  const [awakeSelected, setAwakeSelected] = useState(false);
  const [activitiesSelected, setActivitiesSelected] = useState(false);
  const [airwayRemover, setAirwayRemover] = useState(false);
  return(
    <View style={styles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScreenTitle
          title="Het gaat minder"
          subTitle="Mijn astma wordt erger, mijn klachten nemen toe"
          />
        <ActionCard
          planText="Neem 2 puffen salbutamol via voorzetkamer en herhaal dit elke 20 minuten gedurende één uur. "
          color={COLORS.yellow}
        />
        <View style={{marginTop: 20}}>
          <View style={styles.checkContainer}>
            <CheckBox
              tintColors={{ true: COLORS.darkBlue }}
              value={complaintsSelected}
              onValueChange={setComplaintsSelection}
              style={styles.checkbox}
            />
            <Text style={styles.checkLabel}>Mijn klachten nemen toe / komen terug; benauwdheid, kortademig, hoesten, slijm, piepen</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              tintColors={{ true: COLORS.darkBlue }}
              value={awakeSelected}
              onValueChange={setAwakeSelected}
              style={styles.checkbox}
            />
            <Text style={styles.checkLabel}>Ik word er 's nachts wakker van</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              tintColors={{ true: COLORS.darkBlue }}
              value={activitiesSelected}
              onValueChange={setActivitiesSelected}
              style={styles.checkbox}
            />
            <Text style={styles.checkLabel}>Ik kan mijn dagelijkse activiteiten niet goed doen</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              tintColors={{ true: COLORS.darkBlue }}
              value={airwayRemover}
              onValueChange={setAirwayRemover}
              style={styles.checkbox}
            />
            <Text style={styles.checkLabel}>Ik gebruik mijn luchtwegverwijderaar meer dan 2x per dag (extra).</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    minHeight: '100%'
  },
  checkContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '90%',
  },
  checkbox:{
    borderColor: COLORS.darkBlue
  },
  checkLabel: {
    color: COLORS.darkBlue
  }
});

export default ActionPlanFeelingLess;
