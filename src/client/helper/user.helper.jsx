
export const fetchUser = async (setIsAuth) => {
    return await fetch('/api/sessions/current', {method: 'GET'})
    .then(res => {
        if (res.status !== 200) setIsAuth(false)
        return res.json()
    })
    .then(data => data.payload.user)
    .catch(err => console.log(err))
}