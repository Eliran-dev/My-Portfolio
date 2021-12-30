import firebase from "firebase";
import { firebaseConfig } from "../../../Firebase";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const sendEmail = firebase.functions().httpsCallable('kindleSender');

const mailToKindle = async (kindleEmail, subject, link, label) => {
    sendEmail({ email: kindleEmail, subject: subject, link: link, label: label });
}

export default mailToKindle;