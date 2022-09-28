require('dotenv').config()
const cors = require('cors')
const path = require('path')
const express = require('express')
const { dbConnection } = require('../database/db')
const app = express()

class Server {
    constructor() {
        this.app = app
        this.PORT = process.env.PORT
        this.path = {
            carrito: '/api/carritos',
            productos: '/api/productos',
            login: '/api/auth',
            usuarios: '/api/usuarios',

        }

        this.CrearConexionBD()
        this.middlewares()
        this.router()

    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set('view engine', 'hbs');
        this.app.use(express.static(path.join(__dirname, '../public')))
        //  console.log(path.join(__dirname, '../public'))


    }

    async CrearConexionBD() {
        await dbConnection()
    }

    router() {
        this.app.use(this.path.carrito, require('../router/routerCarritos'))
        this.app.use(this.path.productos, require('../router/routerProducto'))
        this.app.use(this.path.login, require('../router/routerLogin'))
        this.app.use(this.path.usuarios, require('../router/routerUser'))
        this.app.use('*', (req, res) => {
            // res.sendFile(path.join(__dirname, '../public/404.html'))
            res.render('404')
        })
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`escuchando el puerto ${this.PORT}`)
        })
    }

}


module.exports = Server