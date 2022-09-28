const bcryptjs = require('bcryptjs')
const Usuario = require('../models/modelUsuario')


const obtenerUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({ estado: true })

    res.json({
        usuarios
    })
}


const ObtenerUsuariosPorId = async (req, res) => {

    const { id } = req.params

    const usuario = await Usuario.findById(id)

    res.json({
        usuario
    })
}

const crearUsuario = async (req, res) => {

    const { password, estado, nombre, correo, telefono } = req.body

    const usuario = new Usuario({ password, estado, nombre, correo, telefono })


    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

     res.redirect('/api/auth/login')
}

const actualizarUsuario = async (req, res) => {

    const { id } = req.params
    const { _id, password, google, ...resto } = req.body

    // validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)

    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto, { new: true })

    res.json(usuarioDB)
}

const eliminarUsuario = async (req, res) => {

    const { id } = req.params

    const UsuarioEliminado = await Usuario.findByIdAndDelete(id)

    res.json({
        UsuarioEliminado
    })

}


module.exports = {
    obtenerUsuarios,
    ObtenerUsuariosPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}