export default (state={is_authenticated: false}, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            action.payload['is_authenticated'] = true 
            return action.payload
        case 'LOGIN_FAIL':
            return action.payload
        default: 
            return state
    }
}
