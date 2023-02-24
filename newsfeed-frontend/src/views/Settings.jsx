import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
    Spinner,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Navigation/Header";
import { useStateContext } from "../context/ContextProvider";
import useInputCheckbox from "../Hooks/useInputCheckbox";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";

const Settings = () => {
    const { token } = useStateContext();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState([]);

    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    // Get settings options
    useEffect(() => {
        getResource("/getSources", setSources);
        getResource("/getCategories", setCategories);
        getResource("/getSettings", setSettings);
    }, []);

    // Set settings options
    useEffect(() => {
        if (settings.sources) setSourcesValues(settings.sources);
        if (settings.categories) setCategoriesValues(settings.categories);
    }, [settings]);

    // Finish loading
    useEffect(() => {
        if (sources.length > 0 && categories.length > 0) setLoading(false);
    }, [sources, categories]);

    // Get resource from API
    const getResource = async (endpoint, setResource) => {
        const resource = await axiosClient
            .get(endpoint)
            .catch((err) => setError(true));
        if (resource && resource.data) setResource(resource.data);
    };

    // Settings input handlers
    const {
        value: checkedSources,
        setInputValue: setSourcesValues,
        valueChangeHandler: onSourceChange,
    } = useInputCheckbox();
    const {
        value: checkedCategories,
        setInputValue: setCategoriesValues,
        valueChangeHandler: onCategoryChange,
    } = useInputCheckbox();

    // Form submit handler
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setError(false);
        setLoading(true);

        const payload = {
            sources: checkedSources,
            categories: checkedCategories,
        };

        const response = await axiosClient
            .post("/saveSettings", payload)
            .catch((err) => setError(true));

        setLoading(false);
        if (response && response.data) {
            setSaved(true);
        } else {
            setError(true);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Row className="py-5">
                    <Col sm={12} md={{ span: 10, offset: 1 }}>
                        <Card bg="light" text="dark">
                            <Card.Body>
                                <Card.Title className="text-center display-6">
                                    Settings
                                    <p className="lead text-black-50 pt-3 pb-1">
                                        Personalize your newsfeed!
                                    </p>
                                </Card.Title>

                                <hr className="my-4" />

                                {saved && (
                                    <Row className="pb-5">
                                        <Col
                                            sm={{ span: 10, offset: 1 }}
                                            className="text-center shadow-lg border py-5"
                                        >
                                            <h1 className="display-6 mb-3">
                                                Changes saved successfully!
                                            </h1>
                                            <Link to={"/newsfeed"}>
                                                <Button variant="success">
                                                    Go back to your newsfeed
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                )}

                                {/* LOADING */}
                                {!saved && loading && (
                                    <Row>
                                        <Col className="text-center py-5">
                                            <Loading variant="dark" />
                                        </Col>
                                    </Row>
                                )}

                                {/* SETTINGS FORM */}
                                {!saved && !loading && (
                                    <Row>
                                        <Col xs={{ span: 10, offset: 1 }}>
                                            <Form onSubmit={onSubmitHandler}>
                                                {/* CATEGORIES */}
                                                <FormGroup className="pb-4">
                                                    <p className="lead text-black-50 mb-2">
                                                        Categories
                                                    </p>
                                                    <Row>
                                                        {categories.map(
                                                            (category, i) => {
                                                                const categoryName =
                                                                    category.name
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                    category.name.slice(
                                                                        1
                                                                    );
                                                                return (
                                                                    <Col
                                                                        key={i}
                                                                        sm={12}
                                                                        md={6}
                                                                        lg={4}
                                                                    >
                                                                        <FormCheck
                                                                            key={
                                                                                category.id
                                                                            }
                                                                            id={`category_${category.id}`}
                                                                            style={{
                                                                                userSelect:
                                                                                    "none",
                                                                            }}
                                                                            type="checkbox"
                                                                            onClick={
                                                                                onCategoryChange
                                                                            }
                                                                            value={
                                                                                category.id
                                                                            }
                                                                            defaultChecked={
                                                                                settings.categories &&
                                                                                settings.categories.includes(
                                                                                    category.id
                                                                                )
                                                                            }
                                                                            label={
                                                                                categoryName
                                                                            }
                                                                        />
                                                                    </Col>
                                                                );
                                                            }
                                                        )}
                                                    </Row>
                                                </FormGroup>

                                                {/* SOURCES */}
                                                <FormGroup className="pb-4">
                                                    <p className="lead text-black-50 mb-2">
                                                        Sources
                                                    </p>
                                                    <Row>
                                                        {sources.map(
                                                            (source, i) => (
                                                                <Col
                                                                    key={i}
                                                                    sm={12}
                                                                    md={6}
                                                                    lg={4}
                                                                >
                                                                    <FormCheck
                                                                        key={
                                                                            source.id
                                                                        }
                                                                        id={`source_${source.id}`}
                                                                        style={{
                                                                            userSelect:
                                                                                "none",
                                                                        }}
                                                                        type="checkbox"
                                                                        onClick={
                                                                            onSourceChange
                                                                        }
                                                                        value={
                                                                            source.id
                                                                        }
                                                                        defaultChecked={
                                                                            settings.sources &&
                                                                            settings.sources.includes(
                                                                                source.id
                                                                            )
                                                                        }
                                                                        label={
                                                                            source.name
                                                                        }
                                                                    />
                                                                </Col>
                                                            )
                                                        )}
                                                    </Row>
                                                </FormGroup>

                                                {/* SUBMIT */}
                                                <div className="d-grid gap-2 pb-4">
                                                    <Button
                                                        variant="success"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Col>
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Settings;
