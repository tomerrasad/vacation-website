const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { execute } = require("../connection/dal");

router.post("/register", async (req, res) => {
  const { username, password, fname, lname } = req.body;
  if (!username || !password || !fname || !lname) {
    return res.status(400).send({some:"missing some info"});
  }
  try {
    const result = await execute(
      `SELECT * FROM users WHERE username='${username}'`
    );
    if (result.length > 0) {
      return res.status(400).send({some:"username is taken"});
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  const hashedpass = await bcrypt.hash(password, 10);
  try {
    await execute(
      `INSERT INTO users(isadmin,fname,lname,username,password) VALUES(false,'${fname}','${lname}','${username}','${hashedpass}')`
    );
    return res.status(200).send({some:'registion accepted'})

   
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await execute(
      `SELECT * FROM users WHERE username='${username}'`
    );
    if (user.length === 0) {
      return res.status(400).send({some:"wrong username"});
    }
    if (!(await bcrypt.compare(password, user[0].password))) {
      return res.status(400).send({some:"wrong password"});
    }
    const token = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
        fname: user[0].fname,
        lname: user[0].lname,
        isadmin: user[0].isadmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    return res.status(200).send({token });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
