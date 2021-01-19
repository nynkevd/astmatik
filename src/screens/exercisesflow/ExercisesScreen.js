import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import GlobalStyles from '../../constants/GlobalStyles';
import ScreenTitle from '../../components/ScreenTitle';
import ActionCard from '../../components/ActionCard';
import {COLORS} from '../../constants/Colors';
import {OPTIONS} from '../../constants/Options';
import { useNavigation } from '@react-navigation/native';

const ExercisesScreen = ({route}) => {
  const navigation = useNavigation();

  const handleNavigate = (specExercise) => {
    navigation.navigate('Oefening', {specExercise});
  }

  return(
    <View style={GlobalStyles.container}>
      <MainLayout />
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
        <ScreenTitle
          title="Oefeningen"
          subTitle="Deze oefeningen kunnen helpen bij het onder controle houden van je astma. Raadpleeg jouw zorgverlener voor de beste opties."
          />
        <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate(OPTIONS.ademrem) }>
          <ActionCard
            planText="Ademrem"
            center
            color={COLORS.green}
            />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate(OPTIONS.diepInademen)}>
          <ActionCard
            planText="Diep inademen"
            center
            color={COLORS.pink}
            />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate(OPTIONS.diepUitademen)}>
          <ActionCard
            planText="Diep uitademen"
            center
            color={COLORS.lightBlue}
            />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate(OPTIONS.huffen)}>
          <ActionCard
            planText="Huffen"
            center
            color={COLORS.darkBlue}
            />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
})

export default ExercisesScreen;
