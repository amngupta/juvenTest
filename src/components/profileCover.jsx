import React, { Component } from 'react';
import { Col, Image, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default class ProfileCover extends Component {

    render() {
        const coverImage = this.props.organization.cover_image_url;
        const profileImage = this.props.organization.profile_image_url;
        let styles = {
            backgroundImage: `url(${coverImage})`
        };
        return (
            <Col xs={12} >
                <Panel style={styles} className="profilePanel" >
                    <div className="profileImage">
                        <Image src={profileImage} />
                    </div>
                    <h2 className="profileName">{this.props.organization.name}</h2>
                    <div>
                        Founded in  <Moment unix format="MMM YYYY">{this.props.organization.created_at}</Moment>
                        <br />
                        {this.props.organization.location}
                    </div>
                </Panel>
            </Col >
        );
    }
}



ProfileCover.propTypes = {
    organization: PropTypes.object.isRequired,
}
