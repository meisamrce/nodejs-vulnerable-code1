const express = require("express");
const app = express();
const _ = require("lodash");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const users = [
  {
    username: "admin",password: "admin",is_admin: true,
  },
  {
    username: "user",password: "user",is_admin: false,
  }
];
app.post("/register", (req, res) => {
  const obj = _.merge({}, req.body, { ipAddress: req.ip });
  users.push(obj);
  res.json({"result":"success create account!"});
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
      if(user.is_admin)
        res.json({"result":"hi admin!"});
      else
        res.json({"result":"hi user!"});
  } else {
    res.json({"result":"Login failed"});
  }
});

const port = 5000;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...!!!`));

