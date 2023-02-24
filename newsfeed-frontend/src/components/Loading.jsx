import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ variant = 'light' }) => {
    return (
        <h1 className={`display-4 text-${variant}`}>
            Loading
            <br />
            {[...Array(3)].map((elem, index) => (
                <span key={index}>
                    <Spinner animation="grow" variant={variant} size="sm" />
                    &nbsp;
                </span>
            ))}
        </h1>
    );
};

export default Loading;
