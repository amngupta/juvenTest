import React, { Component } from 'react';
import './App.css';
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
          <Row>
            <div className="App">
              <Col xs={12}>
                {children}
                <OrganizationInfo id="juven" />
              </Col>
            </div>
          </Row>
        </Grid>
      </div>
    );

  }
}

export default App;
