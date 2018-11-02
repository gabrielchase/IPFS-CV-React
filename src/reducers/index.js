import { combineReducers } from 'redux'

import auth_reducer from './auth_reducer'
import current_user_reducer from './current_user_reducer'
import education_reducer from './education_reducer'
import experience_reducer from './experience_reducer'

export default combineReducers({
    auth: auth_reducer,
    current_user: current_user_reducer,
    education: education_reducer,
    experience: experience_reducer
})
