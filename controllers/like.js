const Sauce = require("../models/sauce");

function likeSauce(req, res) {
  const liked = req.body.like;
  const userLiked = req.body.userId;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce.usersLiked.includes(userLiked) && liked === 1) {
        Sauce.updateOne(
          {
            _id: req.params.id
          },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: userLiked }
          }
        )
          .then(() => {
            res.status(201).json({ message: "Sauce like + 1" });
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      }
      if (sauce.usersLiked.includes(userLiked) && liked === 0) {
        Sauce.updateOne(
          {
            _id: req.params.id
          },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: userLiked }
          }
        )
          .then(() => {
            res.status(201).json({ message: "Sauce like 0" });
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      }

      if (!sauce.usersDisliked.includes(userLiked) && liked === -1) {
        Sauce.updateOne(
          {
            _id: req.params.id
          },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: userLiked }
          }
        )
          .then(() => {
            res.status(201).json({ message: "Sauce dislike +1" });
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      }
      if (sauce.usersDisliked.includes(userLiked) && liked === 0) {
        Sauce.updateOne(
          {
            _id: req.params.id
          },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: userLiked }
          }
        )
          .then(() => {
            res.status(201).json({ message: "Sauce dislike 0" });
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
}

module.exports = { likeSauce };
