import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import moment from 'moment';

import { COLORS } from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const PeakflowSchema = (props) => {
    const [week, setWeek] = useState(true);
    const [labels, setLabels] = useState();

    const [morningData, setMorningData] = useState([0]);
    const [eveningData, setEveningData] = useState([0]);

      useEffect(() => {
        setMorningData(props.data.morning);
        setEveningData(props.data.evening);
        if (props.labels == "week") {
          setLabels(["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"]);
          setWeek(true);
        } else if (props.labels == "month") {
          let tempLabels = [];
          for (let i = 0; i < moment().endOf("month").format("DD"); i++) {
            if ((i + 1)%5 == 0 || i == 0) {
              tempLabels[i] = (i + 1).toString();
            }
          }
          setLabels(tempLabels);
          setWeek(false)
        }
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
            color: (opacity = 1) => `rgba(0, 170, 204, ${opacity})`,
          },
          {
            data: eveningData,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0, 78, 128, ${opacity})`,
          }],
          legend: ["Ochtend", "Avond"]
        }}
        width={Dimensions.get("window").width * 0.8}
        height={Dimensions.get("window").height * 0.25}
        yAxisInterval={100}
        segments={6}
        withVerticalLines={false}
        withHorizontalLines={true}
        chartConfig={{
          backgroundColor: COLORS.white,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.white,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 212, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "2",
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