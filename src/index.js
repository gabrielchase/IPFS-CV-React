import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store'

import './index.css'
import serviceWorker from './serviceWorker'

import Login from './components/login'


render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/login' component={Login} />
            </Switch>        
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker()
