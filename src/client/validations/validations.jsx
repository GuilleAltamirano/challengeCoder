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