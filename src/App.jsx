import React, { Component } from 'react';
import OrganizationInfo from "./Organization";
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import config from '../config';
import * as firebase from 'firebase';


var fconfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.projectId,
  messagingSenderId: config.messagingSenderId
};

class App extends Component {

  constructor() {
    super();
    this.state = { chosenOrg: "harvard" }
    this.handleOrg = this.handleOrg.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp(fconfig);
    firebase.auth().signInAnonymously()
      .catch(function (error) {
        console.log(error)
      });
    let database = firebase.database();
    let self = this;
    database.ref('organizations')
      .on("value", function (snapshot) {
        let orgObjs = snapshot.val();
        if (orgObjs) {
          self.setState({
            organizations: orgObjs
          });
        }
      });
  }

  handleOrg(eventKey) {
    this.setState({
      chosenOrg: eventKey
    });
  }

  renderMenu(obj, i) {
    let info = this.state.organizations[obj];
    // console.log(obj);
    return <MenuItem eventKey={obj} key={i}>{info.name}</MenuItem>
  }

  render() {
    let {chosenOrg} = this.state;
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              juven
                    </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight onSelect={this.handleOrg}>
              <NavDropdown title="Organizations" id="nav-dropdown">
                {
                  this.state.organizations && Object.keys(this.state.organizations).map((object, i) =>
                    this.renderMenu(object, i)
                  )
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <OrganizationInfo id={chosenOrg} />
      </div>
    );

  }
}

export default App;
