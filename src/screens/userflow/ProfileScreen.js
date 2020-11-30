import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import {FontAwesome5, Entypo, Feather, MaterialCommunityIcons} from '@expo/vector-icons';

import ProfileLayout from '../../components/ProfileLayout';
import ScreenTitle from '../../components/ScreenTitle';
import { COLORS } from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles'

const ProfileScreen = () => {
  const userId = "5fbfb5630c36fb00173a13d4";

  const size = 18;
  const color = COLORS.darkBlue;

  let time = "10:10";
  let date = "26 november 2020";

  const [name, setName] = useState('Naam');
  const [email, setEmail] = useState('Email');
  const [asthmaType, setAsthmaType] = useState('AsthmaType');

  const [medication, setMedication] = useState([]);
  const [excersises, setExcersises] = useState([]);

  const [update, forceUpdate] = useState(false);

  useEffect(() => {
    (async function loadData() {
        await axios({
            method: 'GET',
            url: `${Constants.manifest.extra.API_URL}/user/userProfile/${userId}`,
        }).then((res) => {
            setName(`${res.data.lastname ? (res.data.firstname + " " + res.data.lastname): res.data.firstname}`);
            setEmail(res.data.email);
            setAsthmaType(res.data.asthmaType);
            setMedication(["budesonide", "salbutamol", "vilanterol"]);
            setExcersises(["huffen", "diep inademen"]);
        }).catch((error) => {
            console.log(error);
        });
    })();
}, [update]);

  return(
    <View style={styles.container}>
    <ProfileLayout />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScreenTitle
          title={name}
        />

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
          <View style={styles.iconText}>
            <MaterialCommunityIcons name="doctor" size={size} color={color} style={styles.icon}/>
            <Text style={styles.iconText__text}> Dr. N. van Dijk </Text>
          </View>
        </View>

        <View style={styles.list}>
          <View style={[styles.iconText, styles.listTitle]}>
              <FontAwesome5 name="notes-medical" size={size} color={color} style={styles.icon}/>
              <Text style={[styles.iconText__text, GlobalStyles.bold]}> Medicatie </Text>
          </View>
          {medication && medication.length > 0 ? medication.map(medicationItem => 
            <Text key={medicationItem} style={styles.iconText__text}> {medicationItem} </Text>) : null}
        </View>

        <View style={styles.list}>
          <View style={[styles.iconText, styles.listTitle]}>
              <MaterialCommunityIcons name="doctor" size={size} color={color} style={styles.icon}/>
              <Text style={[styles.iconText__text, GlobalStyles.bold]}> Oefeningen </Text>
          </View>
          {excersises && excersises.length > 0 ? excersises.map(excersise=> 
          <Text key={excersise} style={styles.iconText__text}> {excersise} </Text>) : null}
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
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'stretch',
    // paddingHorizontal: 1,
    paddingBottom: 70,
    // minHeight: '100%'
  },
  iconText: {
    flex: 1,
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
    // alignSelf: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.darkBlue
  }
})

export default ProfileScreen;
