const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.get('/register', (req, res) => {
  res.send('users');
})

router.post('/register', async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    
    // VALIDATION
    if (!(email && password && passwordCheck)) {
      return res.status(400).json({msg: "Required fields missing."})
    }
    if (passwordCheck !== password) {
      return res.status(400).json({ msg: "Passwords do not match."})
    }
    if (password.length < 5) {
      return res.status(400).json({ msg: "Passwords must be at least 5 characters long."})
    }
    const existingUser = await User.findOne({email: email})
    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exists."})
    }

    if (!displayName) {
      displayName = email;
    }

    // PASSED
    const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt());
    console.log(hashedPass);
    const newUser = await User({
      email,
      password: hashedPass,
      displayName,
    }).save()

    res.json(newUser);

  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // VALIDATE
    if (!(email && password)) {
      return res.status(400).json({ msg: "Missing fields."})
    }

    const user = await User.findOne({email: email});
    if(!user) {
      return res.status(400).json({ msg: "Account does not exist"})
    }
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return res.status(400).json({ msg: "Invalid credentials."})
    }
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      }
    })
    
  } catch {

  }
})

module.exports = router;