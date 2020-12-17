import React, {useState, useEffect, useMemo} from 'react';
import {ActivityIndicator, AsyncStorage, Button, Text, View, StyleSheet, ToastAndroid} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';

//constants
import {COLORS} from './src/constants/Colors';

//screens
import LoginScreen from './src/screens/authenticationflow/LoginScreen';
import SignUpScreen from './src/screens/authenticationflow/SignUpScreen';
import AsthmaRegistration from './src/screens/authenticationflow/AsthmaRegistration';
import HomeScreen from './src/screens/homeflow/HomeScreen';
//peakflow-flow
import StatisticsScreen from './src/screens/statisticsflow/StatisticsScreen';
import MeasurePeakflowScreen from './src/screens/statisticsflow/MeasurePeakflowScreen';
//actionplanflow
import ActionPlanScreen from './src/screens/actionplanflow/ActionPlanScreen';
import ActionPlanFeelingGood from './src/screens/actionplanflow/ActionPlanFeelingGood';
import ActionPlanFeelingLess from './src/screens/actionplanflow/ActionPlanFeelingLess';
import ActionPlanFeelingBad from './src/screens/actionplanflow/ActionPlanFeelingBad';
import ActionPlanAsthmaAttack from './src/screens/actionplanflow/ActionPlanAsthmaAttack';
import LogAsthmaAttack from './src/screens/actionplanflow/LogAsthmaAttack';
import ExercisesScreen from './src/screens/exercisesflow/ExercisesScreen';
import ProfileScreen from './src/screens/userflow/ProfileScreen';
import EditUserScreen from './src/screens/userflow/EditUserScreen';
//MedicationFlow
import MedicationLogger from './src/screens/MedicationFlow/MedicationLogger';
import MedicationOverview from './src/screens/MedicationFlow/MedicationOverview';

import {AuthContext} from './src/context/context';

//home
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Overzicht" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

// statistics
const StatisticsStack = createStackNavigator();

function StatisticsStackScreen() {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="Overzicht" component={StatisticsScreen} />
      <StatisticsStack.Screen name="Peakflow invullen" component={MeasurePeakflowScreen} />
      <StatisticsStack.Screen name="MedicatieLogger" component={MedicationLogger} />
      <StatisticsStack.Screen name="MedicatieOverview" component={MedicationOverview} />
    </StatisticsStack.Navigator>
  );
}

//actionplan
const ActionPlanStack = createStackNavigator();

function ActionPlanStackScreen() {
  return (
    <ActionPlanStack.Navigator>
      <ActionPlanStack.Screen name="Actieplan" component={ActionPlanScreen}/>
      <ActionPlanStack.Screen name="Goed" component={ActionPlanFeelingGood}/>
      <ActionPlanStack.Screen name="Minder" component={ActionPlanFeelingLess}/>
      <ActionPlanStack.Screen name="Geen verbetering" component={ActionPlanFeelingBad}/>
      <ActionPlanStack.Screen name="Aanval" component={ActionPlanAsthmaAttack}/>
      <ActionPlanStack.Screen name="Aanval logboek" component={LogAsthmaAttack}/>
    </ActionPlanStack.Navigator>
  );
}

//exercises
const ExercisesStack = createStackNavigator();

function ExercisesStackScreen() {
  return (
    <ExercisesStack.Navigator>
      <ExercisesStack.Screen name="Oefeningen" component={ExercisesScreen}/>
    </ExercisesStack.Navigator>
  );
}

//profile
const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profiel" component={ProfileScreen}/>
      <ProfileStack.Screen name="Instellingen" component={EditUserScreen}/>
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const initialUserState = {
    isLoading: true,
    firstname: null,
    lastname: null,
    userName: null,
    userToken: null,
    asthmaType: null,
    triggers: [],
    medication: [],
  }

  const loginReducer = (prevState, action) =>{
    switch (action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'RETRIEVE_USER':
        return {
          ...prevState,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          firstname: action.firstname,
          lastname: action.lastname,
          asthmaType: action.asthmaType,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          firstname: action.firstname,
          lastname: action.lastname,
          userName: action.id,
          userToken: action.token,
          asthmaType: action.asthmaType,
          triggers: action.triggers,
          medication: action.medication,
          isLoading: false,
        };
      case 'ADD_ASTHMA':
        return {
          ...prevState,
          asthmaType: action.asthmaType,
          triggers: action.triggers,
          medication: action.medication,
          isLoading: false,
        };
      case 'UPDATE_PROFILE':
        return {
          ...prevState,
          firstname: action.firstname,
          lastname: action. lastname,
          userName: action.id,
          password: action.password,
          asthmaType: action.asthmaType,
        };
      default:
        return prevState;
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialUserState);
  const token = loginState.userToken;
  const asthmaType = loginState.asthmaType;
  let userObject = loginState;

  const setStorage = async (userToken, firstname, lastname, email, asthmaType ) =>{
    await AsyncStorage.setItem('userToken', userToken);
    await AsyncStorage.setItem('userFirstName', firstname);
    await AsyncStorage.setItem('userLastName', lastname);
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userAsthmaType', asthmaType);
  }

  const loadData = async (token) => {
    console.log(token);
      await axios({
          method: 'GET',
          url: `${Constants.manifest.extra.API_URL}/user/info`,
          headers: {
            'X-Auth-Token': token
          }
      }).then(async (res) => {
          await AsyncStorage.setItem('userFirstName', res.data.firstname);
          await AsyncStorage.setItem('userLastName', res.data.lastname);
          await AsyncStorage.setItem('userEmail', res.data.email);
          await AsyncStorage.setItem('userAsthmaType', res.data.asthmaType);
          // save new values to AsyncStorage
          await AsyncStorage.setItem('userTriggers', JSON.stringify(res.data.triggers));
          await AsyncStorage.setItem('userMedication', JSON.stringify(res.data.medication));
      }).catch((error) => {
          console.log(error);
      })
  };

  const authContext = useMemo((loginState) => ({
    signIn: async (email, password) => {
        //TODO: fill async storage by requesting data
      let userToken = null;
      let body = {
          email,
          password,
      };
      await axios({
          method: 'POST',
          url: `${Constants.manifest.extra.API_URL}/user/login`,
          header: {
              'content-type': 'application/json'
          },
          data: body
      }).then( async (res) => {
          userToken = res.data.token;
          await AsyncStorage.setItem('userFirstName', res.data.firstname);
          await AsyncStorage.setItem('userLastName', res.data.lastname);
          // TODO: API return email to set here
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userAsthmaType', res.data.asthmaType);
          await AsyncStorage.setItem('userTriggers', JSON.stringify(res.data.triggers));
          await AsyncStorage.setItem('userMedication', JSON.stringify(res.data.medication));
          await AsyncStorage.setItem('userToken', userToken);
      }).catch((error) => {
          console.log(error.response);
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      });
      setTimeout(() => {
        dispatch({type: 'LOGIN', id: email, token: userToken});
      }, 200);
    },
    signOut: async () => {
      //TODO: clear async storage
      try{
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userFirstName');
        await AsyncStorage.removeItem('userLastName');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userMedication');
        await AsyncStorage.removeItem('userTriggers');
      } catch(error){
        console.log(error);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: async (firstname, lastname, email, password, asthmaType, medication, triggers) => {
      let userToken = null;
      let body = {
          firstname,
          lastname: lastname || null,
          email,
          password,
          asthmaType,
          medication,
          triggers,
      };

      // TODO: save medications and triggers to DB
      await axios({
          method: 'POST',
          url: `${Constants.manifest.extra.API_URL}/user/signup`,
          header: {
              'content-type': 'application/json'
          },
          data: body
      }).then(async (res) => {
          userToken = res.data.token;
          // loadData(userToken);
          await AsyncStorage.setItem('userToken', userToken);
          //TODO: Dayella vragen of dit ook hierin kan
          dispatch({type: 'REGISTER', firstname: firstname, lastname: lastname, id: email, token: userToken});

          setTimeout(() => {
            dispatch({type: 'LOGIN', id: email, token: userToken});
          }, 200);
      }).catch((error) => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
          console.log(error);
      });
      
    },
    updateProfile: async (firstname, lastname, email, password, asthmaType) => {
      let body = {
        firstname: firstname,
        lastname: lastname || '',
        email: email,
        password: password || '',
        asthmaType: asthmaType
      }
      await axios({
        method: 'PATCH',
        url: `${Constants.manifest.extra.API_URL}/user/edit`,
        headers: {
          'X-Auth-Token': token,
        },
        data: body
      }).then( (res) => {
        loadData(token);
        //setStorage(token, firstname, lastname, email, asthmaType);
      }).catch((error) => {
        console.log(error);
      });
      dispatch({type: 'UPDATE_PROFILE', firstname: firstname, lastname: lastname, id: email, asthmaType: asthmaType });
    },
    retrieveToken: () => {
      return userObject;
    },
  }));

  useEffect(() => {
    setTimeout( async () =>{
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
        // TODO: check if user has internet else don't loadData
        if(!!userToken) {
          console.log("doing this!");
          // console.log(userToken);  
          loadData(userToken);
        }
      } catch(error){
        console.log(error);
      }
      dispatch({type: 'RETRIEVE_USER'});
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if(loginState.isLoading){
    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator color={COLORS.darkBlue} size="large" />
            </View>
          );
  }

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      {loginState.userToken !== null
        ?(<Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              size = 24;

              if (route.name === 'Overzicht') {
                iconName = "home";
              } else if (route.name === 'Grafieken') {
                iconName = "bar-chart";
              } else if(route.name === 'Actieplan'){
                iconName = "exclamation-circle";
              } else if(route.name === 'Oefeningen'){
                iconName = "leaf";
              } else if(route.name === 'Profiel'){
                iconName = "user";
              }
              return(
                <View style={styles.container}>
                  <FontAwesome name={iconName} size={size} color={color} />
                  { focused
                  ? <Text style={styles.activeDot}> . </Text>
                  : <Text style={styles.inactiveDot}> . </Text>
                }
                </View>
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: '#C2C2C2',
            showLabel: false,
            keyboardHidesTabBar: true,
            style: { position: 'absolute' }
          }}
          >
          <Tab.Screen name="Overzicht" component={HomeStackScreen}  />
          <Tab.Screen name="Grafieken" component={StatisticsStackScreen} />
          <Tab.Screen name="Actieplan" component={ActionPlanStackScreen} />
          <Tab.Screen name="Oefeningen" component={ExercisesStackScreen} />
          <Tab.Screen name="Profiel" component={ProfileStackScreen} />
        </Tab.Navigator>
    )
      :(<Stack.Navigator>
          <Stack.Screen name="Inloggen" component={LoginScreen} />
          <Stack.Screen name="Registreren" component={SignUpScreen} />
          <Stack.Screen name="Astma gegevens" component={AsthmaRegistration} />
        </Stack.Navigator>
      )
    }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  activeDot: {
    fontSize: 40,
    color: COLORS.cyan,
    marginTop: -35,
  },
  inactiveDot: {
    fontSize: 40,
    color: COLORS.white,
    marginTop: -35,
  }
});
