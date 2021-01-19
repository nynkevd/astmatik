import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MainLayout from '../../components/MainLayout';
import ActionCard from '../../components/ActionCard';
import ScreenTitle from '../../components/ScreenTitle';
import {COLORS} from '../../constants/Colors';
import InputField from "../../components/InputField";
import GlobalStyles from "../../constants/GlobalStyles";
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

// TODO: save info to asyncstorage en retrieve in useEffect

const ActionPlanFeelingGood = ({route}) => {
    const navigation = useNavigation();
    const [medicationSelected, setMedicationSelection] = useState(false);
    const [techniqueSelected, setTechniqueSelection] = useState(false);
    const [chamberSelected, setChamberSelection] = useState(false);
    const [airwayProtector, setAirwayProtector] = useState("");
    const [airwayRemover, setAirwayRemover] = useState("");
    const [noseSpray, setNoseSpray] = useState("");

    const [actionplanData, setActionplanData] = useState();

    const [update, forceUpdate] = useState(false);
    const [lastUpdate, setLastUpdate] = useState('');
    const [hasUpdated, setHasUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!!route.params && route.params.update == true && lastUpdate !== route.params.timestamp) {
        setLastUpdate(route.params.timestamp);
        setHasUpdated(false);
    }

    if (!!route.params && route.params.update == true && hasUpdated == false) {
        forceUpdate(!update);
        setHasUpdated(true);
    }

    const handleConfirm = async () => {
      let body = {
        airwayProtector,
        airwayRemover,
        noseSpray,
        medicationSelected,
        techniqueSelected,
        chamberSelected,
      };
      await AsyncStorage.setItem('actionPlanGood', JSON.stringify(body));
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    useEffect( () => {
      (async () =>{
        let data = await AsyncStorage.getItem('actionPlanGood');
        if(data !== null){
          data = JSON.parse(data);
          setAirwayProtector(data.airwayProtector);
          setAirwayRemover(data.airwayRemover);
          setNoseSpray(data.noseSpray);
          setMedicationSelection(data.medicationSelected);
          setTechniqueSelection(data.techniqueSelected);
          setChamberSelection(data.chamberSelected);
        }
      })();
    }, [update]);

    return (
        <View style={styles.container}>
            <MainLayout/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ScreenTitle
                    title="Ik voel me goed"
                    subTitle="Mijn astma is onder controle, ik heb geen klachten"
                />
                <ActionCard
                    color={COLORS.green}
                    planText='Met mijn dagelijkse medicatie heb ik geen luchtwegklachten.'/>
                <Text style={GlobalStyles.headline}>Medicatie</Text>

                <InputField
                    label={"Luchtwegbeschermer"}
                    value={airwayProtector}
                    onChange={setAirwayProtector}
                />

                <InputField
                    label={"Luchtwegverwijder"}
                    value={airwayRemover}
                    onChange={setAirwayRemover}
                />

                <InputField
                    label={"Neusspray"}
                    value={noseSpray}
                    onChange={setNoseSpray}
                />

                <Text style={GlobalStyles.headline}>Check</Text>
                <View style={styles.checkContainer}>
                    <CheckBox
                        tintColors={{true: COLORS.darkBlue}}
                        value={medicationSelected}
                        onValueChange={setMedicationSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkLabel}>Ik neem elke dag mijn medicatie</Text>
                </View>
                <View style={styles.checkContainer}>
                    <CheckBox
                        tintColors={{true: COLORS.darkBlue}}
                        value={techniqueSelected}
                        onValueChange={setTechniqueSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkLabel}>Ik gebruik de juiste techniek</Text>
                </View>
                <View style={styles.checkContainer}>
                    <CheckBox
                        tintColors={{true: COLORS.darkBlue}}
                        value={chamberSelected}
                        onValueChange={setChamberSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkLabel}>Ik gebruik mijn voorzetkamer</Text>
                </View>

                <View style={{marginVertical: 10}}></View>
                <AppButton
                  text="opslaan"
                  onPress={() => handleConfirm()}
                />
                {isLoading ? <ActivityIndicator color={COLORS.darkBlue}/> : null}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        paddingHorizontal: 18,
        paddingBottom: 70,
        minHeight: '100%'
    },
    titleContainer: {
        color: COLORS.darkBlue,
        marginVertical: 10,
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        borderColor: COLORS.darkBlue
    },
    checkLabel: {
        color: COLORS.darkBlue
    }
});

export default ActionPlanFeelingGood;
