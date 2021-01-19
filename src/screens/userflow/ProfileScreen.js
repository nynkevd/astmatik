import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import localization from 'moment/locale/nl';
import {FontAwesome5, Entypo, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {AuthContext} from '../../context/context';
import AppButton from '../../components/AppButton';
import ContactForm from '../../components/ContactForm';

import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';
import MainLayout from '../../components/MainLayout';

const ProfileScreen = ({route}) => {
  const {retrieveToken} = React.useContext(AuthContext);
  moment.updateLocale('nl', localization);
  const size = 18;
  const color = COLORS.darkBlue;

  const [time, setTime] = useState(moment().format("HH:mm"));
  let date = moment().format('D MMMM YYYY');

  const [isLoading, setIsLoading] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [asthmaType, setAsthmaType] = useState('');
  const [medicalEmail, setMedicalEmail] = useState('');

  const [medication, setMedication] = useState([]);
  const [excersises, setExcersises] = useState([]);
  const [triggers, setTriggers] = useState([]);

  const [update, forceUpdate] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [hasUpdated, setHasUpdated] = useState(false);

  if (!!route.params && route.params.update == true && lastUpdate !== route.params.timestamp) {
    setLastUpdate(route.params.timestamp);
    setHasUpdated(false);
  }

  if (!!route.params && route.params.update == true && hasUpdated == false) {
    forceUpdate(!update);
    setHasUpdated(true);
  }

  useFocusEffect(
     React.useCallback(() => {
       setTime(moment().format("HH:mm"));
     }, [update])
   );

  useEffect(() => {
      console.log("updating");
      (async function loadData() {
      let firstN = await AsyncStorage.getItem('userFirstName');
      let lastN = await AsyncStorage.getItem('userLastName');
      let mail = await AsyncStorage.getItem('userEmail');
      let type = await AsyncStorage.getItem('userAsthmaType');
      let trigs = JSON.parse(await AsyncStorage.getItem('userTriggers'));
      let meds = JSON.parse(await AsyncStorage.getItem('userMedication'));
      setFirstName(firstN);
      setLastName(lastN);
      setEmail(mail);
      setAsthmaType(type);
      setMedication(meds);
      setTriggers(trigs);
    })();
  }, [update]);

  const navigation = useNavigation();
  const settingsPress = () => {
    navigation.navigate("Instellingen", {update: false, firstName, lastName, email, asthmaType, triggers, medication});
  }

  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
        <View style={[styles.titleContainer, {marginTop: 37}]}>
          <Text style={[styles.screenTitle, {marginTop: 0}]}>{firstName} {lastName || null}</Text>
          <TouchableOpacity style={{marginRight: 5}} onPress={settingsPress}>
            <Feather name="settings" size={22} color={color}/>
          </TouchableOpacity>
        </View>

        <View style={[styles.iconText, {marginTop: 5, marginBottom: 15}]}>
          <FontAwesome5 name="clock" size={size} color={color} style={styles.icon}/>
          <Text style={styles.iconText__text}> {time} &nbsp; | &nbsp; {date}</Text>
        </View>

        <View>
          <View style={styles.iconText}>
            <Entypo name="mail" size={size} color={color} style={styles.icon}/>
            <Text style={styles.iconText__text}> {email} </Text>
          </View>
          <View style={styles.iconText}>
            <Image style={{ width:20, height: 16, marginRight: 10, alignSelf: 'center' }} source={require('../../../assets/lungs-solid.png')} />
            <Text style={styles.iconText__text}> {asthmaType} </Text>
          </View>
        </View>

        <View style={[styles.list, {marginTop: 25}]}>
          <View style={[styles.iconText, styles.listTitle]}>
              <FontAwesome5 name="notes-medical" size={size} color={color} style={styles.icon}/>
              <Text style={[styles.iconText__text, GlobalStyles.bold]}>Medicatie </Text>
          </View>

          {medication && medication.length > 0 ? medication.map(medicationItem =>
            <Text key={medicationItem.id} style={[GlobalStyles.text, styles.listItem]}> ⬡ {medicationItem.name} </Text>) : <Text> Nog geen medicatie, voeg ze nu snel toe in je instellingen</Text>}
        </View>


        <View style={styles.list}>
          <View style={[styles.iconText, styles.listTitle]}>
              <MaterialCommunityIcons name="doctor" size={size} color={color} style={styles.icon}/>
              <Text style={[styles.iconText__text, GlobalStyles.bold]}>Triggers</Text>
          </View>
          {triggers && triggers.length > 0 ? triggers.map(trigger=>
          <Text key={trigger.id} style={[GlobalStyles.text, styles.listItem]}> ⬡ {trigger.name} </Text>) : <Text> Nog geen triggers, voeg ze nu snel toe in je instellingen</Text>}
        </View>

        <ContactForm
          naam={firstName + ' ' +lastName}
        />

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    maxWidth: '95%'
  },
  screenTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  settingsButton: {
    backgroundColor: 'red',
    height: '100%',
    width: 30
  },
  iconText: {
    flexDirection: "row",
  },
  iconText__text: {
    fontSize: 18,
    color: COLORS.darkBlue,
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center'
  },
  list: {
    marginVertical: 10,
  },
  listItem: {
    marginVertical: 1
  },
  listTitle: {
    alignSelf: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.darkBlue
  }
})

export default ProfileScreen;
