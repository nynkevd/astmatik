import React, {useState, useEffect} from 'react';
import { AsyncStorage, Alert, CheckBox, TouchableHighlight, TouchableOpacity, Text, View, StyleSheet, ScrollView, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from '../constants/Colors';
import { OPTIONS } from '../constants/Options';
import GlobalStyles from '../constants/GlobalStyles';
import AppButton from '../components/AppButton';

const Dropdown = (props) =>{
   const [modalVisible, setModalVisible] = useState(props.modalVisible);
   const [state, setState] = useState(props.list);
   const [checked, setChecked] = useState(false);
   let myTriggers = [];
   let myMedications = [];

   const handeListValues = async () =>{
     try{
       if(props.list === OPTIONS.triggerOptions){
         for(let i = 0; i < state.length; i++){
           if(state[i]['checked'] === true){
             myTriggers.push({
               id: state[i]["db_id"],
               name: state[i]["key"]
           })
          }
        }
         await AsyncStorage.setItem('userTriggers', JSON.stringify(myTriggers));
       } else if(props.list === OPTIONS.medicationOptions){
         for(let i = 0; i < state.length; i++){
           if(state[i]['checked'] === true){
             myMedications.push({
               id: state[i]["db_id"],
               name: state[i]["key"]
           })
           }
         }
         await AsyncStorage.setItem('userMedication', JSON.stringify(myMedications));
       }
     } catch(error){
       console.log(error);
     } finally {
        setModalVisible(false);
     }
   }

   const onChecked = (id) =>{
     let data = state;
     data[id]['checked'] = !data[id]['checked'];
     setState(data);
     setChecked(!checked);
   }

  return(
    <View>
    {props.listOverview
      ?<ScrollView contentContainerStyle={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.title}>{props.title}</Text>
            {
              state.map((item, index) =>
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',}}
                key={index}>
                  <CheckBox
                    tintColors={{true: COLORS.darkBlue}}
                    value={item.checked}
                    onValueChange={() => {onChecked(item.id)}}  />
                  <Text>{item.key}</Text>
                </View>
              )
            }
            <AppButton
              text="klaar"
              onPress={() => {
                handeListValues();

              }} />
          </View>
        </View>
      </Modal>
    </ScrollView>
      :<View style={styles.picker}>
      <Picker
        mode="dropdown"
        selectedValue={props.value}
        onValueChange={value => props.changeValue(value)}
        >
          <Picker.Item label="--" value="0" />
            {
              props.list.map((item, index) =>
                <Picker.Item label={item} value={item} key={index} />
              )
            }
      </Picker>
    </View>
  }
  </View>
  )
}

const styles = StyleSheet.create({
  picker:{
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    elevation: 3,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  overview: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 15,
    width: '80%',
    height: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: 16,
    alignSelf: 'flex-start',
    paddingLeft: 6,
    textAlign: 'left',
    marginVertical: 10,
    fontWeight: 'bold'
  }
});

export default Dropdown;
