import React, { useState } from "react";
import { Alert, Button, Card, Form, FormGroup } from "react-bootstrap";
import useInput from "../Hooks/useInput";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Login() {

    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

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
    const passwordValidation = (value) => value.trim() !== "";
    const {
        value: password,
        isValid: passwordIsValid,
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(passwordValidation);

    const formIsValid = emailIsValid && passwordIsValid;

    // FORM SUBMIT HANDLER
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setErrors(null);

        emailBlurHandler();
        passwordBlurHandler();

        if (!formIsValid) return;

        const payload = {
            email,
            password,
        };

        axiosClient
            .post("/login", payload)
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
                        Login
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

                    <Form onSubmit={onSubmitHandler}>
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
                        <FormGroup className="mb-3">
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

                        {/* SUBMIT */}
                        <div className="d-grid gap-2 pb-3">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center py-3">
                    Don't have an account?
                    <br />
                    <Link to="/signup">
                        <Button variant="success">Create account</Button>
                    </Link>
                </Card.Footer>
            </Card>
        </div>
    );
}
