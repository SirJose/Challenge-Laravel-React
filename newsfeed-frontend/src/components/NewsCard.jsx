import React, { useEffect, useState } from "react";

import { Badge, Card, Col, Row } from "react-bootstrap";

const categoryColors = {
    Business: "secondary",
    Entertainment: "danger",
    General: "primary",
    Health: "info",
    Science: "success",
    Sports: "warning",
    Technology: "dark",
};

const NewsCard = ({ article }) => {
    const [imageError, setImageError] = useState(false);

    const imageErrorHanlder = () => {
        setImageError(true);
    };

    // CLICK ARTICLE HANDLER
    const clickArticleHandler = (event) => {
        window.open(article.url, "_blank").focus();
    };

    return (
        <Col sm={12} md={6} lg={4} className="mb-2 px-1">
            <Card
                className="shadow h-100"
                onClick={clickArticleHandler}
                bg="light"
                text="dark"
                style={{ userSelect: "none", cursor: "pointer" }}
            >
                {article.image && !imageError && (
                    <Card.Img
                        variant="top"
                        src={article.image || "fallback.png"}
                        alt={article.title}
                        onError={imageErrorHanlder}
                    />
                )}
                <Card.Body className="mx-4 my-4 d-flex align-items-center">
                    <Row>
                        <Col sm={12}>
                            {/* TITLE */}
                            <Card.Title className="mb-0">
                                <h1
                                    className="display-6"
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    {article.title}
                                </h1>
                            </Card.Title>

                            {/* DATE / CATEGORY */}
                            <div className="text-black-50 fst-italic mb-3">
                                {article.date}
                                <br />
                                <Badge
                                    pill
                                    bg={categoryColors[article.category]}
                                    className="shadow-sm"
                                >
                                    {article.category}
                                </Badge>
                            </div>
                        </Col>
                        <Col sm={12}>
                            {/* DESCRIPTION */}
                            <Card.Text className="text-black-50 fw-light">
                                {article.text}
                            </Card.Text>

                            {/* AUTHOR / SOURCE */}
                            <blockquote className="blockquote mb-0">
                                {article.author && (
                                    <footer className="blockquote-footer">
                                        {article.author}
                                    </footer>
                                )}
                            </blockquote>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <blockquote className="blockquote mb-1">
                        <p>{article.source_name}</p>
                    </blockquote>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default NewsCard;
