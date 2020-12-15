import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import moment from 'moment';

import { COLORS } from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const PeakflowSchema = (props) => {
    const [labels, setLabels] = useState();

    const [morningData, setMorningData] = useState([0]);
    const [eveningData, setEveningData] = useState([0]);

      useEffect(() => {
        setMorningData([0]);
        setEveningData([0]);
        if (props.labels == "week") {
          setLabels(["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"]);
          // setMorningData([0, 0, 0, 0, 0, 0, 0]);
          // setEveningData([0, 0, 0, 0, 0, 0, 0]);
        } else if (props.labels == "month") {
          let tempLabels = [];
          for (let i = 0; i < moment().endOf("month").format("DD"); i++) {
            if ((i + 1)%5 == 0 || i == 0) {
              tempLabels[i] = (i + 1).toString();
            }
          }
          setLabels(tempLabels);
        }

        console.log("morning");
        console.log(morningData);

        let counter = 0;
          for (const peakflow of props.data) {
            // console.log("counter: " + counter);
            // console.log(peakflow)
              if (peakflow.morning) {
                let morningDataCopy = morningData;
                morningDataCopy[counter] = peakflow.value;
                setMorningData(morningDataCopy);
              } else if (!peakflow.morning) {
                let eveningDataCopy = eveningData;
                eveningDataCopy[counter] = peakflow.value;
                setEveningData(eveningDataCopy);
              } else {
                let morningDataCopy = morningData;
                morningDataCopy[counter] = 0;
                setMorningData(morningDataCopy);
                let eveningDataCopy = eveningData;
                eveningDataCopy[counter] = 0;
                setEveningData(eveningDataCopy);
              }
            counter++;
          }

          // console.log(morningData);
          // console.log("evening");
          // console.log(eveningData);
          // console.log(Array.from(eveningData, item => item || 0));
    
      }, [props.data]);

  return(
    <View style={[styles.cardContainer, GlobalStyles.shadowed]}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.text}>{props.subTitle}</Text>
      <LineChart
        data={{
          labels,
          datasets: [{
            data: morningData,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0, 212, 255, ${opacity})`,
          },
          {
            data: eveningData,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
          }],
          legend: ["Ochtend", "Avond"]
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
            r: "3",
            strokeWidth: "2",
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