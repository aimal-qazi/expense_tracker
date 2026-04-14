import api from "../api/axios"

export const addTransaction = (payload) => {
    return api.post('/transactions/add', payload);
}

export const listTransactions = () => {
    return api.get('/transactions/list');
}