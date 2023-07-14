export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length < 6) return false
    return emailRegex.test(email);
}
export const isValidPassword = (password) => {
    if (password.length < 6 || password.length >= 30) return false
    return true
}
export const isValidName= (name) => {
    if (typeof name !== 'string') return false
    if (name.length <= 3) return false
    return true
}
export const isValidAge = (age) => {
    if (typeof age !== 'number' || age <= 17 || age >= 90) return false
    return true
}

export const isValidProduct = ({title, description, code, price, stock, category}) => {
    if (!title || title.length <= 3 || title.length > 15 || typeof title !== 'string') throw new Error('Title invalid, max=15 min=3 or type is invalid')
    if (!description || description.length <= 7 || description.length > 40 || typeof description !== 'string') throw new Error('Description invalid, max=40 min=7 or type is invalid')
    if (!code || typeof code !== 'string') throw new Error('Code invalid or type is invalid')
    if (!price || price <= 0 || typeof price !== 'number') throw new Error('Price invalid, min=0 or type is invalid')
    if (!stock || stock <= 0 || stock >= 999 || typeof stock !== 'number') throw new Error('Stock invalid, max=999 min=0 or type is invalid')
    if (!category || typeof category !== 'string') throw new Error('Category invalid or type is invalid')

    return {title, description, code, price, stock, category}
}