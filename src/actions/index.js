import axios from 'axios'

const config_file = require('../config.json')
const { BASE_URL } = config_file[process.env.REACT_APP_NODE_ENV]

function getJWT() {
    let exp = localStorage.getItem('token_exp')
    exp = parseInt(exp)
    
    let current_time = Math.floor(Date.now() / 1000)
    current_time = parseInt(current_time)

    console.log(current_time, exp, current_time < exp)

    if (current_time < exp) 
        return localStorage.getItem('token')
    else 
        return false
}

const getHeaders = (jwt=false) => {
    const headers = {
        headers: {
            'Content-Type' : 'application/json'
        }
    } 
    if (jwt) {
        const token = getJWT()
        headers['headers']['Authorization'] = `Bearer ${token}`
    }
    return headers
}

export const loginUser = (user) => async dispatch => {
    const headers = getHeaders()
    const res = await axios.post(`${BASE_URL}/auth/login`, user, headers)
    console.log('LOGIN res.data: ', res.data)
    
    if (res.data.success) {
        await dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data.data
        })
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('token_exp', res.data.data.exp)
        return { success: true }
    } else {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: res.data
        })
        return { success: false }
    }
}
