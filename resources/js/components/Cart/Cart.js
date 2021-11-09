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
import AuthContext from "../Context/AuthContext";
import ConfigContext from "../Context/ConfigContext";
import "./Cart.css";

function Cart() {
    const [cartList, setcartList] = useState([]);
    const [alertCartDelete, setalertCartDelete] = useState("");
    const [alertCartSave, setalertCartSave] = useState("");
    const [alertCreateOrder, setalertCreateOrder] = useState("");
    const [btnSaveDisable, setbtnSaveDisable] = useState(true);

    const cfg = useContext(ConfigContext);
    const userId = useContext(AuthContext);

    useEffect(async () => {
        axios.get("/api/getcart").then((res) => {
            // console.log(res.data);
            setcartList(res.data);
        });
    }, [userId, alertCartDelete]);

    function onCartDelete(cart_id) {
        axios.delete("/api/cart/delete/" + cart_id).then((res) => {
            // console.log(res.data.message);
            setalertCartDelete(res.data.message);
            setTimeout(() => {
                setalertCartDelete(null);
            }, 3000);
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
                setalertCartSave(res.data.message);
                setTimeout(() => {
                    setalertCartSave(null);
                }, 3000);
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
                        Your cart is empty!{" "}
                        <Link to="/shop/product">Go to shopping now.</Link>
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
            {alertCartSave ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>{alertCartSave}</strong>
                </Alert>
            ) : null}
            {alertCreateOrder ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>
                        {alertCreateOrder}{" "}
                        <Link to="/shop/order">View your orders.</Link>
                    </strong>
                </Alert>
            ) : null}
            <Row>
                <Col lg={8}>
                    {cartList.map((cart, idx) => (
                        <div key={idx}>
                            <Row>
                                <Col>
                                    <Row className="cart-row">
                                        <Col lg={1}>{idx + 1}</Col>
                                        <Col
                                            style={{
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Figure>
                                                <Figure.Image
                                                    width={85}
                                                    src={
                                                        "/products/" +
                                                        cart.product.id +
                                                        "/" +
                                                        cart.product.name +
                                                        ".jpg"
                                                    }
                                                ></Figure.Image>
                                            </Figure>
                                        </Col>
                                        <Col>{cart.product.name}</Col>
                                        <Col>{cart.product.price}</Col>
                                        <Col>
                                            {/* <ButtonGroup>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        onQtyChange(
                                                            cart.id,
                                                            cart.qty - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button> */}
                                            <Form>
                                                <Form.Control
                                                    className="cart"
                                                    type="number"
                                                    min={1}
                                                    defaultValue={cart.qty}
                                                    onChange={(e) =>
                                                        onQtyChange(
                                                            idx,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Form>
                                            {/* <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        onQtyChange(
                                                            cart.id,
                                                            cart.qty + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </ButtonGroup> */}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={1} className="cart-delete">
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
                                        <th>Order</th>
                                        <th></th>
                                        <th>Total</th>
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
                                                {cart.qty * cart.price}
                                                {cfg.currency_symbol}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Card.Text className="cart-total">
                                Total:{" "}
                                <label className="ml-5">
                                    {cartList.reduce(
                                        (a, b) => (a = a + b.price * b.qty),
                                        0
                                    )}
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
                                        Save
                                    </Button>
                                </Col>
                                <Col className="d-grid gap-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        onClick={() => onCheckout()}
                                    >
                                        CheckOut
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
