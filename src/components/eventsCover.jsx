import React, { Component } from 'react';
import { Col, Row, Image, Table, Panel, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import * as firebase from 'firebase';
import EventMedia from './eventMedia';
import Switch from 'react-bootstrap-switch';
import '../styles/react-bootstrap-switch.css'
import _ from 'lodash'


export default class EventsCover extends Component {

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
                    eventArray = _.sortBy(eventArray, ['name']);
                    self.setState({
                        events: eventArray
                    });
                }
            });

    }

    handleSwitch(elem, state) {
        let database = firebase.database();
        let orgId = this.props.orgId;
        let {events} = this.state;
        if (state) {
            events = _.sortBy(events, ['name']);
            this.setState({
                events: events
            });
        }
        else {
            events = _.sortBy(events, ['date']);
            this.setState({
                events: events
            });
        }

    }

    render() {
        let events = null;
        if (this.state) {
            events = (
                <Col xs={12}>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                <div className="pull-left">Events</div>
                                <div className="pull-right">
                                    <Switch onChange={(el, state) => this.handleSwitch(el, state)} name='test' onText="Name" offText="Date" />
                                </div>
                            </PageHeader>
                        </Col>
                        <Col xs={12}>
                            {
                                this.state.events && this.state.events.map((object, i) => {
                                    return <EventMedia info={object} key={i} />
                                })
                            }
                        </Col>
                    </Row>
                </Col>
            )
        }
        return events;
    }
}



EventsCover.propTypes = {
    orgId: PropTypes.string.isRequired,
}
