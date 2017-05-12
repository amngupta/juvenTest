import * as firebase from 'firebase';
import _ from 'lodash';
import data from './database';

var config = {
    apiKey: "AIzaSyBmIWoOElN3nIJMyUGf5lQ890h3vllS-4M",
    authDomain: "juven-frontend.firebaseapp.com",
    databaseURL: "https://juven-frontend.firebaseio.com",
    projectId: "juven-frontend",
    storageBucket: "juven-frontend.appspot.com",
    messagingSenderId: "297658297174"
};

firebase.initializeApp(config);
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
                console.log("Success!");
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
                console.log("Success!");
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
                console.log("Success!");
            })
            .catch(err => {
                console.log(err);
            });
    })
}

writeUserData();
writeEventData();
writeOrganizationData();

