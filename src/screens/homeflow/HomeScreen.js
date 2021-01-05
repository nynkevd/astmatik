import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import MainLayout from '../../components/MainLayout';

const HomeScreen = () => {
  return(
    <View style={GlobalStyles.container}>
      <MainLayout/>
      <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
