import React, { useEffect, useState } from "react";
import { Card, Col, Container, FormCheck, Row, Spinner } from "react-bootstrap";
import axiosClient from "../axios-client";
import NewsCard from "../components/NewsCard";
import { useStateContext } from "../context/ContextProvider";
import NewsFilters from "../components/NewsFilters";
import Loading from "../components/Loading";
import useInputCheckbox from "../Hooks/useInputCheckbox";

export default function Newsfeed() {
    const { token, searchQuery, setSearchQuery, date, filterCategory, setFilterCategory, filterSource, setFilterSource } =
        useStateContext();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState("Top headlines");

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const [checkedAuthors, setCheckedAuthors] = useState([]);
    const onAuthorChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedAuthors((prev) => [...prev, value]);
        } else {
            setCheckedAuthors((prev) => [
                ...prev.filter((val) => val !== value),
            ]);
        }
    };

    const newsEndpoint = token ? "/newsfeed" : "/news";

    // DEFAULT NEWSFEED
    useEffect(() => {
        setLoading(true);
        setSearchQuery('');
        setFilterCategory('');
        setFilterSource('');
        getNews();
    }, []);

    useEffect(() => {
        if (news.length > 0) setLoading(false);
    }, [news]);

    const getNews = async () => {
        const newsRequest = await axiosClient
            .get(newsEndpoint)
            .catch((err) => setError(true));
        if (newsRequest && newsRequest.data) {
            const result = newsRequest.data;
            if(token)
                setTitle("Your newsfeed");
            setSelectedSources(result.sources);
            setSelectedCategories(result.categories);
            setSelectedAuthors(result.authors);
            setNews(result.articles);
        }
    };


    // SEARCH RESULT NEWSFEED
    useEffect(() => {

        if(searchQuery !== ""){
            setLoading(true);
            searchNews();
        }else{
            setLoading(true);
            setSearchQuery('');
            setFilterCategory('');
            setFilterSource('');
            getNews();
        }

    }, [searchQuery, date]);

    const searchNews = async () => {
        if (!searchQuery || searchQuery.trim() === "") return;

        setError(false);
        setLoading(true);

        const newsRequest = await axiosClient
            .post("/search", { query: searchQuery, from: date[0], to: date[1] })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(false);
                    setSearchQuery(null);
                    setLoading(false);
                }
                setError(true);
            });
        if (newsRequest && newsRequest.data) {
            setLoading(false);
            setNews(newsRequest.data.articles);
            setTitle(`Search results for: ${searchQuery}`);
        }
    };

    return (
        <Container>
            {/* ERROR */}
            {error && (
                <Row>
                    <Col className="text-center py-5">
                        <h1 className="display-4">
                            <span className="text-danger">Oops</span>, something
                            went wrong!
                            <br />
                        </h1>
                    </Col>
                </Row>
            )}

            {/* LOADING */}
            {!error && loading && (
                <Row>
                    <Col className="text-center py-5">
                        <Loading variant="light" />
                    </Col>
                </Row>
            )}

            {!error && !loading && (
                <Row className="pt-4">
                    {/* PAGE TITLE */}
                    <h1 className="display-5 text-dark-50 mt-2">{title}</h1>
                    <hr className="mb-4" />

                    {token && !searchQuery && <Col sm={12} className="mb-3">
                        <Row>
                            {/* SELECTED CATEGORIES */}
                            <Col sm={12} md={6} lg={3}>
                                <div className="blockquote mb-1">
                                    Categories:
                                </div>
                                <ul className="fw-light">
                                    {selectedCategories.length === 0 && (
                                        <li>All</li>
                                    )}
                                    {selectedCategories.map((category, i) => (
                                        <li key={`selectedcategory_${i}`}>
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </Col>

                            {/* SELECTED SOURCES */}
                            <Col sm={12} md={6} lg={3}>
                                <div className="blockquote mb-1">Sources:</div>
                                <ul className="fw-light">
                                    {selectedSources.length === 0 && (
                                        <li>All</li>
                                    )}
                                    {selectedSources.map((source, i) => (
                                        <li key={`selectedsource_${i}`}>
                                            {source}
                                        </li>
                                    ))}
                                </ul>
                            </Col>

                            {/* SELECTED AUTHORS */}
                            <Col sm={12} md={6} lg={3}>
                                <div className="blockquote mb-1">Authors:</div>
                                <div className="fw-light fs-italic">
                                    {selectedAuthors.map((author, i) => (
                                        <FormCheck
                                            key={`checkauthor_${i}`}
                                            id={`checkauthor_${i}`}
                                            style={{ userSelect: "none" }}
                                            type="checkbox"
                                            value={author}
                                            onClick={onAuthorChange}
                                            label={author}
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Col>}

                    {/* ARTICLES */}
                    {news
                        .filter((article) => {
                            // Filter by selected author
                            if (
                                checkedAuthors.length > 0 &&
                                !checkedAuthors.includes(article.author)
                            )
                                return false;

                            // Search filters
                            if( searchQuery ){
                                // Category
                                if( filterCategory && filterCategory !== 'default' && parseInt(filterCategory) !== parseInt(article.category_id))
                                    return false;
                                // Source
                                if( filterSource && filterSource !== 'default' && filterSource !== article.source_id )
                                    return false;
                            }

                            return true;
                        })
                        .map((article, i) => (
                            <NewsCard key={i} article={article} />
                        ))}
                </Row>
            )}
        </Container>
    );
}
