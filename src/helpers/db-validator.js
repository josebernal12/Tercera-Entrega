const Usuario = require('../models/modelUsuario')
const Producto = require('../models/modelProducto')
const Carrito = require('../models/modelCarritos')

const emailValido = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`el correo ${correo} ya existe`)
    }

}
const existeUsuarioPorId = async (id) => {

    const existeID = await Usuario.findById(id)
    if (!existeID) {
        throw new Error(`el usuario ${id} no existe`)
    }

}

const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id)

    if(!existeProducto){
        throw new Error(`el producto ${id} no existe`)
    }
}
const existeCarritoPorId = async (id) => {

    const existeCarrito = await Carrito.findById(id)

    if(!existeCarrito){
        throw new Error(`el carrito ${id} no existe`)
    }
}


module.exports = {
    emailValido,
    existeUsuarioPorId,
    existeProductoPorId,
    existeCarritoPorId
}