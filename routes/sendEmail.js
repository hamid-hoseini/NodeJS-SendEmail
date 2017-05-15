/**
 * Created by hamidhoseini on 3/31/17.
 */
/* Sending email part*/
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req,res){
    //res.json({yo: "this is me...!"});
    res.send('this is me...!');
});

router.post('/', handleSendEmail); // handle the route at yourdomain.com/sayHello

function handleSendEmail(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'evoke.appt@gmail.com', // Your email id
            pass: 'EBS12345678' // Your password
        }
    });
    var text = 'Hello from \n\n' + req.body.user_name;
    var mailOptions = {
        from: 'evoke.appt@gmail.com', // sender address
        to: 'niloofarhz77@gmail.com', // list of receivers
        subject: 'Appointment Email Example', // Subject line
        text: text,
        html: '<!DOCTYPE html>'+
            '<html><head><title>Appointment</title>'+
            '</head><body><div>'+
        '<img src="http://evokebeautysalon1.herokuapp.com/main/img/logo.png" alt="" width="160">'+
        '<p>Thank you for your appointment.</p>'+
        '<p>Here is summery:</p>'+
        '<p>Name: James Falcon</p>'+
        '<p>Date: Feb 2, 2017</p>'+
        '<p>Package: Hair Cut </p>'+
        '<p>Arrival time: 4:30 PM</p>'+
        '</div></body></html>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
}

module.exports = router;