import { ProductManager } from "./manager/productManager.js";

const productManager = new ProductManager('./db/productsDb.json')


// test uno
// console.log(productManager.getProducts())

// test dos
// ;(async ()=> {
//     productManager.getAddProducts(
//         {title: 'Producto Pruena 1',
//         description: 'Descripción del producto 1',
//         price: 200,
//         thumbnail: 'imagen1.jpg',
//         code: 'ABC123',
//         stock: 20}
//     );
// })()

// setTimeout(() => {
//     console.log(productManager.getProducts());
// }, 1500);

// test tres
// setTimeout(() => {
//     productManager.getProductById(1)
//     .then( res => console.log(res))
// }, 2000)

//test cuatro
; (async () => {
    productManager.getProductUp(1, {
        title: 'Coca-Cola',
        description: 'Coca-Cola de 330ml retornable',
        price: 100,
        thumbnail: 'https://e7.pngegg.com/pngimages/299/667/png-clipart-coca-cola-bl%C4%81k-glass-bottle-the-coca-cola-company-bouteille-de-coca-cola-coca-ecuador-glass-cola.png',
        code: 'ABC123',
        stock: 20,
        id: 10
    })
})()

// test Cinco
// productManager.getDeleteProduct(1)
// .then(res => console.log('ok'))