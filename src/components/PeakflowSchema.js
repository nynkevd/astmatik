import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";

import { COLORS } from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const PeakflowSchema = (props) => {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

      useEffect(() => {
        // console.log("data changed!");
      }, [props.data]);
  return(
    <View style={[styles.cardContainer, GlobalStyles.shadowed]}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.text}>{props.subTitle}</Text>
      <LineChart
        data={{
          labels: ["M", "D", "W", "D", "V", "Z", "Z"],
          datasets: [{
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]
          }]
        }}
        width={350}
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: COLORS.white,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 212, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#00D4FF"
          }
          }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection: 'column',
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkBlue
  },
  text:{
    fontSize: 16,
    color: COLORS.darkBlue
  },
});

export default PeakflowSchema;