import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        console.log('in dashboard')
    }

    render() {
        console.log('this.props.auth: ', this.props.auth)
        return (
            <div>
                Welcome {this.props.auth.user.first_name} {this.props.auth.user.last_name}
            </div>
        )
    }
}

export default connect(mapStateToProps, {})(Dashboard)
