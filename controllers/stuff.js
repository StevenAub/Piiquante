const Sauce = require("../models/sauce");
const fs = require("fs");

function getAllSauce(req, res) {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((err) => res.status(400).json({ err: err }));
}

function getOneSauce(req, res, next) {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((err) => res.status(404).json({ err }));
}

function CreateSauce(req, res, next) {
  const sauceObject = JSON.parse(req.body.sauce);

  delete sauceObject._id;
  console.log(sauceObject);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce ajoutée avec succes!" + sauce });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
}

function modifySauce(req, res, next) {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.auth.userId !== sauce.userId) {
        res.status(403).json({ message: "Requete non autorisée!" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObject = req.file
            ? {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`
              }
            : {
                ...req.body
              };
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "La sauce a été modifiée!" })
            )
            .catch((err) => res.status(404).json({ err }));
        });
      }
    })
    .catch((err) => res.status(404).json({ message: "Sauce non trouvée!" }));
}

function deleteSauce(req, res, next) {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée!" });
      } else if (sauce.userId == req.auth.userId) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ message: "Sauce non trouvée!" }));
}

module.exports = {
  getAllSauce,
  CreateSauce,
  getOneSauce,
  deleteSauce,
  modifySauce
};
