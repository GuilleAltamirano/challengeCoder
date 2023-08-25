
export const fetchUser = async () => {
    return await fetch('/api/sessions/current', {method: 'GET'})
    .then(res => {
        if (res.status !== 200) return null
        return res.json()
    })
    .then(data => data.payload.user)
    .catch(err => {return})
}

export const fetchGetUsers = async (query) => {
    return await fetch(`/api/users/?${query}`)
    .then(res => {
        if (res.status !== 200) return null
        return res.json()
    })
    .then(data => {
        if (data.status === 'success') return data.payload
        return console.log(data)
    })
    .catch(err => {return})
}

export const fetchDeleteUser = async ({uid}) => {
    return await fetch(`/api/users/${uid}`, {method: 'DELETE'})
    .then(res => {
        if (res.status !== 200) return null
        return res.json()
    })
    .then(data => {
        if (data.status === 'success') return data.message
        return console.log(data)
    })
    .catch(err => {return})
}

export const fetchDeleteUsersLastConnection = async () => {
    return await fetch('/api/users', {method: 'DELETE'})
    .then(res => {
        if (res.status !== 200) return null
        return res.json()
    })
    .then(data => {
        if (data.status === 'success') return data.message
        return console.log(data)
    })
}