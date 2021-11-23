import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
    Col,
    Container,
    Row,
    Button,
    ButtonGroup,
    Alert,
    Card,
    Table,
    Figure,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";
import ConfigContext from "../Context/ConfigContext";
import "./Cart.css";

function Cart() {
    const [cartList, setcartList] = useState([]);
    const [alertCartDelete, setalertCartDelete] = useState("");
    const [alertCreateOrder, setalertCreateOrder] = useState("");
    const [btnSaveDisable, setbtnSaveDisable] = useState(true);

    const cfg = useContext(ConfigContext);
    const userId = useContext(AuthContext);
    const cartContext = useContext(AuthContext);

    useEffect(async () => {
        axios.get("/api/getcart").then((res) => {
            // console.log(res.data);
            setcartList(res.data);
        });
    }, [userId, alertCartDelete]);

    function onCartDelete(cart_id) {
        axios.delete("/api/cart/delete/" + cart_id).then((res) => {
            // console.log(res.data.message);
            Swal.fire({
                title: "สำเร็จ!",
                text: res.data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            });
            cartContext.setcartCount(cartContext.cartCount - 1);
        });
    }

    function onQtyChange(cart_idx, qty) {
        setbtnSaveDisable(false);
        let newCart = cartList;

        newCart[cart_idx].qty = parseInt(qty);
        newCart[cart_idx].total = parseInt(qty * newCart[cart_idx].price);

        setcartList(newCart);
    }

    function onCartSave() {
        // console.log(cartList);
        axios
            .put("/api/cart/qty-change", cartList)
            .then((res) => {
                setbtnSaveDisable(true);
                Swal.fire({
                    title: "สำเร็จ!",
                    text: res.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((err) => console.log(err));
    }

    function onCheckout() {
        // console.log(cartList);
        axios.post("/api/order", cartList).then((res) => {
            console.log(res.data.message);
            setalertCreateOrder(res.data.message);
        });
    }

    if (cartList.length < 1) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Alert
                    variant="info"
                    style={{ width: "30%", textAlign: "center" }}
                >
                    <strong>
                        ไม่พบสินค้าในรถเข็น!{" "}
                        <Link to="/shop/product">ไปช็อปเลย!</Link>
                    </strong>
                </Alert>
            </div>
        );
    }

    return (
        <Container>
            {alertCartDelete ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>{alertCartDelete}</strong>
                </Alert>
            ) : null}
            {alertCreateOrder ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>
                        {alertCreateOrder}{" "}
                        <Link to="/shop/order">ดูคำสั่งซื้อของคุณ.</Link>
                    </strong>
                </Alert>
            ) : null}
            <Row>
                <Col lg={8}>
                    {cartList.map((cart, idx) => (
                        <div key={idx}>
                            <Row
                                style={{
                                    margin: 10,
                                    backgroundColor: "white",
                                    borderRadius: 5,
                                }}
                            >
                                <Col className="d-flex">
                                    <img
                                        style={{
                                            width: 70,
                                            height: 70,
                                            marginRight: 10,
                                            boxShadow: "1px 1px gray",
                                        }}
                                        src={
                                            "/products/" +
                                            cart.product.id +
                                            "/" +
                                            cart.product.name +
                                            ".jpg"
                                        }
                                    />
                                    <div
                                        style={{
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        }}
                                    >
                                        <p>{cart.product.name}</p>
                                    </div>
                                </Col>
                                <Col
                                    style={{
                                        display: "flex",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Form>
                                        <Form.Control
                                            className="cart-qty"
                                            size="sm"
                                            type="number"
                                            min={1}
                                            defaultValue={cart.qty}
                                            onChange={(e) =>
                                                onQtyChange(idx, e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form>
                                    <p
                                        style={{
                                            marginLeft: 15,
                                            marginBottom: 0,
                                            alignSelf: "center",
                                        }}
                                    >
                                        {cart.product.price}{" "}
                                        {cfg.currency_symbol}
                                    </p>
                                </Col>
                                <Col
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    style={{ alignSelf: "center", padding: 10 }}
                                >
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onCartDelete(cart.id)}
                                    >
                                        x
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
                <Col lg={4}>
                    <Card className="summary">
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ชื่อสินค้า</th>
                                        <th></th>
                                        <th>ทั้งหมด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.map((cart, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                {cart.product.name}{" "}
                                                <label
                                                    style={{
                                                        color: "gray",
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    x{cart.qty}
                                                </label>
                                            </td>
                                            <td></td>
                                            <td>
                                                {cart.qty * cart.price}{" "}
                                                {cfg.currency_symbol}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Card.Text className="cart-total">
                                รวมทั้งหมด:{" "}
                                <label className="ml-5">
                                    {cartList.reduce(
                                        (a, b) => (a = a + b.price * b.qty),
                                        0
                                    )}{" "}
                                    {cfg.currency_symbol}
                                </label>
                            </Card.Text>
                            <Row>
                                <Col className="d-grid gap-2">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        onClick={() => onCartSave()}
                                        disabled={btnSaveDisable}
                                    >
                                        บันทึก
                                    </Button>
                                </Col>
                                <Col className="d-grid gap-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        onClick={() => onCheckout()}
                                    >
                                        สั่งสินค้า
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
