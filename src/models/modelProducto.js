const { Schema, model, default: mongoose } = require('mongoose')

const ProductosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'el precio es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'el stock es obligatorio']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
  
    carrito :{
      type: Schema.Types.ObjectId,
      ref: 'Carrito'
    },
  

} ,{ timestamps: true })

   


module.exports = model('producto', ProductosSchema)