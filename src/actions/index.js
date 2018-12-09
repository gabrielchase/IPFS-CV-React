import axios from 'axios'

const config_file = require('../config.json')
const { BASE_URL } = config_file['production']

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

export const deleteEducation = (user_id, education_id) => async dispatch => {
    const headers = getHeadersWithJWT()
    const res = await axios.delete(`${BASE_URL}/user/${user_id}/education/${education_id}`, headers)
    console.log('DELETE EDUCATION res.data: ', res.data) 

    if (res.data.success) {
        await dispatch({
            type: 'DELETE_EDUCATION_SUCCESS',
            payload: res.data.data
        })
        return true 
    } else {
        await dispatch({
            type: 'DELETE_EDUCATION_FAIL',
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

export const deleteExperience = (user_id, experience_id) => async dispatch => {
    const headers = getHeadersWithJWT()
    const res = await axios.delete(`${BASE_URL}/user/${user_id}/experience/${experience_id}`, headers)
    console.log('DELETE EXPERIENCE res.data: ', res.data) 

    if (res.data.success) {
        await dispatch({
            type: 'DELETE_EXPERIENCE_SUCCESS',
            payload: res.data.data
        })
        return true 
    } else {
        await dispatch({
            type: 'DELETE_EXPERIENCE_FAIL',
            payload: res.data
        })
        return false
    }
}

export const updateProfile = (user) => async dispatch => {
    const user_id = user._id 
    delete user._id
    const headers = getHeadersWithJWT()
    const update_res = await axios.put(`${BASE_URL}/user/${user_id}`, user, headers)
    console.log('UPDATE USER res.data: ', update_res.data)
    
    if (update_res.data.success) {
        const get_user_res = await axios.get(`${BASE_URL}/user/${user_id}`, headers)
        await dispatch({
            type: 'UPDATE_USER_SUCCESS',
            payload: get_user_res.data.data
        })
        return true 
    } else {
        return false
    }
}

export const registerNewUser = (user) => async dispatch => {
    console.log('user: ', user)
    const res = await axios.post(`${BASE_URL}/user`, user)
    console.log('REGISTER NEW USER res.data: ', res.data)
    
    if (res.data.success) {
        return true
    } else {
        return false
    }
}
