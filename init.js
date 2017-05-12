import * as firebase from 'firebase';
import _ from 'lodash';
import data from './database';

import config from './config';
var fconfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.projectId,
    messagingSenderId: config.messagingSenderId
};

firebase.initializeApp(fconfig);
firebase.auth().signInAnonymously().catch(function (error) {
    console.log(error)
});
let database = firebase.database();
console.log(data);


let writeUserData = () => {
    _.forEach(data.users, (user, id) => {
        database.ref('users/' + id)
            .set(user)
            .then(() => {
                console.log("Success!", id);
            })
            .catch(err => {
                console.log(err);
            });
    })
}

let writeOrganizationData = () => {
    _.forEach(data.organizations, (organization, id) => {
        database.ref('organizations/' + id)
            .set(organization)
            .then(() => {
                console.log("Success!", id);
            })
            .catch(err => {
                console.log(err);
            });
    })
}

let writeEventData = () => {
    _.forEach(data.events, (event, id) => {
        database.ref('events/' + id)
            .set(event)
            .then(() => {
                console.log("Success!", id);
            })
            .catch(err => {
                console.log(err);
            });
    })
}

writeUserData();
writeEventData();
writeOrganizationData();

