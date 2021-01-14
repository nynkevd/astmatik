import emailjs from "emailjs-com";
import React from 'react';
import {
    View,
    TextInput,
    Text,
  } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('gmail', 'youtube_template', e.target, 'user_JABO21I8Gm6sxByJH17Nu')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <View>
            <View className="container">
            <View>
                    <View className="row pt-5 mx-auto">
                        <View className="col-8 form-group mx-auto">
                            <TextInput type="text" className="form-control" placeholder="Name" name="name"/>
                        </View>
                        <View className="col-8 form-group pt-2 mx-auto">
                            <TextInput type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </View>
                        <View className="col-8 form-group pt-2 mx-auto">
                            <TextInput type="text" className="form-control" placeholder="Subject" name="subject" />
                        </View>
                        <View className="col-8 form-group pt-2 mx-auto">
                            <TextInput type="text" className="form-control" placeholder="Message" name="message"/>
                        </View>
                        <TouchableOpacity onPress={sendEmail}>
                            <Text>verstuur</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}