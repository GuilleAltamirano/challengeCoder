import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"
import { PORT } from "../../../app.js"
import { userServices } from "../../../daos/mongoDb/services/Users.services.js"

export const homeValidator = async(query, session) => {
    //var
    const arrayPage = []
    let prevLink = '#'
    let nextLink = '#'
    const { email, role} = session
    const user = await userServices.getUsers({emailAddress: email})
    let fullname

    if (user.length === 0) {
        fullname = 'ADMIN'
    } else {
        fullname = `${user[0].surname} ${user[0].lastname}`
    }
    const dataUser = {
        fullname,
        email,
        role
    }
    //destructuring query
    const { page=1, limit=3, category, sort } = query
    //destructuring paginate
    const { docs,
        totalPages,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage, 
    } = await productsServices.productsPaginate({ page, limit, category, sort })
    //for navigation button
    for (let i = 1; i <= totalPages; i++) {
        arrayPage.push(i)
    }

    if (hasPrevPage) prevLink = `http://localhost:${PORT}/?page=${prevPage}`
    if (hasNextPage) nextLink = `http://localhost:${PORT}/?page=${nextPage}`

    return {
        status: true,
        dataUser,
        payload: docs,
        totalPages,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage,
        arrayPage,
        prevLink,
        nextLink
    }

}