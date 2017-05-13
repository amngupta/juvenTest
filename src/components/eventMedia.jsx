import React, { Component } from 'react';
import { Col,  Media, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ModalOpen from './Modal';
import EventUser from './eventUser';


export default class EventMedia extends Component {
    render() {
        const mediaBody = (
            <Media onClick={this.openModal}>
                <Media.Left>
                    <img width={64} height={64} src={this.props.info.image_url} alt="" />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>{this.props.info.name}</Media.Heading>
                    <p><Moment unix format="DD MMM YY">{this.props.info.date}</Moment></p>
                    <p>{this.props.info.location}</p>
                    <p>{this.props.info.price}</p>
                </Media.Body>
            </Media>
        )

        const modalBody = (
            <ListGroup>
                {Object.keys(this.props.info.users).map((object, i) => {
                    return <EventUser userId={object} key={i} />
                })}
            </ListGroup>
        )

        const modalHeader = "Guests"; 
        return (
            <Col xs={12}>
                <ModalOpen eventListener={mediaBody} modalHeader={modalHeader} modalBody={modalBody} />
            </Col>
        )
    }
}



EventMedia.propTypes = {
    info: PropTypes.object.isRequired,
}
