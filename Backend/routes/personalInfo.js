const express = require('express');
const router = express.Router();
const PersonalInfo = require('../models/PersonalInfo');

// Get Personal Info
router.get('/', async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne();
    res.status(200).json(personalInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Personal Info
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, gender, age, addressLine1, addressLine2, city, state, postalCode, country ,phone} = req.body;

    let personalInfo = await PersonalInfo.findOne();
    if (!personalInfo) {
      personalInfo = new PersonalInfo({
        firstName,
        lastName,
        email,
        gender,
        age,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        phone,
       
      });
    } else {
      personalInfo.firstName = firstName;
      personalInfo.lastName = lastName;
      personalInfo.email = email;
      personalInfo.gender = gender;
      personalInfo.age = age;
      personalInfo.addressLine1 = addressLine1;
      personalInfo.addressLine2 = addressLine2;
      personalInfo.city = city;
      personalInfo.state = state;
      personalInfo.postalCode = postalCode;
      personalInfo.country = country;
    }

    await personalInfo.save();
    res.status(200).json(personalInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;