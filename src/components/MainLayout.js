import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { COLORS } from '../constants/Colors';

const MainLayout = (props) => {
  return(
    <View style={styles.container}>
        <View>
            <Image style={styles.rightTop} source={props.colored ?require('../../assets/hexagon_green.png') :require('../../assets/hexagon_blue.png')} />
            <Image style={styles.leftBottom} source={props.colored ?require('../../assets/hexagon_orange.png') :require('../../assets/hexagon_blue.png')} />
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
    width: 650,
    height: 650,
    top: -200,
    left: -160,
    marginLeft: 40
  },
  leftBottom:{
    position: 'absolute',
    width: 650,
    height: 650,
    top: 255,
    left: -450,
    transform: [{ rotate: '25deg'}]
  },
});

export default MainLayout;
