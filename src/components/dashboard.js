import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Dropdown, Form, Header, Modal, TextArea } from 'semantic-ui-react'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { loginUser, getCurrentUser, addEducation, addExperience } from '../actions/index'
import { DEGREE_OPTIONS } from '../constants'

import { MyDocument } from './cv_view'

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        current_user: state.current_user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, getCurrentUser, addEducation, addExperience
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
    }

    async componentWillMount() {
        // this.props.getCurrentUser(this.props.auth._id)
        this.props.getCurrentUser('5bdab5f860a8be646c8da64a')
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
                <div>
                    <h3>Education</h3>
                    <Button className='add-education-button' color='green' onClick={() => this.setState({ education_modal_open: true })}>Add Education</Button>
                    {
                        current_user.education.map((e, i) => {
                            return (
                                <div key={i}>   
                                    <p>{e.school}</p>
                                    <p>{e.degree} {e.course}</p>
                                    <p>{e.start_year} - {e.end_year}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return <div></div>
        }
    }

    renderExperience() {
        const { current_user } = this.props
        if (current_user.experience) {
            return (
                <div>
                    <h3>Experience</h3>
                    <Button className='add-experience-button' color='green' onClick={() => this.setState({ experience_modal_open: true })}>Add Experience</Button>
                    {
                        current_user.experience.map((e, i) => {
                            return (
                                <div key={i}>   
                                    <p>{e.company}</p>
                                    <p>{e.position}</p>
                                    <p>{e.description}</p>
                                    <p>{e.start_date} - {e.end_date}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return <div></div>
        }
    }

    render() {
        const { current_user } = this.props
        
        if (current_user._id) {
            const DOWNLOADABLE_CV = <MyDocument current_user={current_user} />

            return ( 
                <div>
                    Welcome {current_user.first_name} {current_user.last_name}
                    <PDFDownloadLink document={DOWNLOADABLE_CV} fileName='somename.pdf'>{({ blob, url, loading, error }) => (
                        loading ? 'Loading document...' : 'Download now!'
                    )}</PDFDownloadLink>
                    {this.renderEducation()}
                    <br/>
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
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
