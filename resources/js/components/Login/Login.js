import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";

function Login(props) {
    const [employee_code, setemployeeCode] = useState("");
    const [password, setpassword] = useState("");
    const [redirect, setredirect] = useState(false);
    const [errMessage, seterrMessage] = useState("");

    function onEmployeeCodeChange(e) {
        setemployeeCode(e.target.value);
    }

    function onPasswordChange(e) {
        setpassword(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();

        let data = JSON.stringify({
            employee_code,
            password,
        });

        await axios
            .post("/api/login", data, {
                headers: { "Content-Type": "application/json" },
                // credentials: "include",
                withCredentials: true,
            })
            .then((res) => {
                setredirect(true);
                props.setuserName(res.data.user.first_name);
            })
            .catch((err) => {
                console.log(err.toJSON().message);
                if (
                    (err.toJSON().message =
                        "Request failed with status code 401")
                ) {
                    seterrMessage("Employee code or password invalid!");
                }
            });
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
                                                Employee Code
                                            </Form.Label>
                                            <Form.Control
                                                className="login"
                                                type="text"
                                                placeholder="Enter Employee Code"
                                                onChange={(e) =>
                                                    onEmployeeCodeChange(e)
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
                                            <Form.Text
                                                style={{ color: "tomato" }}
                                            >
                                                {errMessage}
                                            </Form.Text>
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
