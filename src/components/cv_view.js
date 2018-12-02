import React from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'

export const CvView = ({ current_user }) => (
    <Segment raised>
        <Container id='cv-preview'>
            <br />
            <Grid centered>
                <h2 id='top-name'>{ current_user.first_name } { current_user.last_name}</h2>
            </Grid>
            <Grid centered>
                <span id='top-email'>{ current_user.email }</span>
            </Grid>
            <br />
            <br />
            <br />
            <div id='cv-body'>
                <Grid>
                    <h3 id='section-title'>EDUCATION</h3>
                </Grid>
                <br />
                {
                    current_user.education.map((e, i) => {
                        return (
                            <div key={i}>   
                                <strong id='school'>{e.school}</strong> <span id='date' float='right'>({e.start_date_slug} - {e.end_date_slug})</span>
                                <br />
                                <span id='course'>{e.course}</span>
                                <br />
                                <br />
                            </div>
                        )
                    })
                }
                <br />
                <br />
                <Grid>
                    <h3 id='section-title'>EXPERIENCE</h3>
                </Grid>
                <br />
                {
                    current_user.experience.map((e, i) => {
                        return (
                            <div key={i}>   
                                <strong id='position'>{e.position}</strong> <span id='date' float='right'>({e.start_date_slug} - {e.end_date_slug})</span>
                                <br />
                                <span id='company'>{e.company}</span>
                                <br />
                                <span id='description'>{e.description}</span>
                                <br />
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </Container>
    </Segment>
)
