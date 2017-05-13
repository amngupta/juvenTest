import React, { Component } from 'react';
import { Col, Row, Button, Panel, Media, PageHeader, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import _ from 'lodash';

export default class AddUsers extends Component {

    constructor() {
        super();
        this.renderOptions = this.renderOptions.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.removeGuests = this.removeGuests.bind(this);
        this.addGuest = this.addGuest.bind(this);
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
                    self.setState({
                        events: eventObjs
                    });
                }
            });

        database.ref('users')
            .orderByChild("organizations/" + orgId)
            .equalTo(true)
            .on("value", function (snapshot) {
                // console.log("Users", snapshot.val());
                let orgUsers = snapshot.val();
                if (orgUsers) {
                    self.setState({
                        orgUsers: orgUsers
                    });
                }
            });
    }

    renderOptions(obj, i) {
        let info = this.state.events[obj];
        // console.log(obj);
        return <option value={obj} key={i}>{info.name}</option>;
    }

    renderUsers(obj, i) {
        let info = this.state.orgUsers[obj];
        return <option value={obj} key={i}>{info.name}</option>;
    }

    removeGuests() {
        let eventId = this.eventSelect.value;
        let eventData = this.state.events[eventId];
        let existingGuests = Object.keys(eventData.users);
        let companyUsers = this.state.orgUsers;
        let notInvited = _.omit(companyUsers, existingGuests)
        this.setState({
            usersNotInvited: notInvited
        })
    }

    addGuest() {
        let eventId = this.eventSelect.value;
        let guestId = this.guestId.value;
        if (eventId && guestId) {
            console.log(eventId, guestId);
            let event = this.state.events[eventId];
            event.users[guestId] = true;
            let database = firebase.database();
            let orgId = this.props.orgId;
            let self = this;
            // console.log(event);
            database.ref('events/' + eventId)
                .update(event)
        }
        else {
            console.error("Select options from dropdown first");
        }

    }

    render() {
        if (this.state) {
            return (
                <Col xs={12}>
                    <PageHeader>
                        <div>Add Users</div>
                    </PageHeader>
                    <Row>
                        <Col xs={12} md={5}>
                            <FormGroup>
                                <Col xs={4} className="text-right">
                                    <ControlLabel>Event</ControlLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormControl componentClass="select" placeholder="select" onChange={() => this.removeGuests()} inputRef={ref => this.eventSelect = ref} >
                                        <option></option>
                                        {
                                            this.state.events && Object.keys(this.state.events).map((object, i) =>
                                                this.renderOptions(object, i)
                                            )
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={5}>
                            <FormGroup>
                                <Col xs={4} className="text-right">
                                    <ControlLabel>Add Guest</ControlLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormControl componentClass="select" inputRef={ref => this.guestId = ref} placeholder="select">
                                        <option></option>
                                        {
                                            this.state.usersNotInvited && Object.keys(this.state.usersNotInvited).map((object, i) =>
                                                this.renderUsers(object, i)
                                            )
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={2} className="text-right">
                            <Button type="submit" onClick={this.addGuest} >Add</Button>
                        </Col>
                    </Row>

                </Col>
            );
        }
        return null;
    }
}



AddUsers.propTypes = {
    orgId: PropTypes.string.isRequired,
}
