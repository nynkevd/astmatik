import * as React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome} from '@expo/vector-icons';

//constants
import {COLORS} from './src/constants/Colors';

//screens
import LoginScreen from './src/screens/authenticationflow/LoginScreen';
import SignUpScreen from './src/screens/authenticationflow/SignUpScreen';
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


export default function App() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  return (
    <NavigationContainer>
      <Tab.Navigator
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

            // You can return any component that you like here!
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
    </NavigationContainer>
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