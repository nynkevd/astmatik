import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import email from 'react-native-email'
import AppButton from './AppButton';

let name = 'Uw naam';

const handleEmail = () => {
    const to = ['info@basaltrevalidatie.nl'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [], // string or array of email addresses
        bcc: [], // string or array of email addresses
        subject: 'Rapportage Peakflow en Medicatie',
        body: 'Beste behandelende arts,' + '\n' + '\n' + 'Bijgevoegd vind u het overzicht van de gemeten peakflow en medicatie van de afgelopen week.'
        + '\n' + '\n' + 'Met vriendelijke groet,' + '\n' + `${name}` 
        
        + '\n' + '\n' + '\n' + 
        'Vergeet niet om een screenshot van de peakflow grafieken toe te voegen' + '\n'
        +
        'https://www.pcmag.com/news/how-to-take-a-screenshot-on-any-device'
        ,

    }).catch(console.error)
}

const ContactForm = (props) => {
    name = `${props.naam}`;
    return (
        <View>
            <AppButton 
                text="Rapportage Versturen"
                onPress={handleEmail}
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