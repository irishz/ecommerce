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

    const userId = useContext(AuthContext);
    const cartContext = useContext(AuthContext);

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
                <Navbar.Brand href="/shop/product">IIT E-Commerce</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {/* <Nav.Link href="/shop">หน้าแรก</Nav.Link> */}
                        <Nav.Link href="/shop/product">สินค้า</Nav.Link>
                    </Nav>
                    {props.username ? (
                        <Nav>
                            <Nav.Link href="/shop/cart">
                                รถเข็น{" "}
                                {cartContext.cartCount > 0 ? (
                                    <Badge bg="danger">{cartContext.cartCount}</Badge>
                                ) : null}
                            </Nav.Link>
                            <NavDropdown
                                title={props.username}
                                className="mr-auto"
                                align="end"
                            >
                                <NavDropdown.Item href="/shop/profile">
                                    <BsFillPersonFill
                                        style={{
                                            marginBottom: "5px",
                                            marginRight: "3px",
                                        }}
                                    />
                                    <label>ข้อมูลส่วนตัว</label>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/shop/order">
                                    <BsFillBagFill
                                        style={{
                                            marginBottom: "5px",
                                            marginRight: "3px",
                                        }}
                                    />
                                    <label>คำสั่งซื้อของฉัน</label>
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item href="#shop/setting">
                                    <BsFillGearFill
                                        style={{
                                            marginBottom: "5px",
                                            marginRight: "3px",
                                        }}
                                    />
                                    <label>ตั้งค่า</label>
                                </NavDropdown.Item> */}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => onLogout()}>
                                    <IoLogOutSharp
                                        size={16}
                                        color="#dc3545"
                                        style={{
                                            marginBottom: "5px",
                                            marginRight: "3px",
                                        }}
                                    />
                                    <label style={{ color: "#dc3545" }}>
                                        ออกจากระบบ
                                    </label>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className="mr-auto">
                            <Nav.Link href="/shop/login">เข้าสู่ระบบ</Nav.Link>
                            {/* <Nav.Link href="/shop/register">Register</Nav.Link> */}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
