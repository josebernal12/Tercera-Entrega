const Productos = require('../models/modelProducto')

const ObtenerProductos = async (req, res) => {

    const [total, producto] = await Promise.all([
        Productos.countDocuments({ estado: true }),
        Productos.find({ estado: true })
            .populate('usuario', 'nombre')


    ])

    res.json({
        total,
        producto
    })


}

const ObtenerProductosPorId = async (req, res) => {

    const { id } = req.params

    const producto = await Productos.findById(id)
        .populate('usuario', 'nombre')


    res.json({
        producto
    })
}

const CrearProductos = async (req, res) => {
    const { estado, usuario, ...body } = req.body

    const producto = await Productos.findOne({ nombre: body.nombre })

    if (producto) {
        return res.status(401).json({
            msg: `el producto ${producto.nombre} ya existe`
        })

    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const productodb = new Productos(data)
    await productodb.save({ timestamps: { createdAt: true, updatedAt: false } })

    res.json({
        productodb
    })
}



const ActualizarProductos = async (req, res) => {
    const { id } = req.params
    const { ...resto } = req.body

    const ProductosActualizado = await Productos.findByIdAndUpdate(id, resto, { new: true })

    res.json({
        ProductosActualizado
    })

}

const eliminarProductos = async (req, res) => {

    const { id } = req.params

    const ProductoEliminado = await Productos.findByIdAndDelete(id)

    res.json({
        ProductoEliminado
    })

}

module.exports = {
    ObtenerProductos,
    CrearProductos,
    ActualizarProductos,
    eliminarProductos,
    ObtenerProductosPorId

}