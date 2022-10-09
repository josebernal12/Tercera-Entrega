const supertest = require('supertest')
const { expect } = require('chai')
const productoRouter = require('../src/routes/Producto')
const { crearProducto } = require('../src/controllers/productoControllers')
const productServices = require('../src/services/productoServices')
const productoAxios = require('../axios/producto.axios')

let request;
const product = {
    nombre: "maruchan",
    precio: 15,
    stock: 100
}
describe('test sobre api', () => {
    before(() => {
        request = supertest('http://localhost:8080')
    })

    describe('-POST producto', () => {
        it('deberia devolver status 200', async () => {
            const productCreate = await  productoAxios.createProduct()
            // console.log(productCreate)
            const response = await request.post('/api/productos').send(productCreate)
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