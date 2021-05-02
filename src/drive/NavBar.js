import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom"

export default function NavBarComponent() {
    return (
        <Navbar bg="light" expand="x-lg">
            <Navbar.Brand className="mx-5" as={Link} to="/">
                E-STORE
            </Navbar.Brand>
            <Nav>
                <Nav.Link className="mx-5" as={Link} to="/user">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
