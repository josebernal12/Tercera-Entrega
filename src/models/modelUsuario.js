const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },
    telefono: {
        type: Number,
        required: [true, 'el telefono es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        // required: [true, 'el rol es requerido'],
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'

    },
  



})
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject()

    return usuario
}

module.exports = model('Usuario', UsuarioSchema)