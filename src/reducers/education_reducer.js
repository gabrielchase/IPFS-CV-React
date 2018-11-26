export default (state={}, action) => {
    switch(action.type) {
        case 'ADD_EDUCATION_SUCCESS':
            return action.payload
        case 'ADD_EDUCATION_FAIL':
            return action.payload
        case 'UPDATE_EDUCATION_SUCCESS':
            return action.payload
        case 'UPDATE_EDUCATION_FAIL':
            return action.payload
        default: 
            return state
    }
}
