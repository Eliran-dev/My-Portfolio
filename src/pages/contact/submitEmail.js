import firebase from "firebase";

import { firebaseConfig } from "../../Firebase"; 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const sendEmail = firebase.functions().httpsCallable('emailSender');


const submitEmail = async (email,subject, text) => {
sendEmail({email: email, subject: subject, text: text});
};

export default submitEmail;