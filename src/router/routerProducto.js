const { check } = require('express-validator')
const { Router } = require('express')
const { esAdminRole } = require('../middlewares/validar-rol')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const {
    CrearProductos,
    ObtenerProductos,
    ActualizarProductos,
    eliminarProductos,
    ObtenerProductosPorId
} = require('../controllers/productos-controllers')
const { existeProductoPorId } = require('../helpers/db-validator')
const router = Router()

router.get('/', validarJWT,ObtenerProductos)
router.get('/:id', validarJWT,ObtenerProductosPorId)
router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('precio', 'el precio es obligatorio').not().isEmpty(),
    check('stock', ' el stock es obligatorio').not().isEmpty(),
    validarCampos
], CrearProductos)
router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'el id existe').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('precio', 'el precio es obligatorio').not().isEmpty(),
    check('stock', 'el stock es obligatorio').not().isEmpty(),
    validarCampos
], ActualizarProductos)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'el id existe').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], eliminarProductos)


module.exports = router