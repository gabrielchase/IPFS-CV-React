import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Dropdown, Form, Header, Modal, TextArea, Container, Divider, Grid, Icon, Segment } from 'semantic-ui-react'
import { push } from 'connected-react-router'
import html2pdf from 'html2pdf.js'
import axios from 'axios'

import { loginUser, getCurrentUser, addEducation, addExperience, updateEducation, updateExperience, deleteEducation, deleteExperience } from '../actions/index'
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
    loginUser, getCurrentUser, addEducation, addExperience, updateEducation, updateExperience, deleteEducation, deleteExperience,
    gotoHome: () => push('/dashboard'),
    gotoHistory: () => push('/history'),
    gotoLogin: () => push('/login'),
}, dispatch)

const displayYearDateInput = (date) => {
    if (date) {
        const split_date = date.split('-')
        return `${split_date[0]}-${split_date[1]}`
    } else {
        return ''
    }   
}

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            education_modal_open: false,
            edit_education_modal_open: false,
            experience_modal_open: false,
            
            new_education: {},
            new_experience: {},

            edit_education: {},
            edit_experience: {},
            
            render_pdf: false
        }

        this.handleNewEducationChange = this.handleNewEducationChange.bind(this)
        this.handleEditEducationChange = this.handleEditEducationChange.bind(this)
        
        this.handleNewExperienceChange = this.handleNewExperienceChange.bind(this)
        this.handleEditExperienceChange = this.handleEditExperienceChange.bind(this)
        
        this.handleAddEducation = this.handleAddEducation.bind(this)
        this.handleUpdateEducation = this.handleUpdateEducation.bind(this)
        
        this.handleAddExperience = this.handleAddExperience.bind(this)
        this.handleUpdateExperience = this.handleUpdateExperience.bind(this)

        this.handleDeleteEducation = this.handleDeleteEducation.bind(this)
        
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

    handleEditEducationChange(e) {
        e.preventDefault()
        const edit_education = Object.assign({}, this.state.edit_education, {
            [e.target.id]: e.target.value
        })
        this.setState({ edit_education })
    }

    handleNewExperienceChange(e) { 
        e.preventDefault()
        const new_experience = Object.assign({}, this.state.new_experience, {
            [e.target.id]: e.target.value
        })
        this.setState({ new_experience })
    }

    handleEditExperienceChange(e) { 
        e.preventDefault()
        const edit_experience = Object.assign({}, this.state.edit_experience, {
            [e.target.id]: e.target.value
        })
        this.setState({ edit_experience })
    }

    handleEducationDegreeSelectField = async (e, { field, value }) => {
        const new_education = Object.assign({}, this.state.new_education, {
            [field]: value
        })
        await this.setState({ new_education })
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
    
    async handleUpdateEducation(e) {
        e.preventDefault() 
        const success = await this.props.updateEducation(this.props.current_user._id, this.state.edit_education)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
            this.setState({ edit_education_modal_open: false })
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

    async handleUpdateExperience(e) {
        e.preventDefault() 
        const success = await this.props.updateExperience(this.props.current_user._id, this.state.edit_experience)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
            this.setState({ edit_experience_modal_open: false })
        } else {
            // Error message
        }
    }

    async handleDeleteEducation(education_id) {
        const success = await this.props.deleteEducation(this.props.current_user._id, education_id)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
        } else {
            // Error message
        }
    }

    async handleDeleteExperience(experience_id) {
        const success = await this.props.deleteExperience(this.props.current_user._id, experience_id)

        if (success) {
            await this.props.getCurrentUser(this.props.current_user._id)
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
                        <Grid.Column width={14}><h3>Education</h3></Grid.Column>    
                        <Grid.Column width={2}><Icon floated='right' name='plus square outline' size='large' onClick={() => this.setState({ education_modal_open: true })} /></Grid.Column>    
                    </Grid>                    
                    {
                        current_user.education.map((e, i) => {
                            return (
                                <div key={i}>   
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={13}><h4>{e.school}</h4></Grid.Column>
                                        <Grid.Column width={1}><Icon name='edit'  onClick={() => this.setState({ edit_education_modal_open: true, edit_education: e })} /></Grid.Column>
                                        <Grid.Column width={1}><Icon name='delete' onClick={() => this.handleDeleteEducation(e._id)}/></Grid.Column>
                                        <Grid.Column width={1}></Grid.Column>
                                    </Grid>
                                    {e.degree} {e.course}
                                    <br />
                                    {e.start_date_slug} - {e.end_date_slug}
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
                        <Grid.Column width={14}><h3>Experience</h3></Grid.Column>    
                        <Grid.Column width={2}><Icon floated='right' name='plus square outline' size='large' onClick={() => this.setState({ experience_modal_open: true })} /></Grid.Column>    
                    </Grid>        
                    {
                        current_user.experience.map((e, i) => {
                            return (
                                <div key={i}>   
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={13}><h4>{e.company}</h4></Grid.Column>
                                        <Grid.Column width={1}><Icon floated='right' name='edit'  onClick={() => this.setState({ edit_experience_modal_open: true, edit_experience: e })} /></Grid.Column>
                                        <Grid.Column width={1}><Icon floated='right' name='delete' onClick={() => this.handleDeleteExperience(e._id)} /></Grid.Column>    
                                        <Grid.Column width={1}></Grid.Column>
                                    </Grid>
                                    <strong>{e.position}</strong>
                                    <br />
                                    {e.start_date_slug} - {e.end_date_slug}
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
        const { edit_education, edit_experience } = this.state
        
        if (current_user._id) {
            return ( 
                <div>
                    <Navbar />
                    <Container>
                        <Grid>
                            <Container>
                                <br />
                                <Grid>
                                    <Grid.Column width={14}><h2>Welcome {current_user.first_name} {current_user.last_name}</h2></Grid.Column>    
                                    <Grid.Column width={2}><Button color='blue' float='right' onClick={() => this.handleUploadCV()}>Save CV</Button></Grid.Column>
                                </Grid>        
                            </Container>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                        <div id='body'>
                                            {this.renderEducation()}
                                            {this.renderExperience()}
                            
                                            <Modal open={this.state.education_modal_open} onClose={() => this.setState({ education_modal_open: false })}>
                                                <Header content='Education' />
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Input fluid label='School' id='school' placeholder='Harvard University' onChange={this.handleNewEducationChange}  />
                                                        <Form.Input fluid label='Course' id='course' placeholder='MS Computer Science' onChange={this.handleNewEducationChange}  />
                                                        <Grid>
                                                            <Grid.Column width={8}><Form.Input fluid label='Start Date' id='start_date' placeholder='ex: 2018-01' onChange={this.handleNewEducationChange}  /></Grid.Column>
                                                            <Grid.Column width={8}><Form.Input fluid label='End Date' id='end_date' placeholder='ex: 2018-12' onChange={this.handleNewEducationChange} /></Grid.Column>
                                                        </Grid>
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='green' onClick={this.handleAddEducation}>
                                                        Save
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>

                                            <Modal open={this.state.edit_education_modal_open} onClose={() => this.setState({ edit_education_modal_open: false })}>
                                                <Header content='Education' />
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Input fluid label='School' id='school' placeholder='Harvard University' onChange={this.handleEditEducationChange} value={edit_education.school} />
                                                        <Form.Input fluid label='Course' id='course' placeholder='MS Computer Science' onChange={this.handleEditEducationChange} value={edit_education.course} />
                                                        <Grid>
                                                            <Grid.Column width={8}><Form.Input fluid label='Start Date' id='start_date' placeholder='ex: 2018-01' onChange={this.handleEditEducationChange} value={displayYearDateInput(edit_education.start_date)} /></Grid.Column>
                                                            <Grid.Column width={8}><Form.Input fluid label='End Date' id='end_date' placeholder='ex: 2018-12' onChange={this.handleEditEducationChange} value={displayYearDateInput(edit_education.end_date)} /></Grid.Column>
                                                        </Grid>
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='green' onClick={this.handleUpdateEducation}>
                                                        Save
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>
                            
                                            <Modal open={this.state.experience_modal_open} onClose={() => this.setState({ experience_modal_open: false })}>
                                                <Header content='Experience' />
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Input fluid label='Company' id='company' placeholder='Google' onChange={this.handleNewExperienceChange}  />
                                                        <Form.Input fluid label='Position' id='position' placeholder='Senior Software Engineer' onChange={this.handleNewExperienceChange}  />
                                                        <label><strong>Description</strong></label>
                                                        <TextArea fluid id='description' placeholder='Description' onChange={this.handleNewExperienceChange}  />
                                                        <br />
                                                        <br />
                                                        <Form.Input fluid label='Start Date' id='start_date' placeholder='ex: 2018-01' onChange={this.handleNewExperienceChange}  />
                                                        <Form.Input fluid label='End Date' id='end_date' placeholder='ex: 2018-12' onChange={this.handleNewExperienceChange}  />
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='green' onClick={this.handleAddExperience}>
                                                        Save
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>

                                            <Modal open={this.state.edit_experience_modal_open} onClose={() => this.setState({ edit_experience_modal_open: false })}>
                                                <Header content='Experience' />
                                                <Modal.Content>
                                                    <Form>
                                                        <Form.Input fluid label='Company' id='company' placeholder='Google' onChange={this.handleEditExperienceChange} value={edit_experience.company} />
                                                        <Form.Input fluid label='Position' id='position' placeholder='Senior Software Engineer' onChange={this.handleEditExperienceChange} value={edit_experience.position} />
                                                        <label><strong>Description</strong></label>
                                                        <TextArea fluid id='description' placeholder='Description' onChange={this.handleEditExperienceChange} value={edit_experience.description} />
                                                        <br />
                                                        <br />
                                                        <Form.Input fluid label='Start Date' id='start_date' placeholder='ex: 2018-01' onChange={this.handleEditExperienceChange} value={displayYearDateInput(edit_experience.start_date)} />
                                                        <Form.Input fluid label='End Date' id='end_date' placeholder='ex: 2018-12' onChange={this.handleEditExperienceChange} value={displayYearDateInput(edit_experience.end_date)} />
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button color='green' onClick={this.handleUpdateExperience}>
                                                        Save
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>
                                        </div>            
                                    
                                </Grid.Column>
                                <Grid.Column width={8}>
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
