import React, { Component } from 'react';
import ProfileCover from './components/profileCover';
import * as firebase from 'firebase';
import config from '../config';
import PropTypes from 'prop-types';

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
        let database = firebase.database();
        let orgId = this.props.id;
        let self = this;
        database.ref('/organizations/' + orgId)
            .once('value')
            .then((snapshot) => {
                // this.setState(snapshot);
                let orgVals = snapshot.val();
                console.log(orgVals);
                if (orgVals) {
                    self.setState({
                        organization: orgVals
                    });
                }
            });

        database.ref('events').orderByChild("organization").equalTo(orgId)
            .on("child_added", function (snapshot) {
                console.log(snapshot.val());
                let eventObjs = snapshot.val();
                if (eventObjs) {
                    self.setState({
                        events: eventObjs
                    });
                }
            });
    }

    render() {
        return (
            <div>
                {this.state &&
                    <ProfileCover organization={this.state.organization} />
                }
            </div>
        );
    }
}

OrganizationInfo.propTypes = {
    id: PropTypes.string.isRequired
}
