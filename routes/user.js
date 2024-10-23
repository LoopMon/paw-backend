const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/signin", async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const findUser = await User.findOne(user);

    console.log("back-end:", findUser);

    res.status(200).json({
      myMsgSucess: "Usuário recuperado com sucesso",
      objUserRecuperado: findUser,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Serve-Side: um erro aconteceu ao buscar o usuário",
      myError: err,
    });
  }
});

router.post("/signup", async (req, res, next) => {
  const userObject = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const userSave = await userObject.save();
    console.log("Back-end:", userSave); // apagar dps

    res.status(201).json({
      myMsgSucess: "Usuário salvo com sucesso",
      objUserSave: userSave,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Serve-Side: um erro aconteceu ao salvar o usuário",
      myError: err,
    });
  }
});

module.exports = router;
