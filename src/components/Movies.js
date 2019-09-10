import React from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, UncontrolledTooltip, Tooltip } from 'reactstrap';
import {UID} from 'react-uid';

const Movies = (props) => {

    const moviesList = props.movies.length ? props.movies.map(movie => (
             <Col sm="6" md="4" lg="3" xs="12">
                <Card key={movie.movie_id}> 
                            <img width="100%" height="200px" src={movie.platforms[0].image_url} alt={movie.movie_name} />
                        <CardBody>
                            <CardText className="text-truncate">{movie.movie_name}</CardText>
                            {
                                movie.platforms.map(platform => (
                                    platform.platform_name.toUpperCase()==="PRIME_VIDEO"?(
                                    <UID>{ id => (
                                        <React.Fragment>
                                            <CardLink id={platform.platform_name+"_"+id} className="text-truncate" href={platform.play_url} target="_blank">PRIME</CardLink>
                                            <UncontrolledTooltip placement="bottom" target={platform.platform_name+"_"+id}>
                                                        {platform.is_paid?"Paid":"Free"}
                                            </UncontrolledTooltip>
                                        </React.Fragment>
                                    )
                                    }
                                    </UID>
                                    ):
                                    (
                                        <UID>{ id => (
                                        <React.Fragment>
                                            <CardLink id={platform.platform_name+"_"+id} className="text-truncate" href={platform.play_url} target="_blank">{platform.platform_name.toUpperCase()}</CardLink>
                                            <UncontrolledTooltip placement="bottom" target={platform.platform_name+"_"+id}>
                                                {platform.is_paid?"Paid":"Free"}
                                            </UncontrolledTooltip>
                                        </React.Fragment>
                                    )
                                    }
                                        </UID>
                                    )
                                     
                                        
                                     
                                )

                                )
                            } 
                        </CardBody>
                </Card>
            </Col>

    )) : props.searchSuccess?<p className="center"></p>:<Col><p className="center" style={{'font-size': 'x-large'}}>Houston, we have a problem. Please search again.</p></Col>

    return (
        <Container>
            <Row>
                {moviesList}
            </Row>  
        </Container>
    )

}

export default Movies;