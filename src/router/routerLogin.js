const { Router } = require('express')
const { check } = require('express-validator')
const path = require('path')
const { login, googleSingIn } = require('../controllers/login-controllers')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/login', (req, res) => {

    res.render('login')
})
router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.get('/home', validarJWT, (req, res) => {
    res.render('home', {
        usuario: req.usuario.nombre
    })
})



module.exports = router