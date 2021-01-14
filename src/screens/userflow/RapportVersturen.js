import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import email from 'react-native-email'

export default class RapportVersturenScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title="Send Mail" onPress={this.handleEmail} />
            </View>
        )
    }

    handleEmail = () => {
        const to = ['info@basaltrevalidatie.nl'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: [], // string or array of email addresses
            bcc: [], // string or array of email addresses
            subject: 'Rapportage Peakflow',
            body: 'Some body right here',
        }).catch(console.error)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})