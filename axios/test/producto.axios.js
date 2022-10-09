const supertest = require('supertest')
const { expect } = require('chai')
const producto = require('../src/routes/Producto')
const producto2 = require('../src/controllers/productoControllers')
const server = require('../src/models/server')
let request;

describe('test sobre api', () => {
    before(() => {
        request = supertest('http://localhost:8080')
    })

    describe('-POST producto', () => {
        it('deberia devolver status 200', async () => {
            const userCreate = producto()
            const response = await request.post('/api/productos').send(userCreate)
            expect(response.status).to.eql(200)
        })
    })
    describe('-Get producto', () => {
        it('deberia devolver status 200', async () => {
            const response = await request
                .get('/api/productos')
                .set({ productoid: '634312cce411337021a82530' })

            expect(response.status).to.eql(200)
            expect(response.body).to.keys({ product: [{ nombre: "nombre", precio: 'precio', stock: 'stock', __v: '__v', _id: '_id' }] })
        })
    })
})