const express = require('express')
const router = express.Router()

const Message = require('../models/messages')

router.get('/', async (req, res, next) => {
    try {
        const messageFindAll = await Message.find({})

        res.status(200).json({
            myMsgSucess: 'Mesangens recuperadas com sucesso',
            objMessageSRecuperadoS: messageFindAll
        })
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar as Mensagens",
            myError: err
        })
    }
})

router.post('/', async (req, res, next) => {
    const messageObject = new Message({
        content: req.body.content
    })

    try {
        const messageSave = await messageObject.save()
        console.log(messageSave)

        res.status(201).json({
            myMsgSucess: "Mensagem Salva com sucesso",
            objMessageSave: messageSave
        })
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: um erro aconteceu ao salvar a mensagem",
            myError: err
        })
    }
})

module.exports = router