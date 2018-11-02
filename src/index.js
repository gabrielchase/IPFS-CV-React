import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
// import { Redirect } from 'react-router-dom'

import store, { history } from './store'

import './index.css'
import serviceWorker from './serviceWorker'

import Login from './components/login'
import Dashboard from './components/dashboard'

// const verifyJWT = () => {
//     console.log('verifying jwt')
//     let exp = localStorage.getItem('token_exp')
//     exp = parseInt(exp)
    
//     let current_time = Math.floor(Date.now() / 1000)
//     current_time = parseInt(current_time)

//     if (current_time > exp) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('token_exp')
//         console.log('returning false')
//         return false 
//     }
    
//     if (current_time <= exp )
//         return true 
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render = { props =>
//         verifyJWT() ? (
//             <Component {...props} />
//         ) : (
//             <Redirect
//             to={{
//             pathname: '/login',
//             state: { from: props.location }
//             }} />
//         )}
//     />
// )  

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>        
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker()
