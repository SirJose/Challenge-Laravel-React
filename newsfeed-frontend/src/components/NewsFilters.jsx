import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    Row,
    Spinner,
} from "react-bootstrap";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";

const NewsFilters = () => {
    const {
        token,
        searchQuery,
        date,
        setDate,
        setFilterCategory,
        setFilterSource,
    } = useStateContext();

    const [loading, setLoading] = useState(true);
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (token) getFilters();
    }, [token]);

    const getFilters = () => {
        getResource("/getSources", setSources);
        getResource("/getCategories", setCategories);
    };

    const getResource = async (endpoint, setResource) => {
        const resourceRequest = await axiosClient
            .get(endpoint)
            .catch((err) => setError(true));
        setLoading(false);
        if (resourceRequest && resourceRequest.data)
            setResource(resourceRequest.data);
    };

    const dateChangeHandler = (event) => {
        const input = event.target;
        const currentDate = [...date];

        if (input.name === "dateFrom") {
            currentDate[0] = input.value;
        } else if (input.name === "dateTo") {
            currentDate[1] = input.value;
        }

        setDate(currentDate);
    };

    const categoryChangeHandler = event => setFilterCategory(event.target.value);
    const sourceChangeHandler = event => setFilterSource(event.target.value);

    return (
        <Row className="filters">
            {!token && (
                <Col sm={{ span: 10, offset: 1 }} className="text-center py-4">
                    <h1 className="display-6 py-4">Welcome!</h1>
                    <p className="lead">
                        Login or signup to customize your newsfeed.
                    </p>
                    <hr />
                    <Link to="/signup">
                        <Button variant="success">Create account</Button>
                    </Link>
                    <br />
                    Or
                    <br />
                    <Link to="/login">
                        <Button variant="primary">Login</Button>
                    </Link>
                </Col>
            )}

            {/* ASK TO SEARCH MESSAGE */}
            {token && !searchQuery && (
                <Col
                    sm={{ span: 10, offset: 1 }}
                    className="text-center  pt-2 pb-3"
                >
                    <blockquote className="blockquote mt-2 mb-3 fw-light">
                        <p>Try searching for more articles at the top!</p>
                    </blockquote>
                    <div style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '-1rem' }}>
                        You can filter the results to your liking
                    </div>
                </Col>
            )}

            {/* SEARCH FILTERS */}
            {token && searchQuery && (
                <Col sm={{ span: 10, offset: 1 }} className="py-4">
                    <h1 className="lead">Filter by:</h1>

                    {loading && (
                        <div className="text-center">
                            <h1 className="lead">Loading filters...</h1>
                            <Spinner animation="border" variant="light" />
                        </div>
                    )}

                    {!loading && (
                        <div>
                            <Row className="mb-3">

                                {/* DATE FILTER */}
                                <Col
                                    sm={12}
                                    md={4}
                                    className="border-end border-secondary border-opacity-50"
                                >
                                    <Row>
                                        <Col>
                                            <FormLabel>From</FormLabel>
                                            <FormControl
                                                type="date"
                                                name="dateFrom"
                                                onChange={dateChangeHandler}
                                            />
                                        </Col>
                                        <Col>
                                            <FormLabel>To</FormLabel>
                                            <FormControl
                                                type="date"
                                                name="dateTo"
                                                onChange={dateChangeHandler}
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                {/* CATEGORY FILTER */}
                                <Col
                                    sm={12}
                                    md={4}
                                    className="border-end border-secondary border-opacity-50"
                                >
                                    <FormLabel>Category</FormLabel>
                                    <FormSelect defaultValue={"default"} onChange={categoryChangeHandler}>
                                        <option value="default">
                                            All categories
                                        </option>
                                        {Array.isArray(categories) &&
                                            categories.map((category, i) => {
                                                const categoryName =
                                                    category.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    category.name.slice(1);
                                                return (
                                                    <option
                                                        key={i}
                                                        value={category.id}
                                                    >
                                                        {categoryName}
                                                    </option>
                                                );
                                            })}
                                    </FormSelect>
                                </Col>

                                {/* SOURCE FILTER */}
                                <Col sm={12} md={4}>
                                    <FormLabel>Source</FormLabel>
                                    <FormSelect
                                        defaultValue={"default"}
                                        onChange={sourceChangeHandler}
                                    >
                                        <option value="default">
                                            All sources
                                        </option>
                                        {Array.isArray(sources) &&
                                            sources.map((source, i) => (
                                                <option
                                                    key={i}
                                                    value={source.source_id}
                                                >
                                                    {source.name}
                                                </option>
                                            ))}
                                    </FormSelect>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Col>
            )}
        </Row>
    );
};

export default NewsFilters;
