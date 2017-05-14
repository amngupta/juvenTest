import React, { Component } from 'react';
import ProfileCover from './components/profileCover';
import EventsCover from './components/eventsCover';
import AddUsers from './components/addUsers';
import * as firebase from 'firebase';
import config from '../config';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-bootstrap';

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
        firebase.initializeApp(fconfig);
        firebase.auth().signInAnonymously()
            .catch(function (error) {
                console.log(error)
            });
        let database = firebase.database();
        let orgId = this.props.id;
        let self = this;
        database.ref('/organizations/' + orgId)
            .once('value')
            .then((snapshot) => {
                // this.setState(snapshot);
                let orgVals = snapshot.val();
                if (orgVals) {
                    self.setState({
                        organization: orgVals
                    });
                }
            });
    }

    render() {
        if (this.state) {
            return (
                <Grid>
                    <Row>
                        <ProfileCover organization={this.state.organization} />
                        <EventsCover orgId={this.props.id} />
                        <AddUsers orgId={this.props.id} />
                    </Row>
                    <br />
                </Grid>
            );
        }
        return null;
    }
}

OrganizationInfo.propTypes = {
    id: PropTypes.string.isRequired
}
