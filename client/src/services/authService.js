import api from "../api/axios"

export const login = (payload) => {
    return api.post('/auth/login', payload)
}

export const register = (payload) => {
    return api.post('/auth/register', payload)
}