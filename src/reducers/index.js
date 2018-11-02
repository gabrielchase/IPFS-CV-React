import { combineReducers } from 'redux'

import auth_reducer from './auth_reducer'
import current_user_reducer from './current_user_reducer'

export default combineReducers({
    auth: auth_reducer,
    current_user: current_user_reducer
})
