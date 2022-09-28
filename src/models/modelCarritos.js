const { Schema, model } = require('mongoose')

const CarritoSchema = Schema({

    correo: {
        type: String,
        required: [true, 'el email es requerido']
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'producto',
       
    },
    estado: {
        type: Boolean,
        default:true
    }




})

module.exports = model('Carrito', CarritoSchema)