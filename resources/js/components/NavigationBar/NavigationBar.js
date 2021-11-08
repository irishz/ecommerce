import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import {
    BsFillPersonFill,
    BsFillBagFill,
    BsFillGearFill,
} from "react-icons/bs";
import { IoLogOutSharp } from "react-icons/io5";

function NavigationBar(props) {
    const [redirect, setredirect] = useState(false);
    const [cartCount, setcartCount] = useState(0);

    const userId = useContext(AuthContext);

    useEffect(async () => {
        await axios.get("/api/getcart").then((res) => {
            // console.log(res.data.length);
            setcartCount(res.data.length);
        });
    }, [userId]);

    async function onLogout() {
        await axios.post("/api/logout");

        props.setuserName("");
        setredirect(true);
    }

    if (redirect) {
        <Redirect to="login" />;
    }

    return (
        <Navbar
            bg="primary"
            variant="dark"
            className="mb-5"
            collapseOnSelect
            expand="lg"
        >
            <Container>
                <Navbar.Brand href="/shop">IIT E-Commerce</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/shop">Home</Nav.Link>
                        <Nav.Link href="/shop/product">Product</Nav.Link>
                    </Nav>
                    {props.username ? (
                        <Nav>
                            <Nav.Link href="/shop/cart">
                                Cart{" "}
                                {cartCount > 0 ? (
                                    <Badge bg="danger">{cartCount}</Badge>
                                ) : null}
                            </Nav.Link>
                            <NavDropdown
                                title={props.username}
                                className="mr-auto"
                                align="end"
                            >
                                <NavDropdown.Item href="/shop/profile">
                                    <BsFillPersonFill />
                                    <label>Profile</label>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/shop/order">
                                    <BsFillBagFill />
                                    <label>My Order</label>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#shop/setting">
                                    <BsFillGearFill /> <label>Setting</label>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => onLogout()}>
                                    <IoLogOutSharp size={16} color="#dc3545" />{" "}
                                    <label style={{ color: "#dc3545" }}>
                                        Logout
                                    </label>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className="mr-auto">
                            <Nav.Link href="/shop/login">Login</Nav.Link>
                            {/* <Nav.Link href="/shop/register">Register</Nav.Link> */}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
