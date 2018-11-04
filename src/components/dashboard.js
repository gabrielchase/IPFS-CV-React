import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Dropdown, Form, Header, Modal, TextArea, Container, Divider, Grid, Icon, Segment } from 'semantic-ui-react'
import { push } from 'connected-react-router'
import html2pdf from 'html2pdf.js'
import axios from 'axios'

import { loginUser, getCurrentUser, addEducation, addExperience } from '../actions/index'
import { DEGREE_OPTIONS } from '../constants'
import { CV_View } from './cv_view'
import Navbar from './navbar'

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        current_user: state.current_user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, getCurrentUser, addEducation, addExperience,
    gotoHome: () => push('/dashboard'),
    gotoHistory: () => push('/history'),
    gotoLogin: () => push('/login'),
}, dispatch)

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            education_modal_open: false,
            experience_modal_open: false,
            
            new_education: {},
            new_experience: {},
            
            render_pdf: false
        }

        this.handleNewEducationChange = this.handleNewEducationChange.bind(this)
        this.handleNewExperienceChange = this.handleNewExperienceChange.bind(this)
        this.handleAddEducation = this.handleAddEducation.bind(this)
        this.handleAddExperience = this.handleAddExperience.bind(this)
        this.handleUploadCV = this.handleUploadCV.bind(this)
    }

    async componentWillMount() {
        // this.props.getCurrentUser(this.props.auth._id)
        this.props.getCurrentUser('5bdab5f860a8be646c8da64a')
    }

    async handleUploadCV() {
        const token = localStorage.getItem('token')
        const cv = document.getElementById('cv-preview')
        const cv_buffer = await html2pdf().from(cv).outputPdf()

        const res = await axios.post(`http://localhost:3005/api/user/${this.props.current_user._id}/cv`, JSON.stringify({ data: cv_buffer }), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        console.log('res.data: ', res.data)

        if (res.data.success) {
            await this.props.getCurrentUser(this.props.current_user._id)
            html2pdf(cv)
        } else {
            // Error message
        }
    }

    handleNewEducationChange(e) {
        e.preventDefault()
        const new_education = Object.assign({}, this.state.new_education, {
            [e.target.id]: e.target.value
        })
        this.setState({ new_education })
    }

    handleNewExperienceChange(e) { 
        e.preventDefault()
        const new_experience = Object.assign({}, this.state.new_experience, {
            [e.target.id]: e.target.value
        })
        this.setState({ new_experience })
    }

    handleEducationDegreeSelectField = async (e, { field, value }) => {
        const new_edcation = Object.assign({}, this.state.new_edcation, {
            [field]: value
        })
        await this.setState({ new_edcation })
    }

    async handleAddEducation(e) {
        e.preventDefault() 
        const success = await this.props.addEducation(this.props.current_user._id, this.state.new_education)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
            this.setState({ education_modal_open: false })
        } else {
            // Error message
        }
    }

    async handleAddExperience(e) {
        e.preventDefault() 
        const success = await this.props.addExperience(this.props.current_user._id, this.state.new_experience)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
            this.setState({ experience_modal_open: false })
        } else {
            // Error message
        }
    }

    renderEducation() {
        const { current_user } = this.props
        if (current_user.education) {
            return (
                <Segment raised>
                    <Grid>
                        <Grid.Column width={14}><h2>Education</h2></Grid.Column>    
                        <Grid.Column width={2}><Icon floated='right' name='plus square outline' size='large' onClick={() => this.setState({ education_modal_open: true })} /></Grid.Column>    
                    </Grid>                    
                    {
                        current_user.education.map((e, i) => {
                            return (
                                <div key={i}>   
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={14}><h3>{e.school}</h3></Grid.Column>
                                        <Grid.Column width={2}><Icon floated='right' name='edit'  onClick={() => this.setState({ education_modal_open: true })} /></Grid.Column>
                                    </Grid>
                                    {e.degree} {e.course}
                                    <br />
                                    {e.start_year} - {e.end_year}
                                </div>
                            )
                        })
                    }
                </Segment>
            )
        } else {
            return <div></div>
        }
    }

    renderExperience() {
        const { current_user } = this.props
        
        if (current_user.experience) {
            return (
                <Segment raised>
                    <Grid>
                        <Grid.Column width={14}><h2>Experience</h2></Grid.Column>    
                        <Grid.Column width={2}><Icon floated='right' name='plus square outline' size='large' onClick={() => this.setState({ experience_modal_open: true })} /></Grid.Column>    
                    </Grid>        
                    {
                        current_user.experience.map((e, i) => {
                            const start_date = e.start_date.split(' ')
                            const end_date = e.end_date.split(' ')
                            return (
                                <div key={i}>   
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={14}><h3>{e.company}</h3></Grid.Column>
                                        <Grid.Column width={2}><Icon floated='right' name='edit'  onClick={() => this.setState({ experience_modal_open: true })} /></Grid.Column>
                                    </Grid>
                                    <strong>{e.position}</strong>
                                    <br />
                                    {start_date[1]} {start_date[3]} - {end_date[1]} {end_date[3]}
                                    <br />
                                    {e.description}
                                </div>
                            )
                        })
                    }
                </Segment>
            )
        } else {
            return <div></div>
        }
    }

    render() {
        const { current_user } = this.props
        
        if (current_user._id) {
            return ( 
                <div>
                    <Navbar />
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                        <div id='body'>
                                            <h3>Welcome {current_user.first_name} {current_user.last_name}</h3>
                                            {this.renderEducation()}
                                            {this.renderExperience()}
                            
                                            <Modal open={this.state.education_modal_open} onClose={() => this.setState({ education_modal_open: false })}>
                                                <Header content='Education' />
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Input fluid label='School' id='school' placeholder='School' onChange={this.handleNewEducationChange}  />
                                                        <label><strong>Degree</strong></label>
                                                        <Dropdown placeholder='Degree' field='degree' onChange={this.handleEducationDegreeSelectField} fluid search selection options={DEGREE_OPTIONS} />
                                                        <br />
                                                        <Form.Input fluid label='Course' id='course' placeholder='Course' onChange={this.handleNewEducationChange}  />
                                                        <Form.Input fluid label='Start Year' id='start_year' placeholder='Start Year' onChange={this.handleNewEducationChange}  />
                                                        <Form.Input fluid label='End Year' id='end_year' placeholder='End Year' onChange={this.handleNewEducationChange}  />
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='green' onClick={this.handleAddEducation}>
                                                        Save
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>
                            
                                            <Modal open={this.state.experience_modal_open} onClose={() => this.setState({ experience_modal_open: false })}>
                                                <Header content='Experience' />
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Input fluid label='Company' id='company' placeholder='Company' onChange={this.handleNewExperienceChange}  />
                                                        <Form.Input fluid label='Position' id='position' placeholder='Position' onChange={this.handleNewExperienceChange}  />
                                                        <label><strong>Description</strong></label>
                                                        <TextArea fluid id='description' placeholder='Description' onChange={this.handleNewExperienceChange}  />
                                                        <br />
                                                        <br />
                                                        <Form.Input fluid label='Start Date' id='start_date' placeholder='Start Date' onChange={this.handleNewExperienceChange}  />
                                                        <Form.Input fluid label='End Date' id='end_date' placeholder='End Date' onChange={this.handleNewExperienceChange}  />
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='green' onClick={this.handleAddExperience}>
                                                        Save
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>
                                        </div>            
                                    
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <br />
                                    <Container>
                                        <Grid>
                                            <Grid.Column width={12}></Grid.Column>    
                                            <Grid.Column width={4}><Button color='blue' float='right' onClick={() => this.handleUploadCV()}>Save CV</Button></Grid.Column>
                                        </Grid>        
                                    </Container>
                                    <CV_View current_user={current_user} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)