export default (state={}, action) => {
    switch(action.type) {
        case 'ADD_EXPERIENCE_SUCCESS':
            return action.payload
        case 'ADD_EXPERIENCE_FAIL':
            return action.payload
        case 'UPDATE_EXPERIENCE_SUCCESS':
            return action.payload
        case 'UPDATE_EXPERIENCE_FAIL':
            return action.payload
        case 'DELETE_EXPERIENCE_SUCCESS':
            return action.payload
        case 'DELETE_EXPERIENCE_FAIL':
            return action.payload
        default: 
            return state
    }
}
