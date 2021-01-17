import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5, Entypo, Feather, MaterialCommunityIcons} from '@expo/vector-icons';

import MainLayout from '../../components/MainLayout';
import ScreenTitle from '../../components/ScreenTitle';

import {COLORS} from '../../constants/Colors';
import GlobalStyles from '../../constants/GlobalStyles';

const MedicationOverview = () => {
    const navigation = useNavigation();

    const [activeFilter, setActiveFilter] = useState(0); // 0 = Vandaag, 1 = deze week, 2 = deze maand
    const [todaysData, setTodaysData] = useState();
    const [thisWeeksData, setThisWeeksData] = useState();
    const [thisMonthsData, setThisMonthsData] = useState();
    const [activeData, setActiveData] = useState([700, 800]);

    const [isLoading, setIsLoading] = useState(false);
    const [update, forceUpdate] = useState(false);

    // useEffect(() => {
    //     (async function loadData() {
    //         console.log("loading");
    //         setIsLoading(true);
    //         await axios({
    //             method: 'GET',
    //             url: `${Constants.manifest.extra.API_URL}/peakflow/overview/${userId}`,
    //         }).then((res) => {
    //             setTodaysData(res.data.today);
    //             setThisWeeksData(res.data.thisWeek);
    //             setThisMonthsData(res.data.thisMonth);
    //             console.log("finished");
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //         setIsLoading(false);
    //     })();
    //   }, [update]);

      useEffect(() => {
        console.log("Active Filter changed");
        if (activeFilter == 0) {
             setActiveData(todaysData);
            console.log(todaysData);
        } else if (activeFilter == 1) {
            setActiveData(thisWeeksData);
            console.log(thisWeeksData);
        } else if (activeFilter == 2) {
            setActiveData(thisMonthsData);
            console.log(thisMonthsData);
        }
      }, [activeFilter]);

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}>
                <ScreenTitle
                    title="Weekoverzicht"
                    subTitle="Bekijk hier jouw gegevens van vandaag, deze week, of deze maand."
                />

                {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}

                <View style={[styles.filterButtons]}>
                    <TouchableOpacity onPress = {() => {setActiveFilter(0)}} style={[activeFilter == 0 ? styles.activeFilter : styles.inActiveFilter, {borderTopLeftRadius: 25, borderBottomLeftRadius: 25}]}>
                        <Text style={activeFilter == 0 ? styles.activeFilterText : styles.inActiveFilterText}>vandaag</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {setActiveFilter(1)}} style={[activeFilter == 1 ? styles.activeFilter : styles.inActiveFilter, styles.middleFilter]}>
                        <Text style={activeFilter == 1 ? styles.activeFilterText : styles.inActiveFilterText}>deze week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {setActiveFilter(2)}} style={[activeFilter == 2 ? styles.activeFilter : styles.inActiveFilter, {borderTopRightRadius: 25, borderBottomRightRadius: 25}]}>
                        <Text style={activeFilter == 2 ? styles.activeFilterText : styles.inActiveFilterText}>deze maand</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection:"row", alignSelf: "center", paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity onPress = {() => {navigation.navigate("Overzicht")}} style={styles.nonActiveButton}>
                        <Text style={styles.activeFilterText}>peakflow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.activeButton}>
                        <Text style={styles.activeFilterText}>medicatie</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={{flexDirection: "row"}}>
                        <Feather name="sun" size={24} color={COLORS.darkBlue} />
                        <Text> salbutamol | budesonide </Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Feather name="moon" size={24} color={COLORS.darkBlue} />
                        <Text> vilanterol </Text>
                    </View>
                </View>
                
                <Text style={styles.subTitle}>Ochtend</Text> 
                <View style={styles.addMedication}>
                    <Text style={{color: COLORS.darkBlue, alignContent: "center"}}> Ochtend medicatie </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate("MedicatieLogger")}} style={[styles.actionButton, GlobalStyles.shadowed]}>
                        <Feather name="plus" size={26} color="white"/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Middag</Text> 
                <View style={styles.addMedication}>
                    <Text style={{color: COLORS.darkBlue, alignContent: "center"}}> Middag medicatie </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate("MedicatieLogger")}} style={[styles.actionButton, GlobalStyles.shadowed]}>
                        <Feather name="plus" size={26} color="white"/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Avond</Text> 
                <View style={styles.addMedication}>
                    <Text style={{color: COLORS.darkBlue, alignContent: "center"}}> Avond medicatie </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate("MedicatieLogger")}} style={[styles.actionButton, GlobalStyles.shadowed]}>
                        <Feather name="plus" size={26} color="white"/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    addMedication: {
        borderColor: COLORS.darkBlue,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: COLORS.white,
        marginVertical: 15,
        alignItems: 'center',
        padding: 15,
    },
    MedicationCard: {
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginVertical: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.darkBlue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    nonActiveButton: {
        padding: 5,
        marginRight: 20,
        width: 120,
        backgroundColor: COLORS.lightBlue,
        alignItems: "center",
        borderRadius: 5,
    },
    activeButton: {
        padding: 5,
        width: 120,
        backgroundColor: COLORS.darkBlue,
        alignItems: "center",
        borderRadius: 5,
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
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkBlue,
        marginTop: 15,
    },
});

export default MedicationOverview;