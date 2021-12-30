const functions = require("firebase-functions");
const admin = require("firebase-admin")
const nodemailer = require("nodemailer");
require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
//the package that will scrape the text from the webpage 
// const Xray = require('x-ray');
//the package that will hold the text while it transfers
const fs = require('fs');
//the package that will convert the text to pdf file 
const pdfDoc = require("pdfkit");
const doc = new pdfDoc();
// the package that will scrape the text from the webpage 
const Xray = require('x-ray');
const x = new Xray();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

const cors = require('cors')({ origin: "https://us-central1-my-portfolio-82da0.cloudfunctions.net" });
admin.initializeApp();

exports.emailSender = functions.https.onCall((data, context) => {
    console.log(data);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            pass: process.env.WORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
          }
    });
    const mailOptions = {
        from: process.env.EMAIL, //Adding sender's email
        to: data.email, //Getting recipient's email by query string
        subject: data.subject, //Email subject
        html: `<b>${data.text}!</b>` //Email content in HTML
    };

    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err.toString());
        }
        return console.log('Email sent successfully');
    });

});

exports.kindleSender = functions.https.onCall((data, context) => {
    console.log(data);

    x(data.link, '.mainPartContent', [
        {
            title: '#F_Title',
            subTitle: '#coteret_SubCoteretText',
            content: '.articleInner'
        }
    ])
    (function(err, results)
    {
    
        const fileName = `Ebooks/${data.label}.pdf`;
        const bucket = storage.bucket("my-portfolio-82da0.appspot.com")
        const file = bucket.file(fileName);
        const bucketFileStream = file.createWriteStream();
        doc.pipe(bucketFileStream);
        var title =  results[0].title;
        var titleStrings = title.split(" ");
        var article =  results[0].subTitle;
        var articleStrings = article.split(" ");
        var article2 =  results[0].content;
        var articleStrings2 = article2.split(" ");
        console.log("done stringing");
        doc.font('./VarelaRound-Regular.ttf')
        .fontSize(25)
        .text(titleStrings.join('_'), { align: 'right' });
        doc.font('./VarelaRound-Regular.ttf')
        .fontSize(22)
        .text(articleStrings.join('_'), { align: 'right' });
        doc.font('./VarelaRound-Regular.ttf')
        .fontSize(16)
        .text(articleStrings2.join('_'), { align: 'right' });
        console.log("doc about to end");
        doc.end();
        console.log("doc ended");    

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            pass: process.env.WORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: accessToken

        },
    });
    const mailOptions = {
        from: process.env.EMAIL, //Adding sender's email
        to: data.email, //Getting recipient's email by query string
        subject: data.subject, //Email subject
        attachments: [
            {   
                filename: data.label,
                contentType: 'application/pdf',
                content: file.createReadStream()
            }
        ]   //Email content in HTML
    };

    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err.toString());
        }
        return console.log('Email sent successfully');
    });

});
});
// attachments: [{
//     filename: 'new.pdf',
//     content: pdfDoc
// }]