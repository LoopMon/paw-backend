var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/node-mongodb-mongoose-user', async (req, res, next) => {
    try {
        const userFind = await User.findOne({})

        res.render('node', {
            firstNameV: userFind.firstName,
            lastNameV: userFind.lastName,
            passwordV: userFind.password,
            emailV: userFind.email,
            messagesV: userFind.messages
        })
    } catch (err) {
        return res.send('Erro!!!')
    }
})

router.post('/node-mongodb-mongoose-user', async (req, res, next) => {
    var emailVar = req.body.emailBody
    var userObject = new User({
        firstName: 'Joao',
        lastName: 'Lucas',
        password: '1234',
        email: emailVar
    })

    await userObject.save()

    res.redirect('/node-mongodb-mongoose-user')
})


module.exports = router;

