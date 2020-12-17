import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import axios from 'axios';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';
import PeakflowSchema from "../../components/PeakflowSchema";
import FloatingActionButton from "../../components/FloatingActionButton";
import AppButton from '../../components/AppButton';
import {AuthContext} from '../../context/context';

import {COLORS} from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';

const StatisticsScreen = ({route}) => {
    const {retrieveToken} = React.useContext(AuthContext);
    const {userToken} = retrieveToken();
    const navigation = useNavigation();

    const [activeFilter, setActiveFilter] = useState(0); // 0 = Vandaag, 1 = deze week, 2 = deze maand
    const [activeLabels, setActiveLabels] = useState('week');
    const [todaysData, setTodaysData] = useState();
    const [thisWeeksData, setThisWeeksData] = useState();
    const [thisMonthsData, setThisMonthsData] = useState();
    const [activeData, setActiveData] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [update, forceUpdate] = useState(false);
    const [lastUpdate, setLastUpdate] = useState('');
    const [hasUpdated, setHasUpdated] = useState(false);

    if (!!route.params && route.params.update == true && lastUpdate !== route.params.timestamp) {
        setLastUpdate(route.params.timestamp);
        setHasUpdated(false);
    }

    if (!!route.params && route.params.update == true && hasUpdated == false) {
        forceUpdate(!update);
        setHasUpdated(true);
    }

    useEffect(() => {
        (async function loadData() {
            setIsLoading(true);

            //TODO: FIX, same issue as attack
            console.log(userToken);
            await axios({
                method: 'GET',
                url: `${Constants.manifest.extra.API_URL}/peakflow/overview`,
                headers: {
                    'X-Auth-Token': userToken
                }
            }).then((res) => {
                setTodaysData(res.data.today);
                setThisWeeksData(res.data.thisWeek);
                console.log(res.data.thisWeek.beforeMedication);
                setThisMonthsData(res.data.thisMonth);
            }).catch((error) => {
                console.log(error);
            });
            setIsLoading(false);
        })();
      }, [update]);
      
    //   useEffect(() => {
    //     if (activeFilter == 0) {
    //         setActiveData(todaysData);
    //     } else if (activeFilter == 1) {
    //         setActiveData(thisWeeksData);
    //         // console.log(thisWeeksData.beforeMedication);
    //         setActiveLabels('week');
    //     } else if (activeFilter == 2) {
    //         setActiveData(thisMonthsData);
    //         // console.log(thisMonthsData.beforeMedication);
    //         setActiveLabels('month');
    //     }
    //     // console.log(activeData);
    //   }, [activeFilter]); 

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Mijn week in cijfers"
                    subTitle="Bekijk hier jouw gegevens van vandaag, deze week, of deze maand."
                />

                {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}

                <View style={[styles.filterButtons]}>
                    <TouchableOpacity disabled={isLoading} onPress = {() => {setActiveFilter(0)}} style={[activeFilter == 0 ? styles.activeFilter : styles.inActiveFilter, {borderTopLeftRadius: 25, borderBottomLeftRadius: 25}]}>
                        <Text style={activeFilter == 0 ? styles.activeFilterText : styles.inActiveFilterText}>vandaag</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isLoading} onPress = {() => {setActiveFilter(1)}} style={[activeFilter == 1 ? styles.activeFilter : styles.inActiveFilter, styles.middleFilter]}>
                        <Text style={activeFilter == 1 ? styles.activeFilterText : styles.inActiveFilterText}>deze week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isLoading} onPress = {() => {setActiveFilter(2)}} style={[activeFilter == 2 ? styles.activeFilter : styles.inActiveFilter, {borderTopRightRadius: 25, borderBottomRightRadius: 25}]}>
                        <Text style={activeFilter == 2 ? styles.activeFilterText : styles.inActiveFilterText}>deze maand</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection:"row", alignSelf: "center", paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity style={styles.peakflowButon}>
                        <Text style={styles.activeFilterText}>peakflow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigation.navigate("MedicatieOverview")} style={styles.medicationButton}>
                        <Text style={styles.activeFilterText}>medicatie</Text>
                    </TouchableOpacity>
                </View>

                <AppButton
                    onPress={() => {forceUpdate(!update)}}
                    text={"opnieuw"}
                /> 
                
                {
                   activeFilter == 0 ?
                   
                   todaysData && todaysData.length > 0 ? todaysData.map(peakflow=> 
                    <View style={styles.peakflow_card} key={peakflow.time}> 
                        <Text style={styles.card_time}> {peakflow.time} {peakflow.notes ? " -  " + peakflow.notes : null} </Text>
                        <View style={styles.card_value}>
                            <Text> voor medicatie: </Text>
                            <Text> {peakflow.beforeMedication} </Text>
                        </View>

                        <View style={styles.card_value}>
                            <Text> na medicatie: </Text>
                            <Text> {peakflow.afterMedication} </Text>
                        </View>
                    </View>
                    ) : <Text> Er is nog geen peakflow vandaag, begin nu met invullen of bekijk de afgelopen week of maand.</Text>
                   :
                   <React.Fragment>
                        <PeakflowSchema
                            title={"Peakflow"}
                            subTitle={"vóór medicatie"}
                            data={thisWeeksData.beforeMedication}
                            labels={activeFilter == 1 ? "week" : "month"}
                        />

                        <PeakflowSchema
                            title={"Peakflow"}
                            subTitle={"na medicatie"}
                            data={thisWeeksData.afterMedication}
                            labels={activeFilter == 1 ? "week" : "month"}
                        />
                   </React.Fragment>
                }
                

            </ScrollView>
            <FloatingActionButton onPress={() => {navigation.navigate("Peakflow invullen")}}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    peakflow_card: {
        backgroundColor: COLORS.white,
        borderRadius: 25,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.darkBlue
    },
    card_time: {
        color: COLORS.darkBlue,
        fontWeight: 'bold',
        fontSize: 15
    },
    card_value : {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    filterButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 25,
        padding: 0,
    },
    activeFilter: {
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        alignItems: 'center',
        padding: 5,
        height: '100%'
    },
    inActiveFilter: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        padding: 5,
        height: '100%'
    },
    middleFilter: {
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: COLORS.gray
    },
    activeFilterText: {
        fontFamily: "Roboto",
        color: COLORS.white,
        fontSize: 16,
    },
    inActiveFilterText: {
        fontFamily: "Roboto",
        color: COLORS.darkBlue,
        fontSize: 16,
    },
    peakflowButon: {
        padding: 5,
        marginRight: 20,
        width: 120,
        backgroundColor: COLORS.darkBlue,
        alignItems: "center",
        borderRadius: 5,
    },
    medicationButton: {
        padding: 5,
        width: 120,
        backgroundColor: COLORS.lightBlue,
        alignItems: "center",
        borderRadius: 5,
    },
});

export default StatisticsScreen;
