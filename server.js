const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'joseph.mtakai@outlook.com',
        pass: '12345'
    }
});

let generatedCode = '';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        const mailOptions = {
            from: 'joseph.mtakai@outlook.com',
            to: 'joseph.mtakai@outlook.com',
            subject: 'Your 2FA Code',
            text: `Your 2FA code is ${generatedCode}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email');
            }
            res.status(200).send('2FA code sent');
        });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.post('/verify', (req, res) => {
    const { code } = req.body;
    if (code === generatedCode) {
        res.status(200).send('Authentication successful');
    } else {
        res.status(401).send('Invalid 2FA code');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
