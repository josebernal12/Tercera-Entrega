const axios = require('./axios')

const getProducts = async () => {
    try {
        const response = await axios.get(
            `/api/productos`
        )
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
const getProduct = async (productId) => {
    try {
        const response = await axios.get(
            `/api/productos/${productId}`
        )
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
exports.createProduct = async () => {
    try {
        const response = await axios.post(
            `/api/productos/`, {
            nombre: "sal",
            precio: 500,
            stock: 100
        })
        console.log(`created product ${response.data}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const updateProduct = async (productId) => {
    try {
        const response = await axios.put(
            `/api/productos/${productId}`, {
            nombre: "pepino",
            precio: 500,
            stock: 100
        })
        console.log(`update product ${JSON.stringify(response.data)}`)
    } catch (error) {
        console.log(error)
    }
}
const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(
            `/api/productos/${productId}`)
        console.log(`delete product ${JSON.stringify(response.data)}`)
    } catch (error) {
        console.log(error)
    }
}


// getProducts()
// getProduct('634312cce411337021a82530')
// createProduct()
// updateProduct('634324791209d41c56a00398')
// deleteProduct('6343132d9123cccc949ab1c9')