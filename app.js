const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "Invalid Email" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "Invalid Password" });
      return;
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).json({ message: 'Email or Password is wrong' })
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Email or Password is wrong' })
      return;
    }
    res.status(200).json({
      access_token: jwt.sign({
        id: user.id
      })
    });
  } catch (err) {
    res.status(500).json({ message: "ISE" });
  }
});

app.listen(port, () => {
  console.log("I love u 3000");
});


/*
1. pindah ke branch dimana semua code nya bakal digabung
    dalam hal ini di development
2. ketik `git merge <target-branch>` // feature-login

*/