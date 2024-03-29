import chai from "chai"
import supertest from "supertest"
import { usersDao } from "../src/server/dao/factory.dao.js"
import { createFakerUsers, createFakerProducts } from "../src/server/utils/facker.js"

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Ddbase', () => {
    let cookieToken, uid, user, pid, cid, codeInvalid = '64b77191ad09ec4e79d5fe8a', prodBuy = '6433d2d9253a5014b24bbf85', prodNoBuy = '6434b4043686ffd2f48230be', cartInvalid = '6482acf481ff161da42b7c62'
    describe('Test session and User', () => {
        it('Request type post /api/sessions/register, create user', async () => {
            const {first_name, last_name, email, password} = await createFakerUsers()
            user = { email, password: password }
            //keys invalid
            const {_body} = await requester.post('/api/users/register')
            expect(_body).to.have.property('error', 'User keys invalid')
            //keys valid
            const {statusCode} = await requester.post('/api/users/register').send({first_name, last_name, email, password})
            expect(statusCode).to.be.eql(302)
            //keys valid but duplicated
            const {body} = await requester.post('/api/users/register').send({first_name, last_name, email, password})
            expect(body.error).to.be.eql('user existing')
        })

        it('Request type get /api/sessions/verification/?code=id, validate email', async () => {
            const data = await usersDao.get({email: user.email})
            uid = data[0]._id
            cid = data[0].cart._id
            
            //code or uid invalid
            const {body} = await requester.get(`/api/sessions/verification/?code=${codeInvalid}`)
            expect(body).to.have.property('error', 'User invalid')
            //no code query
            const {_body} = await requester.get(`/api/sessions/verification/`)
            expect(_body).to.have.property('error', 'Code invalid')
            //code and uid valid
            const {statusCode} = await requester.get(`/api/sessions/verification/?code=${uid}`)
            expect(statusCode).to.be.eql(302)
        })

        it('Request type post /api/sessions/login, for login and redirect home', async () => {
            //no password
            const {_body} = await requester.post(`/api/sessions/login`).send({email: user.email})
            expect(_body).to.have.property('error', 'Date invalid')

            //email and password invalid
            const {statusCode} = await requester.post(`/api/sessions/login`).send({email: 'admin@admin.com', password: user.password})
            expect(statusCode).to.be.eql(400)
            const {body} = await requester.post(`/api/sessions/login`).send({email: user.email, password: 'hola1234'})
            expect(body).to.have.property('error', 'User or password invalid')
            //data ok
            const result = await requester.post(`/api/sessions/login`).send(user)
            
            cookieToken = result.headers['set-cookie'][0]
            
            expect(result.status).to.be.eql(302)
        })

        it('Request type put /api/users/premium/:uid, for challenge role to premium', async () => {
            //no authentication
            const {statusCode} = await requester.put(`/api/users/premium/${uid}`)
            expect(statusCode).to.be.eql(401)
            //uid invalid
            const {status} = await requester.put(`/api/users/premium/ansjdnajsdnajsd`).set('Cookie', cookieToken)
            expect(status).to.be.eql(400)
            //uid no existing
            const {body} = await requester.put(`/api/users/premium/${codeInvalid}`).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'User no existing')
            //data ok
            const result = await requester.put(`/api/users/premium/${uid}`).set('Cookie', cookieToken)
            
            cookieToken = result.headers['set-cookie'][1] //token with new role

            expect(result).to.be.ok
        })

        it('Request type get /api/sessions/current, return cookie data', async () => {
            //no authentication
            const {statusCode} = await requester.get(`/api/sessions/current`)
            expect(statusCode).to.be.eql(401)
            //all ok
            const {_body} = await requester.get(`/api/sessions/current`).set('Cookie', cookieToken)

            expect(_body).to.have.property('status', 'success')
        })

        it('Request type post /api/sessions/logout, delete session, redirect login', async () => {
            //no authentication
            const {statusCode} = await requester.post(`/api/sessions/logout`)
            expect(statusCode).to.be.eql(401)
            //all ok
            const {status} = await requester.post(`/api/sessions/logout`).set('Cookie', cookieToken)
            
            cookieToken = null
            
            expect(status).to.be.eql(302)
        })

        it('Request type post /api/sessions/forgotpassword, return code for challenge password', async () => {
            //no email
            const {statusCode} = await requester.post(`/api/sessions/forgotpassword`)
            expect(statusCode).to.be.eql(400)
            //email invalid
            const {body} = await requester.post(`/api/sessions/forgotpassword`).send({email: 'admin@admin.com'})
            expect(body).to.have.property('error', 'User no exist')
            //all ok
            const {_body} = await requester.post(`/api/sessions/forgotpassword`).send({email: user.email})
            
            expect(_body.payload.code.code).to.be.ok

            cookieToken = _body.payload.code.code
        })

        it('Request type get /api/sessions/newpassword, validated code and redirect to new password', async () => {
            //code token invalid
            const {status} = await requester.get(`/api/sessions/newpassword/?code=${uid}`)
            expect(status).to.be.eql(302)
            //all ok
            const result = await requester.get(`/api/sessions/newpassword/?code=${cookieToken}`)
            
            cookieToken = result.headers['set-cookie']

            expect(result).to.be.ok
        })

        it('Request type put /api/users/newPassword/:uid, validated password and challenge', async () => {
            //no authentication
            const {statusCode} = await requester.put(`/api/users/newpassword/${uid}`).send({password: user.password})
            expect(statusCode).to.be.eql(401)
            //uid invalid
            const {_body} = await requester.put(`/api/users/newpassword/${codeInvalid}`).send({password: user.password}).set('Cookie', cookieToken)
            expect(_body).to.have.property('error', 'User no exist')
            //same password
            const {body} = await requester.put(`/api/users/newpassword/${uid}`).send({password: user.password}).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'Invalid, same password')
            //all ok
            const {status} = await requester.put(`/api/users/newpassword/${uid}`).send({password: 'hola1234'}).set('Cookie', cookieToken)

            expect(status).to.be.eql(302)
        })
    })

    describe('Test Products', () => {
        it('Request type get /api/products, return all products in format mongoose-paginate', async () => {
            const {_body} = await requester.get('/api/products').set('Cookie', cookieToken)

            expect(_body.payload.docs).to.be.ok
        })

        it('Request type post /api/products, create new product', async () => {
            const {title, description, code, price, stock, category} = await createFakerProducts()
            //no authentication
            const {statusCode} = await requester.post('/api/products').send({title, description, code, price, stock, category})
            expect(statusCode).to.be.eql(401)
            //no product
            const {status} = await requester.post('/api/products').set('Cookie', cookieToken)
            expect(status).to.be.eql(400)
            //all ok
            const {_body} = await requester.post('/api/products').send({title, description, code, price, stock, category}).set('Cookie', cookieToken)

            pid = _body.payload._id

            expect(_body.payload).to.be.ok
            //create existing product
            const {body} = await requester.post('/api/products').send({title, description, code, price, stock, category}).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'Product existing')
        })

        it('Request type put /api/products/:pid, update product', async () => {
            //no authentication
            const {statusCode} = await requester.post('/api/products')
            expect(statusCode).to.be.eql(401)
            //no update
            const {error} = await requester.put(`/api/products/${pid}`).set('Cookie', cookieToken)
            expect(error.status).to.be.eql(400)
            //pid invalid
            const {body} = await requester.put(`/api/products/${uid}`).send({stock: 1}).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'Product no existing')
            //owner invalid
            const {status} = await requester.put(`/api/products/${prodBuy}`).send({stock: 1}).set('Cookie', cookieToken)
            expect(status).to.be.eql(400)
            //all ok
            const {_body} = await requester.put(`/api/products/${pid}`).send({stock: 1}).set('Cookie', cookieToken)

            expect(_body.message).to.be.ok
        })

        it('Request type delete /api/products/:pid, update status to false', async () => {
            //no authentication
            const {statusCode} = await requester.delete(`/api/products/${uid}`)
            expect(statusCode).to.be.eql(401)
            //pid invalid
            const {body} = await requester.delete(`/api/products/${uid}`).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'Product no existing')
            //owner invalid
            const {status} = await requester.put(`/api/products/${prodBuy}`).send({stock: 1}).set('Cookie', cookieToken)
            expect(status).to.be.eql(400)
            //all ok
            const {_body} = await requester.delete(`/api/products/${pid}`).set('Cookie', cookieToken)

            expect(_body.message).to.be.ok
        })
    })

    describe('Test carts', () => {
        it('Request type post /api/carts/:cid/products/:pid, add product in cart', async () => {
            //no authentication
            const {statusCode} = await requester.post(`/api/carts/${cid}/products/${pid}`)
            expect(statusCode).to.be.eql(401)
            //product status false
            const {body} = await requester.post(`/api/carts/${uid}/products/${pid}`).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'Product invalid')
            //all ok
            const {_body} = await requester.post(`/api/carts/${cid}/products/${prodBuy}`).set('Cookie', cookieToken)

            expect(_body.payload).to.be.eql('Product add in cart')
        })

        it('Request type put /api/carts/:cid/products/:pid, update qty to product', async () => {
            const quantity = 3
            
            //no authentication
            const {statusCode} = await requester.put(`/api/carts/${cid}/products/${prodBuy}`)
            expect(statusCode).to.be.eql(401)
            //product status false
            const {body} = await requester.put(`/api/carts/${cid}/products/${pid}`).send({quantity}).set('Cookie', cookieToken)
            expect(body).to.have.property('error', 'Quantity or product invalid')
            //product does not exist in the cart
            const {_body} = await requester.put(`/api/carts/${cid}/products/${prodNoBuy}`).send({quantity}).set('Cookie', cookieToken)
            expect(_body).to.have.property('error', 'product does not exist in cart')
            //all ok
            const {status} = await requester.put(`/api/carts/${cid}/products/${prodBuy}`).send({quantity}).set('Cookie', cookieToken)

            expect(status).to.be.eql(200)
        })
        
        it('Request type delete /api/carts/:cid/product/:pid, delete product in cart', async () => {
            //no authentication
            const {statusCode} = await requester.delete(`/api/carts/${cid}/products/${prodBuy}`)
            expect(statusCode).to.be.eql(401)
            //all ok
            const {_body} = await requester.delete(`/api/carts/${cid}/products/${prodBuy}`).set('Cookie', cookieToken)
            
            expect(_body).to.have.property('status', 'success')
        })

        it('Request type put /api/carts/:cid, update cart with two products', async () => {
            const newCart = {
                products: [
                    {
                        product: `${prodNoBuy}`,
                        quantity: 5
                    },
                    {
                        product: `${prodBuy}`,
                        quantity: 1
                    },
                ]
            }
            //no authentication
            const {statusCode} = await requester.put(`/api/carts/${cid}/`)
            expect(statusCode).to.be.eql(401)
            //all ok
            const {_body} = await requester.put(`/api/carts/${cid}/`).send(newCart).set('Cookie', cookieToken)

            expect(_body).to.have.property('status', 'success')
        })

        it('Request type post /api/carts/:cid/purchase, generate ticket', async () => {
            //no authentication
            const {statusCode} = await requester.post(`/api/carts/${cid}/purchase`)
            expect(statusCode).to.be.eql(401)
            //cid empty
            const {body} = await requester.post(`/api/carts/${cartInvalid}/purchase`).set('Cookie', cookieToken)

            expect(body).to.have.property('error', 'Cart invalid or empty')
            //all ok
            const {_body} = await requester.post(`/api/carts/${cid}/purchase`).set('Cookie', cookieToken)

            expect(_body).to.have.property('status', 'success')
        })
    })
})