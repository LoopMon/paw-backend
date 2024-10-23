const express = require("express");
const router = express.Router();

const Message = require("../models/messages");

router.get("/", async (req, res, next) => {
  try {
    const messageFindAll = await Message.find({});

    res.status(200).json({
      myMsgSucess: "Mesangens recuperadas com sucesso",
      objMessageSRecuperadoS: messageFindAll,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar as Mensagens",
      myError: err,
    });
  }
});

router.post("/", async (req, res, next) => {
  const messageObject = new Message({
    content: req.body.content,
  });

  try {
    const messageSave = await messageObject.save();
    console.log("Back-end:", messageSave); // apagar dps

    res.status(201).json({
      myMsgSucess: "Mensagem Salva com sucesso",
      objMessageSave: messageSave,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Serve-Side: um erro aconteceu ao salvar a mensagem",
      myError: err,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const messageId = req.params.id;
    // Buscar e deletar a message pelo ID
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).send({ message: "Mensagem não encontrado" });
    }

    res
      .status(200)
      .send({ message: `Mensagem ${messageId} deletada com sucesso` });
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar mensagem", error });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const messageContent = req.body;

    console.log(messageId, messageContent);
    // Buscar e atualizar a message pelo ID
    const updatedMessage = await Message.findByIdAndUpdate(
      { _id: messageId },
      { $set: { content: messageContent.content } }
    );

    if (!updatedMessage) {
      return res.status(404).send({ message: "Mensagem não encontrado" });
    }

    res
      .status(200)
      .send({ message: `Mensagem ${messageId} atualizada com sucesso` });
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar mensagem", error });
  }
});

module.exports = router;
