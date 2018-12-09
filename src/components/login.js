import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Container, Divider, Form, Grid, Header, Message, Modal, Segment, Button } from 'semantic-ui-react'

import { loginUser, registerNewUser } from '../actions/index'

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, registerNewUser,
    gotoDashboard: () => push('/dashboard')
}, dispatch)

class Login extends Component { 
    constructor() {
        super()

        this.state = {
            register_modal_open: false,
            email: '',
            password: '',
            error: '',
            success: '',
            new_user: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNewUserChange = this.handleNewUserChange.bind(this)
        this.handleRegisterNewUser = this.handleRegisterNewUser.bind(this)
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

    handleNewUserChange(e) {
        e.preventDefault()
        const new_user = Object.assign({}, this.state.new_user, {
            [e.target.id]: e.target.value
        })
        this.setState({ new_user })
    }

    async handleRegisterNewUser(e) {
        e.preventDefault()

        const success = await this.props.registerNewUser(this.state.new_user)
        
        if (success) {
            this.setState({ register_modal_open: false })
            this.setState({ success: 'Please log in'})
        } else {
            this.setState({ error: 'Error registering user' })
        }
    }

    render() {
        const { error, success } = this.state
        return (
            <Container id='login-container'>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={8}> 
                            <Segment raised id='login-box' >
                                <h2 id='centerize-text'>Decentralized CVs</h2>
                                <Form>
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
                                    {
                                        success ? 
                                            <Message>
                                                <Grid centered>
                                                    <Message.Header>{success}</Message.Header>
                                                </Grid>
                                            </Message> 
                                            : 
                                            <div></div>    
                                        
                                    }
                                    <Form.Input fluid label='Email' placeholder='Email' id='email' value={this.state.email} onChange={this.handleChange} />
                                    <Form.Input fluid label='Password' placeholder='Password' id='password' type='password' value={this.state.password} onChange={this.handleChange} />
                                    <br/>
                                    <Button primary fluid onClick={this.handleSubmit}>LOGIN</Button>
                                    <Divider horizontal>Or</Divider>
                                    <Button secondary fluid onClick={() => this.setState({ register_modal_open: true })}>REGISTER</Button>
                                </Form>
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal open={this.state.register_modal_open} onClose={() => this.setState({ register_modal_open: false })}>
                    <Header content='Register' />
                    <Modal.Content>
                        <Form>
                            <Form.Input fluid label='First Name' id='first_name' placeholder='John' onChange={this.handleNewUserChange} value={this.state.new_user.first_name} />
                            <Form.Input fluid label='Last Name' id='last_name' placeholder='Smith' onChange={this.handleNewUserChange} value={this.state.new_user.last_name} />
                            <Form.Input fluid label='Email' id='email' placeholder='john_smith@gmail.com' onChange={this.handleNewUserChange} value={this.state.new_user.email} />
                            <Form.Input fluid label='Password' id='password' type='password' onChange={this.handleNewUserChange} value={this.state.new_user.password} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleRegisterNewUser} >
                            Save
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        )
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Login)
