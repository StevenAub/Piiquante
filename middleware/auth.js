const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodeToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({
        message: "Utilisateur invalide!"
      });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};
