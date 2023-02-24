import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container>
            <Row>
                <Col className="text-center py-5">
                    <h1 className="display-1">404 - Not found</h1>
                </Col>
            </Row>
        </Container>
    );
}
