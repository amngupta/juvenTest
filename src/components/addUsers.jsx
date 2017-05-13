import React, { Component } from 'react';
import { Col, Row, Image, Table, Panel, Media, PageHeader, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import _ from 'lodash';

export default class AddUsers extends Component {

    constructor() {
        super();
        this.state = { orgUsers: [], eventGuests: [] }
        this.renderOptions = this.renderOptions.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentWillMount() {
        let database = firebase.database();
        let orgId = this.props.orgId;
        let self = this;
        database.ref('events')
            .orderByChild("organization")
            .equalTo(orgId)
            .on("value", function (snapshot) {
                let eventObjs = snapshot.val();
                if (eventObjs) {
                    let eventArray = Object.values(eventObjs);
                    self.setState({
                        events: eventArray
                    });
                }
            });

        database.ref('users')
            .orderByChild("organizations/" + orgId)
            .equalTo(true)
            .on("value", function (snapshot) {
                console.log(snapshot);
                console.log("Users", snapshot.val());
                let orgUsers = snapshot.val();
                if (orgUsers) {
                    self.setState({
                        orgUsers: orgUsers
                    });
                }
            });
    }

    renderOptions(obj, i) {
        // console.log(obj);
        return <option value="select" key={i}>{obj.name}</option>;
    }

    renderUsers(obj, i) {
        return <option value="select" key={i}>{obj.name}</option>;
    }

    render() {
        if (this.state) {
            return (
                <Col xs={12}>
                    <PageHeader>
                        <div>Add Users</div>
                    </PageHeader>
                    <FormGroup>
                        <Col xs={4} md={2}>
                            <ControlLabel>Event</ControlLabel>
                        </Col>
                        <Col xs={8} md={4}>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="select"></option>
                                {
                                    this.state.events && this.state.events.map((object, i) =>
                                        this.renderOptions(object, i)
                                    )
                                }
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={4} md={2}>
                            <ControlLabel>Add Guest</ControlLabel>
                        </Col>
                        <Col xs={8} md={4}>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="select"></option>
                                {
                                    this.state.orgUsers.length > 0 && this.state.events.map((object, i) =>
                                        this.renderUsers(object, i)
                                    )
                                }
                            </FormControl>
                        </Col>
                    </FormGroup>
                </Col>
            );
        }
        return null;
    }
}



AddUsers.propTypes = {
    orgId: PropTypes.string.isRequired,
}
