import React from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'

export const CvView = ({ current_user }) => (
    <Segment raised>
        <Container id='cv-preview'>
            <br />
            <Grid centered>
                <h2>{ current_user.first_name } { current_user.last_name}</h2>
            </Grid>
            <Grid centered>
                { current_user.email }
            </Grid>
            <br />
            <br />
            <br />
            <Grid centered>
                <h3 id='section-title'>Education</h3>
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
            <Grid centered>
                <h3 id='section-title'>Experience</h3>
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
        </Container>
    </Segment>
)
