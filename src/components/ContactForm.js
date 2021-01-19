import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import email from 'react-native-email'
import AppButton from './AppButton';

let name = 'Uw naam';

const handleEmail = () => {
    const to = ['info@basaltrevalidatie.nl'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [], // string or array of email addresses
        bcc: [], // string or array of email addresses
        subject: 'Rapportage Peakflow',
        body: 'Beste behandelende arts,' + '\n' + '\n' + 'Bijgevoegd vind u het overzicht van de gemeten peakflow.'
        + '\n' + '\n' + 'Met vriendelijke groet,' + '\n' + `${name}`

        + '\n' + '\n' + '\n' +
        'Vergeet niet om een screenshot van de peakflow grafieken toe te voegen' + '\n'
        +
        'https://www.pcmag.com/news/how-to-take-a-screenshot-on-any-device'
        ,

    }).catch(console.error)
}

const showAlert = () =>
    Alert.alert(
      "Rapport verzenden",
      "Je staat op het punt om een e-mail te sturen naar Basalt revalidatiecentrum. Zorg ervoor dat je screenshots hebt van jouw peakflow gegevens.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleEmail() }
      ],
      { cancelable: false }
    );

const ContactForm = (props) => {
    name = `${props.naam}`;
    return (
        <View>
            <AppButton
                text="Rapportage Versturen"
                onPress={showAlert}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ContactForm;
