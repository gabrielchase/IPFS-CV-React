import React from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'

export const CV_View = ({ current_user }) => (
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
            <Grid centered>
                <h3>Education</h3>
            </Grid>
            <br />
            {
                current_user.education.map((e, i) => {
                    return (
                        <div key={i}>   
                            <strong>{e.school}</strong> <span float='right'>{e.start_year} - {e.end_year}</span>
                            <br />
                            {e.degree} {e.course}
                            <br />
                            <br />
                        </div>
                    )
                })
            }
            <br />
            <br />
            <Grid centered>
                <h3>Experience</h3>
            </Grid>
            <br />
            {
                current_user.experience.map((e, i) => {
                    return (
                        <div key={i}>   
                            <strong>{e.company}</strong> <span float='right'>{e.start_date.split(' ')[1]} {e.start_date.split(' ')[3]} - {e.end_date.split(' ')[1]} {e.end_date.split(' ')[3]}</span>
                            <br />
                            {e.position}    
                            <br />
                            {e.description}
                            <br />
                            <br />
                        </div>
                    )
                })
            }
        </Container>
    </Segment>
)
