const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
    PostCarrito,
    DeleteCarrito,
    ObtenerCarrito,
    PostIdCarrito,
    DeleteIdCarrito
} = require('../controllers/carrito-controller')
const { existeCarritoPorId } = require('../helpers/db-validator')
const router = Router()


// router.post('/', [
//     check('correo', 'el correo es obligatorio'),
//     validarCampos
// ], PostCarrito)
router.delete('/:id', [
    check('id', 'no es un id de mongo').isMongoId(),
    check('id').custom(existeCarritoPorId),
    validarCampos
], DeleteCarrito)
router.get('/', [
    
],ObtenerCarrito)
router.post('/', PostIdCarrito)
router.delete('/:id/productos/:id_prod', DeleteIdCarrito)



module.exports = router