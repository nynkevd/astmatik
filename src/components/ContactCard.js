import React from 'react';
import {
  Linking,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
      <TouchableOpacity  style={styles.phone}  onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)}>
        <FontAwesome color={COLORS.orange} size={32} name="phone" />
      </TouchableOpacity>
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
    right: 30,
    transform: [{rotate: '270deg' }],
    padding: 25,
  }
});

export default ContactCard;
