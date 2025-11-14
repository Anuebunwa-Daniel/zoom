const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dataB = require('../model/dataB.js'); 

const router = express.Router();


// 🧾 GET form page
router.get('/', (req, res) => {
  res.render('admin/admin_page', { dbLink: null});
});

router.get('/admin_page', (req, res) => {
  res.render('admin/admin_page', { dbLink: null});
});


// POST form (create invite)
router.post('/admin_page', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  try {
    const token = crypto.randomBytes(16).toString('hex');
    const link  = `${req.protocol}://${req.get('host')}/invitation/${token}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    const newInvite = new dataB({ name, email, token, link });
    await newInvite.save();  
    res.render('admin/admin_page', { dbLink:newInvite, name, email });
  } catch (err) {
    console.error(err);
    res.render('admin/admin_page', { link: null, success: 'An error occurred.' });
  }
});


module.exports = router;