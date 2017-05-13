import React, { Component } from 'react';
import { Col, Row, Image, Table, Panel, Media, PageHeader, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

export default class AddUsers extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <Col xs={12}>
                <PageHeader>
                    <div>Add Users</div>
                </PageHeader>
            </Col>
        );
    }
}



AddUsers.propTypes = {
    orgId: PropTypes.string.isRequired,
}
