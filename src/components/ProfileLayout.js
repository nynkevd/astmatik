import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { COLORS } from '../constants/Colors';

const ProfileLayout = (props) => {
  return(
    <View style={styles.container}>
        <View>
            <Image style={styles.rightTop} source={require('../../assets/hexagon_blue.png')} />
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightTop:{
    position: 'absolute',
    width: 666,
    height: 800,
    top: -250,
    left: -175,
    transform: [{rotate: '-35deg'}]
  },
});

export default ProfileLayout;
