const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function createUser(req, res) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(() => {
          res.status(201).send({ message: "Utilisateur Crée !" });
        })
        .catch((err) =>
          res.status(400).json({
            message: "Adresse email deja utilisé! " + " erreur :" + err
          })
        );
    })
    .catch((error) => res.status(500).json({ error }));
}
async function logUser(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "Utilisateur non trouvé!" });
    }
    bcrypt.compare(req.body.password, user.password, (err, valid) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!valid) {
        return res.status(401).json({ message: "Mauvais mot de passe!" });
      }

      return res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          {
            userId: user._id
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "24h" }
        )
      });
    });
  });
}

module.exports = { createUser, logUser };
