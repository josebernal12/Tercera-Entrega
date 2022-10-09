const supertest = require('supertest')
const { expect } = require('chai')
const producto = require('../src/routes/Producto')
let request;

describe('test sobre api', () => {
    before(() => {
        request = supertest('http://localhost:8080')
    })

    // describe('-POST producto', () => {
    //     it('deberia devolver status 200', async () => {
    //         const userCreate = producto()
    //         const response = await request.post('/api/productos').send(userCreate)
    //         expect(response.status).to.eql(200)
    //     })
    // })
    describe('-Get carrito', () => {
        it('deberia devolver status 200', async () => {
            const response = await request
                .get('/api/carritos')
                .set({ carritoid: '63431c4b090d0a5d6114ab48' })

            expect(response.status).to.eql(200)
            expect(response.body).to.keys({cart:{carrito:[{_id:"_id",email:"email",pedido:[{producto:{_id:"_id",nombre:"nombre",precio:"precio",stock:"stock",__v:"__v"}}]}]}})
        })
    })
})