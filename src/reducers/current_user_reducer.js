export default (state={}, action) => {
    switch(action.type) {
        case 'GET_CURRENT_USER_SUCCESS':
            return action.payload
        case 'GET_CURRENT_USER_FAIL':
            return action.payload
        default: 
            return state
    }
}
