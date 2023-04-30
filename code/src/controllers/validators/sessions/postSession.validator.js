export const postSessionValidator = async ({session, email}) => {
    session.email = email

    if (email === 'adminCoder@coder.com' || email === 'admin@admin.com') {
        session.role = 'admin'
        return session
    }
    session.role = 'user'
    //return
    return session
}