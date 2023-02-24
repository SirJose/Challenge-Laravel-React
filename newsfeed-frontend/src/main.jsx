import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import { ContextProvider } from "./context/ContextProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Col, Container, Row, ThemeProvider } from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        >
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);
