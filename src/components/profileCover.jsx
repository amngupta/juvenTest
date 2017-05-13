import React, { Component } from 'react';
import { Col, Image, Panel, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default class ProfileCover extends Component {

    componentWillMount() {

    }

    render() {
        console.log(this.props);
        const title = (
            <div>
                <Image src="http://www.designingtips.com/wp-content/uploads/2012/07/facebook-timeline-cover-photo-1.jpg" />
                <PageHeader>                        {this.props.organization.name}
                </PageHeader>
            </div>
        )
        return (
            <Col xs={12} >
                <Panel header={title} >
                    <Image src="https://maxcdn.icons8.com/Color/PNG/24/Cinema/anonymous_mask-24.png" circle />
                    <div>
                        Founded in  <Moment format="MMM YYYY">{this.props.organization.created_at}</Moment>
                        <br />
                        {this.props.organization.location}
                    </div>
                </Panel>
            </Col>
        );
    }
}



ProfileCover.propTypes = {
    organization: PropTypes.object.isRequired,
}
