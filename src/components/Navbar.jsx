import React, { Component } from 'react';
import '../App.css';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        juven
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Link Right</NavItem>
                        <NavItem eventKey={2} href="#">Link Right</NavItem>
                        <NavItem eventKey={3} href="#">Link Right</NavItem>
                        <NavItem eventKey={4} href="#">Link Right</NavItem>
                        <NavItem eventKey={5} href="#">Link Right</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
