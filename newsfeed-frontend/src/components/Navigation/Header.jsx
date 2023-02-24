import React from "react";
import { Link } from "react-router-dom";

import { Form, Button, Nav, Navbar, NavLink, NavbarBrand } from "react-bootstrap";

import useInput from "../../Hooks/useInput";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

const Header = () => {
    const { user, setUser, token, setToken, setSearchQuery, setFilterCategory } = useStateContext();

    // LOGOUT HANDLER
    const logoutHandler = (event) => {
        event.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    // SEARCH INPUT
    const searchValidation = (value) => value.trim() !== "";
    const {
        value: search,
        isValid: searchIsValid,
        valueChangeHandler: searchChangeHandler,
        resetInput: searchReset
    } = useInput(searchValidation);

    // SEARCH HANDLER
    const searchHandler = () => {
        if (!searchIsValid) return;
        setSearchQuery(search);
        // searchReset();
    };

    const homeClickHandler = () => {
        setSearchQuery('');
        setFilterCategory('');
    }

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <NavbarBrand>
                    <Button type="button" onClick={homeClickHandler} variant="outline-dark">Newsfeed</Button>
                </NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!token && (
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        )}
                        {!token && (
                            <Link to="/signup" className="nav-link">
                                Signup
                            </Link>
                        )}
                        {token && (
                            <Link to="/settings" className="nav-link">
                                Settings
                            </Link>
                        )}
                        {token && (
                            <NavLink
                                onClick={logoutHandler}
                                className="nav-link"
                            >
                                Logout
                            </NavLink>
                        )}
                    </Nav>

                    {/* SEARCH BAR */}
                    {token && (
                        <div className="d-flex">
                            <Form.Control
                                type="search"
                                value={search}
                                onChange={searchChangeHandler}
                                placeholder="Search articles..."
                                className="me-2"
                                aria-label="Search articles"
                            />
                            <Button onClick={searchHandler} variant="outline-primary">
                                Search
                            </Button>
                        </div>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
