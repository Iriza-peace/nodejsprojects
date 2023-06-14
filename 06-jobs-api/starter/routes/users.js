const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = new User(req.body);
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
