import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProfileCover from './components/profileCover';
import * as firebase from 'firebase';
import config from '../config';
var fconfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.projectId,
    messagingSenderId: config.messagingSenderId
};


export default class OrganizationInfo extends Component {

    componentWillMount() {
        console.log(config);
        firebase.initializeApp(fconfig);

        let database = firebase.database();
        let orgId = this.props.id;
        database.ref('/organizations/' + orgId).once('value').then((snapshot) => {
            // this.setState(snapshot);
            console.log(snapshot.val());
        });
    }

    render() {
        return (
            <ProfileCover />
        );
    }
}

OrganizationInfo.propTypes = {
    id: React.PropTypes.node,
}
