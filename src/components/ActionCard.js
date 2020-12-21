import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS } from '../constants/Colors';

const ActionCard = (props) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate(props.destination);
  }
  return(
    <View>
    { props.actionplan
      ? <TouchableOpacity
          onPress={handleNavigate}
          style={[styles.container, {borderColor: props.color}]}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
          <FontAwesome style={styles.arrow} name="arrow-right" size={24} color={props.color} />
        </TouchableOpacity>
      : <View style={[styles.specificContainer, {borderColor: props.color}, props.center ?{borderWidth: 2} : {borderWidth: 1}]}>
          <Text style={[props.bold ?styles.bold :{fontSize: 16, color: COLORS.darkBlue,}, props.center ?{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: props.color} :{textAlign: 'left'}]}>{props.planText}</Text>
        </View>
  }
  </View>
  )
};

const styles = StyleSheet.create({
  container:{
    marginTop: 15,
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    textAlign: 'left',
    backgroundColor: COLORS.white,
    elevation: 5
  },
  specificContainer:{
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    textAlign: 'left',
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  title:{
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.darkBlue
  },
  subtitle: {
    marginBottom: 10,
    maxWidth: '90%',
    color: COLORS.darkBlue
  },
  arrow: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
  bold:{
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    fontSize: 16
  }
});

export default ActionCard;
