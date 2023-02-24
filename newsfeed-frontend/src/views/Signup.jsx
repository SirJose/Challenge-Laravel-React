import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

import useInput from "../Hooks/useInput";
import { useStateContext } from "../context/ContextProvider";

import {
    Alert,
    Button,
    Card,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function Signup() {
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    // NAME INPUT
    const nameValidation = (value) => value.trim() !== "";
    const {
        value: name,
        isValid: nameIsValid,
        isTouched: nameIsTouched,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
    } = useInput(nameValidation);

    // EMAIL INPUT
    const emailValidation = (value) => {
        const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRE.test(value);
    };
    const {
        value: email,
        isValid: emailIsValid,
        isTouched: emailIsTouched,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(emailValidation);

    // PASSWORD INPUT
    const passwordValidation = (value) =>
        value.trim() !== "" && value.length >= 6;
    const {
        value: password,
        isValid: passwordIsValid,
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(passwordValidation);

    // CONFIRM PASSWORD INPUT
    const {
        value: confirmPassword,
        isTouched: confirmPasswordIsTouched,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
    } = useInput(passwordValidation);
    const confirmPasswordIsValid =
        confirmPassword.trim() !== "" && password === confirmPassword;

    // CHECK IF FORM IS VALID
    const formIsValid =
        nameIsValid &&
        emailIsValid &&
        passwordIsValid &&
        confirmPasswordIsValid;

    // FORM SUBMIT HANDLER
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setErrors(null);

        nameBlurHandler();
        emailBlurHandler();
        passwordBlurHandler();
        confirmPasswordBlurHandler();

        if (!formIsValid) return;

        const payload = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="py-5">
            <Card bg="light" text="dark">
                <Card.Body>
                    <Card.Title className="text-center display-6">
                        Signup
                    </Card.Title>

                    {/* ERROR ALERTS */}
                    {errors &&
                        Object.keys(errors).map((key) => (
                            <Alert
                                key={key}
                                variant="danger"
                                style={{ userSelect: "none" }}
                            >
                                {errors[key][0]}
                            </Alert>
                        ))}

                    <Form noValidate onSubmit={onSubmitHandler}>
                        {/* NAME */}
                        <FormGroup className="mb-3">
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="name"
                                value={name}
                                onChange={nameChangeHandler}
                                onBlur={nameBlurHandler}
                                className={`${
                                    !nameIsTouched
                                        ? ""
                                        : nameIsValid
                                        ? "is-valid"
                                        : "is-invalid"
                                }`}
                            />
                        </FormGroup>

                        {/* EMAIL */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                                className={`${
                                    !emailIsTouched
                                        ? ""
                                        : emailIsValid
                                        ? "is-valid"
                                        : "is-invalid"
                                }`}
                            />
                        </Form.Group>

                        {/* PASSWORD */}
                        <FormGroup className="mb-1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                                className={`${
                                    !passwordIsTouched
                                        ? ""
                                        : passwordIsValid
                                        ? "is-valid"
                                        : "is-invalid"
                                }`}
                            />
                        </FormGroup>

                        {/* CONFIRM PASSWORD */}
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password confirmation"
                                value={confirmPassword}
                                onChange={confirmPasswordChangeHandler}
                                onBlur={confirmPasswordBlurHandler}
                                className={`${
                                    !confirmPasswordIsTouched
                                        ? ""
                                        : confirmPasswordIsValid
                                        ? "is-valid"
                                        : "is-invalid"
                                }`}
                            />
                        </FormGroup>

                        {/* SUBMIT */}
                        <div className="d-grid gap-2 pb-3">
                            <Button variant="success" type="submit">
                                Signup
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center py-3">
                    Already have an account? <br />
                    <Link to="/login">
                        <Button variant="primary">Login</Button>
                    </Link>
                </Card.Footer>
            </Card>
        </div>
    );
}
