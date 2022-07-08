import axios from 'axios'

const ax = axios.create({
    baseURL: 'http://localhost:3003',
    timeout: 30000,
    responseType: 'json',
})

export default ax