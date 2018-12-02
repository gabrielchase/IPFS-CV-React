import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Menu, Button, Form, Grid, Header, Modal } from 'semantic-ui-react'

import { updateProfile, getCurrentUser } from '../actions/index'

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        current_user: state.current_user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateProfile, getCurrentUser,
    gotoHome: () => push('/dashboard'),
    gotoHistory: () => push('/history'),
    gotoLogin: () => push('/login'),
}, dispatch)



class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile_modal_open: false,
            edit_profile: {}
        }

        this.handleEditProfileChange = this.handleEditProfileChange.bind(this)
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this)
    }

    handleEditProfileChange(e) {
        e.preventDefault()
        const edit_profile = Object.assign({}, this.state.edit_profile, {
            [e.target.id]: e.target.value
        })
        this.setState({ edit_profile })
    }

    async handleUpdateProfile(e) {
        e.preventDefault()
        
        const success = await this.props.updateProfile(this.state.edit_profile)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
            this.setState({ profile_modal_open: false })
        }
    }

    
    render() {
        const { current_user } = this.props
        let edit_profile_values = {
            _id: current_user._id,
            email: current_user.email,
            first_name: current_user.first_name,
            last_name: current_user.last_name
        }

        return (
            <Menu>
                <Menu.Item name='home' onClick={() => this.props.gotoHome()}>
                    Home
                </Menu.Item>

                <Menu.Item name='history' onClick={() => this.props.gotoHistory()}>
                    History
                </Menu.Item>

                <Menu.Item name='user_info' onClick={() => this.setState({ profile_modal_open: true, edit_profile: edit_profile_values })}>
                    Profile
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item name='logout' onClick={() => this.props.gotoLogin()}>
                        Log Out
                    </Menu.Item>
                </Menu.Menu>

                <Modal open={this.state.profile_modal_open} onClose={() => this.setState({ profile_modal_open: false })}>
                    <Header content='Profile' />
                    <Modal.Content>
                        <Form>
                            <Grid>
                                <Grid.Column width={8}><Form.Input fluid label='First Name' id='first_name' placeholder='John' onChange={this.handleEditProfileChange}  value={this.state.edit_profile.first_name} /></Grid.Column>
                                <Grid.Column width={8}><Form.Input fluid label='Last Name' id='last_name' placeholder='Smith' onChange={this.handleEditProfileChange} value={this.state.edit_profile.last_name} /></Grid.Column>
                            </Grid>
                            <br />
                            <Form.Input fluid label='Email' id='email' placeholder='john_smith@gmail.com' onChange={this.handleEditProfileChange} value={this.state.edit_profile.email} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleUpdateProfile} >
                            Save
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Menu>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
