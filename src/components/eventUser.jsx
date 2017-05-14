import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

export default class EventMedia extends Component {
    
    
    componentWillMount() {
        let database = firebase.database();
        let userId = this.props.userId;
        let self = this;
        if (this.props.userId) {
            database.ref("users/" + userId)
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
            return (<tr>
                <td><Image src={this.state.userInfo.image_url} responsive /></td>
                <td>{this.state.userInfo.name}</td>
                <td>{this.state.userInfo.email}</td>
            </tr>);
        }
        return null;
    }
}



EventMedia.propTypes = {
    userId: PropTypes.string.isRequired,
}