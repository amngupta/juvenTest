import React, { Component } from 'react';
import Header from "./components/Navbar";
import OrganizationInfo from "./Organization";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <OrganizationInfo id="juven" />
      </div>
    );

  }
}

export default App;
