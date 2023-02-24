import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStateContext } from "../context/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Navigation/Header";
import NewsFilters from "./NewsFilters";

export default function Layout() {
    const { token } = useStateContext();

    return (
        <>
            <Header />
            <Container fluid>
                {/* FILTERS */}
                <NewsFilters />

                {/* NEWSFEED */}
                <Row>
                    <Col sm={12} lg={{ span: 10, offset: 1 }}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
