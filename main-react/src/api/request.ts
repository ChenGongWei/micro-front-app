import axios from 'axios'

const ax = axios.create({
    baseURL: 'https://www.fastmock.site/mock/77058c6f7bbb6f306a18f6730d577035/test',
    timeout: 30000,
    responseType: 'json',
})

export default ax