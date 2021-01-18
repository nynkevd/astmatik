import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AppButton from '../../components/AppButton';
import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import InputField from '../../components/InputField';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const ActionPlanFeelingLess = ({route}) => {
  const navigation = useNavigation();
  const [complaintsSelected, setComplaintsSelection] = useState(false);
  const [awakeSelected, setAwakeSelected] = useState(false);
  const [activitiesSelected, setActivitiesSelected] = useState(false);
  const [airwayRemover, setAirwayRemover] = useState(false);
  const [notes, setNotes] = useState();
  const [edit, setedit] = useState(false);

  const [update, forceUpdate] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [hasUpdated, setHasUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!!route.params && route.params.update == true && lastUpdate !== route.params.timestamp) {
      setLastUpdate(route.params.timestamp);
      setHasUpdated(false);
  }

  if (!!route.params && route.params.update == true && hasUpdated == false) {
      forceUpdate(!update);
      setHasUpdated(true);
  }

  const handleConfirm = async () => {
    let body = {
      complaintsSelected,
      awakeSelected,
      activitiesSelected,
      airwayRemover,
    };
    await AsyncStorage.setItem('actionPlanLess', JSON.stringify(body));
    await AsyncStorage.setItem('actionPlanScratchNoteLess', notes);
    setedit(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    console.log(body);
  }

  useEffect( () => {
    (async () =>{
      let data = await AsyncStorage.getItem('actionPlanLess');
      let scratchNote = await AsyncStorage.getItem('actionPlanScratchNoteLess');
      if(data !== null){
        data = JSON.parse(data);
        setComplaintsSelection(data.complaintsSelected);
        setAirwayRemover(data.airwayRemover);
        setActivitiesSelected(data.activitiesSelected);
        setAwakeSelected(data.awakeSelected);
        console.log(data);
      }
      if(scratchNote !== null){
        setNotes(scratchNote);
        setedit(true);
      }
    })();
  }, [update]);

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

          <Text style={[GlobalStyles.label, {fontSize: 16, fontWeight: 'bold', paddingLeft: 3, marginTop: 10}]}>Notitie</Text>
          { edit
            ?<TouchableOpacity style={{paddingVertical: 15, paddingHorizontal: 10,  marginVertical: 10, borderColor: COLORS.darkBlue, borderWidth: 1, borderRadius: 10}} onPress={() => setedit(false)}>
              <Text style={GlobalStyles.text}>{notes}</Text>
            </TouchableOpacity>
            : <>
             <InputField
                value={notes}
                onChange={value => setNotes(value)}
                multiline
              />
            </>
          }

        </View>

        <View style={{marginTop: 10}}></View>

        <AppButton
          text="opslaan"
          onPress={() => handleConfirm()}
        />
          {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}

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
