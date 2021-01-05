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
import PeakflowCard from "../../components/PeakflowCard";
import AppButton from '../../components/AppButton';
import {AuthContext} from '../../context/context';
import {Feather} from '@expo/vector-icons';

import {COLORS} from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';

const StatisticsScreen = ({route}) => {
    const {retrieveToken} = React.useContext(AuthContext);
    const {userToken} = retrieveToken();
    const navigation = useNavigation();

    const [activeFilter, setActiveFilter] = useState(0); // 0 = Vandaag, 1 = deze week, 2 = deze maand
    const [todaysData, setTodaysData] = useState({morning: {}, evening: {}});
    const [thisWeeksData, setThisWeeksData] = useState();
    const [thisMonthsData, setThisMonthsData] = useState();

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
        console.log("before");
        console.log(todaysData.morning);
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
                setThisMonthsData(res.data.thisMonth);
                console.log(!!Object.keys(todaysData.evening).length > 0);
            }).catch((error) => {
                console.log(error);
            });
            setIsLoading(false);
        })();

        console.log("after");
        console.log(todaysData.morning);
      }, [update]);

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
                
                {
                    activeFilter == 0 ?
                    <>
                    <Text style={styles.subTitle}>Ochtend</Text>
                    {!!todaysData.morning && !!Object.keys(todaysData.morning).length > 0 ? 
                    <PeakflowCard
                        morning={true}
                        data={todaysData.morning}
                    /> :
                    <View style={[styles.addPeakflow, GlobalStyles.shadowed]}>
                        <Text style={{color: COLORS.darkBlue}}> Voeg een ochtend meting toe </Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Peakflow invullen", {morning: true, edit: false})}} style={[styles.actionButton, GlobalStyles.shadowed]}>
                            <Feather name="plus" size={26} color="white"/>
                        </TouchableOpacity>
                    </View>
                    }
                   
                    <Text style={styles.subTitle}>Middag/Avond</Text> 
                    {!!todaysData.evening && !!Object.keys(todaysData.evening).length > 0 ? 
                    <PeakflowCard
                        morning={false}
                        data={todaysData.evening}
                    /> :
                    <View style={styles.addPeakflow}>
                        <Text style={{color: COLORS.darkBlue}}> Voeg een middag/avond meting toe </Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Peakflow invullen", {morning: false, edit: false})}} style={[styles.actionButton, GlobalStyles.shadowed]}>
                            <Feather name="plus" size={26} color="white"/>
                        </TouchableOpacity>
                    </View>
                    
                    }
                    </>
                   :
                   <React.Fragment>
                        <PeakflowSchema
                            title={"Peakflow"}
                            subTitle={"vóór medicatie"}
                            data={activeFilter == 1 ? thisWeeksData.beforeMedication : thisMonthsData.beforeMedication}
                            labels={activeFilter == 1 ? "week" : "month"}
                        />

                        <PeakflowSchema
                            title={"Peakflow"}
                            subTitle={"na medicatie"}
                            data={activeFilter == 1 ? thisWeeksData.afterMedication : thisMonthsData.afterMedication}
                            labels={activeFilter == 1 ? "week" : "month"}
                        />
                   </React.Fragment>
                }

                {/* <AppButton
                    onPress={() => {forceUpdate(!update)}}
                    text={"opnieuw"}
                />  */}
                
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkBlue,
        marginTop: 15,
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
    addPeakflow: {
        borderColor: COLORS.darkBlue,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: COLORS.white,
        marginVertical: 15,
        alignItems: 'center',
        padding: 15,
    },
    actionButton: {
        marginTop: 20, 
        backgroundColor: COLORS.darkBlue,
        borderRadius: 100,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default StatisticsScreen;
