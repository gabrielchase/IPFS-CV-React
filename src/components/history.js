import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { getCurrentUser } from '../actions/index'
import Navbar from './navbar'
import { IPFS_URL } from '../constants'

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        current_user: state.current_user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getCurrentUser
}, dispatch)

class History extends Component {
    async componentWillMount() {
        // this.props.getCurrentUser(this.props.auth._id)
        if (!this.props.current_user._id)
            this.props.getCurrentUser(this.props.current_user._id)
    }

    render() {
        const { current_user } = this.props
        if (current_user._id) {
            return (
                <div>
                    <Navbar />  
                    <Container>
                        <h2>History</h2>
                        {
                            current_user.cv_history.map((cv, i) => {
                                const IPFS_HASH_URL = `${IPFS_URL}/${cv.hash}`
                                return (
                                    <ul>
                                        <li>{cv.modified_on}: <a href={IPFS_HASH_URL}>{cv.hash}</a></li>
                                    </ul>
                                )
                            })
                        }
                    </Container>
                </div>            
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
