import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Container, Form, Grid, Message, Segment, Button } from 'semantic-ui-react'

import { loginUser } from '../actions/index'

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser
}, dispatch)

class Login extends Component { 
    constructor() {
        super()

        this.state = {
            email: 'gao.pan@email.com',
            password: 'password',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.auth.email) 
            this.setState({ email: this.props.auth.email }) 
    }

    
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }
    
    async handleSubmit(e) {
        e.preventDefault()
        const { email, password } = this.state
        const res = await this.props.loginUser({ email, password })
        
        if (res.success) {
            this.props.gotoDashboard()
        }
        else 
            this.setState({ error: 'Error logging in' })
    }

    render() {
        const { error } = this.state
        return (
            <Container id='login-container'>
                <Segment raised id='login-box'>
                        <Form onSubmit={this.handleSubmit}>
                            {
                                error ? 
                                    <Message negative>
                                        <Grid centered>
                                            <Message.Header>{error}</Message.Header>
                                        </Grid>
                                    </Message> 
                                    : 
                                    <div></div>    
                            }
                            <br/>
                            <Form.Input fluid label='Email' placeholder='Email' id='email' value={this.state.email} onChange={this.handleChange} />
                            <Form.Input fluid label='Password' placeholder='Password' id='password' type='password' value={this.state.password} onChange={this.handleChange} />
                            <br/>
                            <Button primary fluid type="submit">SIGN IN</Button>
                        </Form>
                </Segment>
            </Container>
        )
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Login)
