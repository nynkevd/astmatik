import React, {useState, useEffect} from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';
import GlobalStyles from '../../constants/GlobalStyles';
import MainLayout from '../../components/MainLayout';
import { COLORS } from '../../constants/Colors';
import moment from 'moment';
import localization from 'moment/locale/nl';
import {AuthContext} from '../../context/context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const HomeScreen = ({route}) => {
  moment.updateLocale('nl', localization);
  const {retrieveToken} = React.useContext(AuthContext);
  const {userToken} = retrieveToken();
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [lat, setLat] = useState('52.379189');
  const [lon, setLon] = useState('4.899431');
  const [time, setTime] = useState(moment().format("HH:mm"));
  let date = moment().format('D MMMM YYYY');
  const [todaysData, setTodaysData] = useState({morning: {}, evening: {}});
  const [update, forceUpdate] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [hasUpdated, setHasUpdated] = useState(false);
  const [icon, setIcon] = useState('cloud');

  const getLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted'){
      console.log('PERMISSION DENIED');
    }
    const userLocation = await Location.getCurrentPositionAsync();
    setLocation(userLocation);
    setLat(userLocation.coords.latitude);
    setLon(userLocation.coords.longitude);
  }

  // const [date, setDate] = useState(moment().format('D MMMM YYYY'));
  let greeting = 'Hi!';
  const [description, setDescription] = useState();
  const [temp, setTemp] = useState();
  let key = "f4bce834d5ac18e52842463a75b22837";
  let city = "Amsterdam,nl";
  let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&lang=nl&appid=${key}`
  const currentHour = moment().format('HH');
  const morning = 12;
  const evening = 18;

  if(currentHour < 12 ){
    greeting="Goedemorgen";
  }
  if(currentHour >= 12 && currentHour < 18){
    greeting="Goedemiddag";
  }
  if(currentHour >= 18 && currentHour < 24 ){
    greeting="Goedenavond";
  }
  if(currentHour >= 0 && currentHour < 6 ){
    greeting="Goedennacht";
  }

  if (!!route.params && route.params.update == true && lastUpdate !== route.params.timestamp) {
      setLastUpdate(route.params.timestamp);
      setHasUpdated(false);
  }

  if (!!route.params && route.params.update == true && hasUpdated == false) {
      forceUpdate(!update);
      setHasUpdated(true);
  }

  const loadData = async () => {
    getLocation();
    await axios({
        method: 'GET',
        url: `${Constants.manifest.extra.API_URL}/peakflow/overview`,
        headers: {
            'X-Auth-Token': userToken
        }
    }).then((res) => {
        setTodaysData(res.data.today);
    }).catch((error) => {
        console.log(error);
    });
    await axios({
      method: 'GET',
      url:url2
    }).then(async (res) => {
        await AsyncStorage.setItem('currentWeatherData', JSON.stringify(res.data.current));
    }).catch((error) => {
        console.log(error);
     });
}

useFocusEffect(
   React.useCallback(() => {
     loadWeather();
     loadData();
     setTime(moment().format("HH:mm"))
   }, [update])
 );

//thunderstorm, drizzle, rain, snow, clear, clouds

 const loadWeather = async () =>{
     const current = JSON.parse(await AsyncStorage.getItem('currentWeatherData'));
     let des = current.weather[0].description.split(' ');
     setTemp( Math.round(current.temp - 273));
     setDescription(des[des.length - 1]);
     if(current.weather[0].main == 'clear'){
       setIcon('sun');
     } else if (current.weather[0].main == 'Clouds'){
       setIcon('cloud');
     } else if (current.weather[0].main == 'Snow'){
       setIcon('snowFlake');
     } else if(current.weather[0].main == 'Rain'){
       setIcon('cloud-rain');
     } else if(current.weather[0].main == 'Thunderstorm'){
       setIcon('bolt');
     } else if(current.weather[0].main == 'Drizzle'){
       setIcon('cloud-rain');
     } else {
       setIcon('question');
     }
 }

  useEffect(() => {
    //TODO: determine wether we want to update time automatically
    // setInterval(() => {
    //   setTime(moment().format("HH:mm"));
    // }, 2000)
      loadData();
    },[update]);

  return(
    <View style={GlobalStyles.container}>
      <MainLayout/>
      <ScrollView
        contentContainerStyle={GlobalStyles.contentContainer}
      >
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>{greeting}, Dayella</Text>
      </View>

      <View style={styles.iconText}>
      <FontAwesome5 name="clock" size={16} color={COLORS.darkBlue} style={styles.icon}/>
        <Text style={styles.iconText__text}> {time} &nbsp; | &nbsp; {date}</Text>
      </View>

      <View style={styles.weather}>
        <FontAwesome5 name={icon} size={24} color={COLORS.gray} style={styles.icon}/>
        <Text style={styles.weatherText}>{description}</Text>
        <Text style={styles.weatherText}>&nbsp; {temp}&#176;C </Text>
        <FontAwesome5 name="exclamation-triangle" size={20} color='#ffa366' style={{marginLeft:45}}/>
        <Text style={styles.weatherText}>Pollen</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={(() => navigation.navigate('Grafieken', {screen: 'Overzicht'}))} style={styles.peakflowCard}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cardTitle, {fontWeight: 'bold'}]}>Peakflow</Text>
          <Text style={styles.cardTitle}>vandaag</Text>
          <FontAwesome5 name="pen" size={20} color={COLORS.darkBlue} style={{position: 'absolute', right: 20, paddingHorizontal: 10}}/>
        </View>
        <View style={styles.PeakflowTime}>
            <FontAwesome5 name="sun" size={20} color={COLORS.darkBlue} style={styles.icon}/>
            <Text style={styles.iconText__text}>
            {todaysData.morning.beforeMedication} &nbsp; | &nbsp; {todaysData.morning.afterMedication}
            </Text>
        </View>
        <View style={styles.PeakflowTime}>
            <FontAwesome5 name="moon" size={20} color={COLORS.darkBlue} style={styles.icon}/>
            <Text style={styles.iconText__text}>{todaysData.evening.beforeMedication} &nbsp; | &nbsp; {todaysData.evening.afterMedication}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={(() => navigation.navigate('Grafieken',{screen: 'Medicatie'} ))} style={styles.medicationCard}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cardTitle, {fontWeight: 'bold', color: COLORS.white}]}>Medicatie</Text>
          <Text style={[styles.cardTitle, {color: COLORS.white}]}>vandaag</Text>
          <FontAwesome5 name="pen" size={20} color={COLORS.white} style={{position: 'absolute', right: 20, paddingHorizontal: 10}}/>
        </View>
        <View style={styles.PeakflowTime}>
            <FontAwesome5 name="sun" size={20} color={COLORS.white} style={styles.icon}/>
            <Text style={[styles.iconText__text, {color: COLORS.white}]}> salbutamol &nbsp; | &nbsp; budesonide</Text>
        </View>
        <View style={styles.PeakflowTime}>
            <FontAwesome5 name="moon" size={20} color={COLORS.white} style={styles.icon}/>
            <Text style={[styles.iconText__text, {color: COLORS.white}]}> vilanterol</Text>
        </View>
      </TouchableOpacity>


      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <TouchableOpacity activeOpacity={0.7} onPress={(() => navigation.navigate('Actieplan'))} style={[styles.subCards, {backgroundColor: COLORS.yellow}]}>
          <Text style={styles.subCardsTitle}>Actieplan</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={(() => navigation.navigate('Oefeningen'))} style={[styles.subCards, {backgroundColor: COLORS.pink}]}>
          <Text style={[styles.subCardsTitle, {color: COLORS.white}]}>Oefeningen</Text>
        </TouchableOpacity>
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
  greeting:{
    marginTop: 15,
  },
  greetingText: {
    fontSize: 26,
    marginVertical: 10,
    color: COLORS.darkBlue
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
  weather:{
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    elevation: 5
  },
  weatherText:{
    paddingLeft: 5,
    color: COLORS.darkBlue,
    alignSelf: 'center',
    fontSize: 16
  },
  peakflowCard:{
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 25,
    borderRadius: 10,
    elevation: 5
  },
  cardTitle:{
    color: COLORS.darkBlue,
    marginHorizontal: 10,
    fontSize: 16
  },
  PeakflowTime:{
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10
  },
  medicationCard:{
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 25,
    borderRadius: 10,
    elevation: 5
  },
  subCards:{
    width: '47%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 25
  },
  subCardsTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black
  }
});

export default HomeScreen;
