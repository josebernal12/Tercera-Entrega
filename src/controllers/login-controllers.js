const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/modelUsuario')

const { generarJWT } = require('../helpers/generarJWT')


const login = async (req, res) => {

    const { correo, password } = req.body
    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }
        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        // generar el jwt
        const token = await generarJWT(usuario.id)

        // localStorage.setItem('token', token)

        res.redirect('/api/auth/home')


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    login
}
