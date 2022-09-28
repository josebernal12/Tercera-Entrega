const { check } = require('express-validator')
const { Router } = require('express')
const path = require ('path')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const {
    crearUsuario,
    obtenerUsuarios,
    ObtenerUsuariosPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/user-controllers')
const { emailValido, existeUsuarioPorId } = require('../helpers/db-validator')
const { esAdminRole } = require('../middlewares/validar-rol')

const router = Router()

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/register.html'))
    res.render('register')

})
router.get('/:id', [
    check('id', 'no es un id de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], ObtenerUsuariosPorId)
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('correo', 'el correo es obligatorio').not().isEmpty(),
    check('correo', 'el correo es no es de tipo email').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('correo').custom(emailValido),
    
    validarCampos
], crearUsuario)
router.put('/:id', [
    validarJWT,
    check('id', 'no es un id de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('correo', 'el correo es obligatorio').not().isEmpty(),
    check('correo', 'el correo es no es de tipo email').isEmail(),
    check('correo').custom(emailValido),
    validarCampos
], actualizarUsuario)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un id de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], eliminarUsuario)


module.exports = router