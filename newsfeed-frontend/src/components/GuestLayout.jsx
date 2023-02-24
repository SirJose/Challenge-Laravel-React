import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStateContext } from "../context/ContextProvider";

import { Col, Container, Row } from "react-bootstrap";
import Header from "./Navigation/Header";

export default function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col sm={12} md={{ span: 4, offset: 4 }}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
