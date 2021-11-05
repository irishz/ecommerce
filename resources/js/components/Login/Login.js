import axios from "axios";
import React, { useState } from "react";
import {
    Form,
    Button,
    FloatingLabel,
    Alert,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";

function Login(props) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [redirect, setredirect] = useState(false);

    function onEmailChange(e) {
        setemail(e.target.value);
    }

    function onPasswordChange(e) {
        setpassword(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();

        let data = JSON.stringify({
            email,
            password,
        });

        await axios
            .post("/api/login", data, {
                headers: { "Content-Type": "application/json" },
                // credentials: "include",
                withCredentials: true,
            })
            .then((res) => {
                props.setuserName(res.data.user.name);
            });

        setredirect(true);
    }

    if (redirect) {
        return <Redirect to="/shop/product" />;
    }

    return (
        <div className="main">
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} lg={10}>
                        <div className="wrap d-md-flex justify-content-center">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h2>IIT E-Commerce</h2>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5">
                                <Row className="d-flex">
                                    <h3>Sign In</h3>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                className="login"
                                                type="email"
                                                placeholder="Enter email"
                                                onChange={(e) =>
                                                    onEmailChange(e)
                                                }
                                                required
                                                autoFocus
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                className="login"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) =>
                                                    onPasswordChange(e)
                                                }
                                                required
                                            />
                                        </Form.Group>
                                        {/* <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                label="Check me out"
                                            />
                                        </Form.Group> */}
                                        <Form.Group className="submit">
                                            <Button
                                                className="btn-login"
                                                type="submit"
                                                onClick={(e) => onSubmit(e)}
                                            >
                                                Sign In
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
