import React, { Component } from 'react';
import './styles/App.css';
import { Col, Grid, Row } from 'react-bootstrap';
import Header from "./components/Navbar";
import OrganizationInfo from "./Organization";

class App extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>
        <Header />
        <Grid fluid={true}>
          {children}
          <OrganizationInfo id="juven" />
        </Grid>
      </div>
    );

  }
}

export default App;
