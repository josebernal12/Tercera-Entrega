const Carrito = require('../models/modelCarritos')
const Productos = require('../models/modelProducto')

const PostCarrito = async (req, res) => {

    const { correo } = req.body

    const carrito = new Carrito({ correo })
    await carrito.save()

    res.json({
        carrito
    })

}
const DeleteCarrito = async (req, res) => {
    const { id } = req.params
    const carrito = await Carrito.findByIdAndDelete(id)

    res.json({
        carrito
    })

}
const ObtenerCarrito = async (req, res) => {

    const [total, producto] = await Promise.all([
        Carrito.countDocuments({ estado: true }),
        Carrito.find({ estado: true })
            .populate('producto', 'nombre')

    ])
    res.json({
        total,
        producto
    })

}
const PostIdCarrito = async (req, res) => {

    const { estado, ...body } = req.body

    const carrito = await Carrito.findOne({ correo: body.producto })

    if (carrito) {
        return res.status(401).json({
            msg: `el producto ${carrito.producto} ya existe`
        })
    }

    const data = {
        ...body,
    }

    const carritodb = new Carrito(data)
        .populate('producto', 'nombre')
    await carritodb.save()

    res.json({
        carritodb
    })

}
const DeleteIdCarrito = (req, res) => {

}

module.exports = {

    PostCarrito,
    DeleteCarrito,
    ObtenerCarrito,
    PostIdCarrito,
    DeleteIdCarrito
}