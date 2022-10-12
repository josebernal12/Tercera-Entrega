const supertest = require('supertest')
const { expect } = require('chai')

let request;

describe('test sobre api', () => {
    before(() => {
        request = supertest('http://localhost:8080')
    })

    describe('-POST producto', () => {
        it('deberia devolver status 200', async () => {
            const response = await request.post('/api/productos').send({ nombre: 'sandia', precio: 50, stock: 100 })
            expect(response.status).to.eql(200)
        })
    })
    describe('-PUT producto', () => {
        it('deberia devolver status 200', async () => {
            
            const response = await request.put(`/api/productos/${'63433258f7d0fa7aa807b69e'}`).send({ nombre: 'sandia', precio: 50, stock: 100 })
            expect(response.status).to.eql(200)
        })
    })
    describe('-DELETE producto', () => {
        it('deberia devolver status 200', async () => {
            const response = await request.delete(`/api/productos/${'634332850014fc5a0cf3dcfd'}`)
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