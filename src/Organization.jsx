import React, { Component } from 'react';
import ProfileCover from './components/profileCover';
import EventsCover from './components/eventsCover';
import AddUsers from './components/addUsers';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-bootstrap';

export default class OrganizationInfo extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.state, nextState)
        return (this.props.id !== nextProps.id);
    }


    componentWillUpdate() {
        console.log("Updated")
        this.getData(this.props.id);
    }

    getData(orgId) {
        let database = firebase.database();
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
