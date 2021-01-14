import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import email from 'react-native-email'
import AppButton from './AppButton';

const handleEmail = () => {
    const to = ['info@basaltrevalidatie.nl'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [], // string or array of email addresses
        bcc: [], // string or array of email addresses
        subject: 'Rapportage Peakflow',
        body: 'Some body right here',
    }).catch(console.error)
}
const ContactForm = (props) => {
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