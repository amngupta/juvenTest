import React, { Component } from 'react';
import { Col, Row, Image, Table, Panel, Media, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

export default class EventMedia extends Component {
    componentWillMount() {
        let database = firebase.database();
        let userId = Object.keys(this.props.userId)[0];
        let self = this;
        if (this.props.userId) {
            database.ref('users/' + userId)
                .on("value", function (snapshot) {
                    let userInfo = snapshot.val();
                    if (userInfo) {
                        self.setState({
                            userInfo: userInfo
                        });
                    }
                });
        }

    }

    render() {
        if (this.state && this.state.userInfo) {
            return <ListGroupItem>{this.state.userInfo.name}</ListGroupItem>;
        }
        return null;
    }
}



EventMedia.propTypes = {
    userId: PropTypes.object.isRequired,
}
