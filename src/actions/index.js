import axios from 'axios'

const config_file = require('../config.json')
const { BASE_URL } = config_file[process.env.REACT_APP_NODE_ENV]

function getJWT() {
    let exp = localStorage.getItem('token_exp')
    exp = parseInt(exp)
    
    let current_time = Math.floor(Date.now() / 1000)
    current_time = parseInt(current_time)

    if (current_time < exp) 
        return localStorage.getItem('token')
    else 
        return false
}

const getHeaders = () => {
    return {
        headers: {
            'Content-Type' : 'application/json'
        }
    } 
}

const getHeadersWithJWT = () => {
    const token = getJWT()
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const loginUser = (user) => async dispatch => {
    let headers = getHeaders()
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

export const getCurrentUser = (user_id) => async dispatch => {
    let headers = getHeadersWithJWT()
    const res = await axios.get(`${BASE_URL}/user/${user_id}`, headers)
    console.log('GET CURRENT USER USER res.data: ', res.data)

    if (res.data.success) {
        await dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            payload: res.data.data
        })
    } else {
        dispatch({
            type: 'GET_CURRENT_USER_FAIL',
            payload: res.data
        })
    }
}

export const addEducation = (user_id, education) => async dispatch => {
    const headers = getHeadersWithJWT()
    const res = await axios.post(`${BASE_URL}/user/${user_id}/education`, education, headers)
    console.log('ADD EDUCATION res.data: ', res.data) 

    if (res.data.success) {
        await dispatch({
            type: 'ADD_EDUCATION_SUCCESS',
            payload: res.data.data
        })
        return true 
    } else {
        await dispatch({
            type: 'ADD_EDUCATION_FAIL',
            payload: res.data
        })
        return false
    }
}

export const updateEducation = (user_id, education) => async dispatch => {
    const headers = getHeadersWithJWT()
    const res = await axios.put(`${BASE_URL}/user/${user_id}/education/${education._id}`, education, headers)
    console.log('UPDATE EDUCATION res.data: ', res.data) 

    if (res.data.success) {
        await dispatch({
            type: 'UPDATE_EDUCATION_SUCCESS',
            payload: res.data.data
        })
        return true 
    } else {
        await dispatch({
            type: 'UPDATE_EDUCATION_FAIL',
            payload: res.data
        })
        return false
    }
}

export const addExperience = (user_id, experience) => async dispatch =>{
    const headers = getHeadersWithJWT()
    const res = await axios.post(`${BASE_URL}/user/${user_id}/experience`, experience, headers)
    console.log('ADD EXPERIENCE res.data: ', res.data) 

    if (res.data.success) {
        await dispatch({
            type: 'ADD_EXPERIENCE_SUCCESS',
            payload: res.data.data
        })
        return true 
    } else {
        await dispatch({
            type: 'ADD_EXPERIENCE_FAIL',
            payload: res.data
        })
        return false
    }
}

export const updateExperience = (user_id, experience) => async dispatch =>{
    const headers = getHeadersWithJWT()
    const res = await axios.put(`${BASE_URL}/user/${user_id}/experience/${experience._id}`, experience, headers)
    console.log('UPDATE EXPERIENCE res.data: ', res.data) 

    if (res.data.success) {
        await dispatch({
            type: 'UPDATE_EXPERIENCE_SUCCESS',
            payload: res.data.data
        })
        return true 
    } else {
        await dispatch({
            type: 'UPDATE_EXPERIENCE_FAIL',
            payload: res.data
        })
        return false
    }
}

