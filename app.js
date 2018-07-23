const express = require('express');
const bodyParser = require('body-parser');
const sendgridMail = require('@sendgrid/mail');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {

});

app.listen(1800, function () {
  console.log('App listening on port 1800!')
});


const shootMeAnEmail = (contact) => {
    const { contactName, contactSubject, contactMessage } = contact;
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'legalmody@gmail.com',
        from: 'noreply@kali-digital.com',
        subject: `You've been contacted by ${contactName}`,
        text: `${contactSubject} \n${contactMessage} \nEmail: ${contactEmail} \nPhone: ${contactPhone}`,
        html: ``,
    };
    sendgridMail.send(msg).then(() => {
        res.status(201).send({
            message: 'Email sent successfully'
        });
    }).catch(err => console.log(err))
}
