import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Menu } from 'semantic-ui-react'

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        current_user: state.current_user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    gotoHome: () => push('/dashboard'),
    gotoHistory: () => push('/history'),
    gotoLogin: () => push('/login'),
}, dispatch)

class Navbar extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item name='home' onClick={() => this.props.gotoHome()}>
                    Home
                </Menu.Item>

                <Menu.Item name='history' onClick={() => this.props.gotoHistory()}>
                    History
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item name='logout' onClick={() => this.props.gotoLogin()}>
                        Log Out
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
