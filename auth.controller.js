
const User = require("./user.model");

const secret = process.env.secret;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),

  });

  user.save((err,user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      message:
      "User was registered successfully!",
    });

  });
};  



exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }


      var token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });


      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
    
      });
    });
};


