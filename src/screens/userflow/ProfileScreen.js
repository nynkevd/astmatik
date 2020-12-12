import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
import {FontAwesome5, Entypo, Feather, MaterialCommunityIcons} from '@expo/vector-icons';

import ProfileLayout from '../../components/ProfileLayout';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles'

const ProfileScreen = ({route}) => {
  const size = 18;
  const color = COLORS.darkBlue;

  let time = "10:10";
  let date = "26 november 2020";

  const [isLoading, setIsLoading] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [asthmaType, setAsthmaType] = useState('');

  const [medication, setMedication] = useState([]);
  const [excersises, setExcersises] = useState([]);

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

  useEffect(() => {
    (async function loadData() {
        setIsLoading(true);
        await axios({
            method: 'GET',
            url: `${Constants.manifest.extra.API_URL}/user/profile/${Constants.manifest.extra.USER_ID}`,
        }).then((res) => {
            setFirstName(res.data.firstname);
            setLastName(res.data.lastname);
            setEmail(res.data.email);
            setAsthmaType(res.data.asthmaType);
            // TODO : Change to user info
            setMedication(["budesonide", "salbutamol", "vilanterol"]);
            setExcersises(["huffen", "diep inademen"]);
        }).catch((error) => {
            console.log(error);
        });
        setIsLoading(false);
    })();
  }, [update]); 


  const navigation = useNavigation();
  const settingsPress = () => {
    navigation.navigate("Instellingen", {firstName, lastName, email, asthmaType});
    // navigation.navigate("Instellingen", {firstName, lastName, email, asthmaType, update, forceUpdate: forceUpdate});
  }

  return(
    <View style={GlobalStyles.container}>
      <ProfileLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>{firstName} {lastName || null} </Text>
          <TouchableOpacity onPress={settingsPress}>
            <Feather name="settings" size={22} color={color}/>
          </TouchableOpacity>
        </View>

        <View style={styles.iconText}> 
          <FontAwesome5 name="clock" size={size} color={color} style={styles.icon}/>
          <Text style={styles.iconText__text}> {time} &nbsp; | &nbsp; {date}</Text> 
        </View>

        <View>
          <View style={styles.iconText}> 
            <Entypo name="mail" size={size} color={color} style={styles.icon}/>
            <Text style={styles.iconText__text}> {email} </Text>
          </View>
          <View style={styles.iconText}>
            <Feather name="type" size={size} color={color} style={styles.icon}/>
            <Text style={styles.iconText__text}> {asthmaType} </Text>
          </View>
          {/* <View style={styles.iconText}>
            <MaterialCommunityIcons name="doctor" size={size} color={color} style={styles.icon}/>
            <Text style={styles.iconText__text}> Dr. N. van Dijk </Text>
          </View> */}
        </View>

        <View style={styles.list}>
          <View style={[styles.iconText, styles.listTitle]}>
              <FontAwesome5 name="notes-medical" size={size} color={color} style={styles.icon}/>
              <Text style={[styles.iconText__text, GlobalStyles.bold]}>Medicatie </Text>
          </View>
          {medication && medication.length > 0 ? medication.map(medicationItem => 
            <Text key={medicationItem} style={styles.iconText__text}> {medicationItem} </Text>) : null}
        </View>

        <View style={styles.list}>
          <View style={[styles.iconText, styles.listTitle]}>
              <MaterialCommunityIcons name="doctor" size={size} color={color} style={styles.icon}/>
              <Text style={[styles.iconText__text, GlobalStyles.bold]}>Oefeningen</Text>
          </View>
          {excersises && excersises.length > 0 ? excersises.map(excersise=> 
          <Text key={excersise} style={styles.iconText__text}> {excersise} </Text>) : null}
        </View>
      
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
    alignItems: 'center'
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
  },
  list: {
    marginVertical: 10,
  },
  listTitle: {
    alignSelf: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.darkBlue
  }
})

export default ProfileScreen;
