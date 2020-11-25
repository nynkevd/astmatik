import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS } from '../constants/Colors';

const ContactCard = (props) => {
  return(
    <View>
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>{props.phoneNumber}</Text>
        <Text style={styles.text}>{props.location}</Text>
      </View>
      <FontAwesome style={styles.phone} name="phone" />
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.orange,
    borderRadius: 10,
    marginVertical: 10
  },
  textContainer:{
    padding: 20
  },
  text:{
    fontSize: 16,
    color: COLORS.darkBlue
  },
  phone:{
    position: 'absolute',
    right: 50,
    fontSize: 32,
    transform: [{rotate: '270deg' }],
    color: COLORS.orange
  }
});

export default ContactCard;
