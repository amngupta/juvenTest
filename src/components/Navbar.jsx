import React, { Component } from 'react';
import {Nav, Navbar, NavItem } from 'react-bootstrap';

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
            </Navbar>
        );
    }
}
