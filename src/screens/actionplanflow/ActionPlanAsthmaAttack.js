import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import InputField from '../../components/InputField';

import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';
import { FontAwesome } from '@expo/vector-icons';

const ActionPlanAsthmaAttack = () => {
  const navigation = useNavigation();
  const [note, setNote] = useState();
  const [update, setUpdate] = useState(false);
  const [nrLungMedic, setNrLungMedic] = useState("");
  const [nrDoc, setNrDoc] = useState("");
  const [edit, setedit] = useState(false);

  const handleNavigate = () => {
    navigation.navigate('Aanval logboek');
  }
  //should be changed
  const phoneNumberMedic = '+31612345678';
  const phoneNumberLungMedic = '+31623456789';

  useEffect( () => {
    (async () =>{
      let allKeys = await AsyncStorage.getAllKeys();
      let data = await AsyncStorage.getItem('ActionPlanBad');
      let scratchNote = await AsyncStorage.getItem('actionPlanScratchNote');
      if(data !== null){
        data = JSON.parse(data);
        setNrLungMedic(data.nrLungMedic);
        setNrDoc(data.nrDoc);
        setUpdate(true);
        console.log(data);
      }
    if(scratchNote !== null){
      console.log(scratchNote);
      setNote(scratchNote);
      setedit(true);
    }
    console.log(allKeys);
    })();
  }, [update]);

  const handleNote = async () =>{
    await AsyncStorage.setItem('actionPlanScratchNote', note);
    setedit(true);
  }

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
              <TouchableOpacity  onPress={() => {Linking.openURL('tel:' + nrLungMedic)}} style={styles.phoneButton}>
                <FontAwesome name="phone" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 50}}>
              <Text style={{color: COLORS.darkBlue}}>Huisarts</Text>
              <TouchableOpacity onPress={() => {Linking.openURL('tel:' + nrDoc)}} style={styles.phoneButton}>
                <FontAwesome name="phone" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[GlobalStyles.label, {fontSize: 16, fontWeight: 'bold', paddingLeft: 3, marginTop: 10}]}>Notitie</Text>
          { edit
            ?<TouchableOpacity style={{paddingVertical: 15, paddingHorizontal: 10,  marginVertical: 10, borderColor: COLORS.darkBlue, borderWidth: 1, borderRadius: 10}} onPress={() => setedit(false)}>
              <Text style={GlobalStyles.text}>{note}</Text>
            </TouchableOpacity>
            : <>
             <InputField
                value={note}
                onChange={value => setNote(value)}
                multiline
              />
              <View>
                <TouchableOpacity onPress={() => handleNote()} style={{backgroundColor: COLORS.lightBlue, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 100, elevation: 3, position: 'absolute', right: 3, top: -20}}>
                  <FontAwesome size={24} name='check' color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </>
          }

          <View style={{marginVertical: 15}}></View>
          <AppButton
            onPress={handleNavigate}
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
