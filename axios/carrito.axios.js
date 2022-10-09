const axios = require('./axios')

const getCart = async () => {
    try {
        const response = await axios.get(
            `/api/carritos`
        )
        console.log(JSON.stringify(response.data))
    } catch (error) {
        console.log(error)
    }
}
const getCarts = async (cartId) => {
    try {
        const response = await axios.get(
            `/api/carritos/${cartId}`
        )
        console.log(JSON.stringify(response.data))
    } catch (error) {
        console.log(error)
    }
}
const createCart = async () => {
    try {
        const response = await axios.post(
            `/api/carritos/`, {
            email: "jesus_dioker@hotmail.com",
            pedido: [
                { producto: "634312cce411337021a82530", stock: 100 },
                { producto: "634324791209d41c56a00398", stock: 100 }
            ]
        })
        console.log(`created cart ${JSON.stringify(response.data)}`)
    } catch (error) {
        console.log(error)
    }
}
const updateCart = async (cartId) => {
    try {
        const response = await axios.put(
            `/api/carritos/${cartId}`, {
            email: "jesus_dioker@hotmail.com",
            pedido: [
                { producto: "634312cce411337021a82530", stock: 100 },
                { producto: "634324791209d41c56a00398", stock: 100 }
            ]
        })
        console.log(`update product ${JSON.stringify(response.data)}`)
    } catch (error) {
        console.log(error)
    }
}
const deleteCart = async (cartId) => {
    try {
        const response = await axios.delete(
            `/api/carritos/${cartId}`)
        console.log(`delete cart ${JSON.stringify(response.data)}`)
    } catch (error) {
        console.log(error)
    }
}


// getCart()
// getCarts('63431c4b090d0a5d6114ab48')
// createCart()
updateCart('634324791209d41c56a00398')
deleteCart('6343132d9123cccc949ab1c9')