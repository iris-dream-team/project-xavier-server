const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models");

app.post("/register", async (req, res) => {
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

    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "ISE" });
  }
});

app.listen(port, () => {
  console.log("I love u 3000");
});
