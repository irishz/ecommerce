import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Col,
    Form,
    Row,
    Table,
    Button,
    Alert,
    Container,
} from "react-bootstrap";

function OrderPayment() {
    const [searchInput, setsearchInput] = useState(null);
    const [alertUpdate, setalertUpdate] = useState("");
    const [orderConfirmData, setorderConfirmData] = useState({});

    useEffect(() => {
        axios.get("/api/getsingleorder/" + searchInput).then((res) => {
            console.log(res.data);
            if (res.data !== null) {
                setorderConfirmData(res.data);
            };
        });
    }, [searchInput]);

    async function onPayment(order_id) {
        // Update Order Status to 'Paymented'
        await axios
            .put("/api/order/status", { id: [order_id], status: "ชำระเงิน" })
            .then((res) => {
                setsearchInput("");
                setorderConfirmData({});
                setalertUpdate(res.data.message);
                setTimeout(() => {
                    setalertUpdate(null);
                }, 3000);
            })
            .catch((err) => console.log(err));

        //Create Invoice
        await axios.post('/api/invoice' , {id: orderConfirmData.id})
        
    }

    return (
        <Container>
            <h4>Order Payment</h4>

            <Row className="mb-10">
                <Col lg={4}>
                    <Form style={{ display: "flex" }}>
                        <Form.Group>
                            <Form.Text>Please input order id</Form.Text>
                            <Form.Control
                                type="number"
                                min={0}
                                value={searchInput}
                                onChange={(e) => setsearchInput(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col lg={2}>
                    <strong>Order:</strong> {orderConfirmData.id}
                </Col>
                <Col lg={2}>
                    <strong>Total:</strong> {orderConfirmData.total}
                </Col>
                <Col lg={2}>
                    <strong>Status:</strong> {orderConfirmData.status}
                </Col>
                <Col>
                    <strong>Order By:</strong>{" "}
                    {_.isEmpty(orderConfirmData)
                        ? null
                        : orderConfirmData.user.first_name}
                </Col>
                <Col>
                    <strong>Create At:</strong>{" "}
                    {moment(orderConfirmData.created_at)
                        .locale("th")
                        .format("LLL")}
                </Col>
            </Row>

            {_.isEmpty(orderConfirmData) ? (
                <p>Not found any data.</p>
            ) : (
                <div>
                    {" "}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Order Qty</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderConfirmData.order_product.map(
                                (ordProd, idx) => (
                                    <tr key={idx}>
                                        <td>{ordProd.product.product_code}</td>
                                        <td>{ordProd.product.name}</td>
                                        <td>{ordProd.qty}</td>
                                        <td>
                                            <Form>
                                                <Form.Select
                                                    onChange={(e) =>
                                                        (orderConfirmData.order_product[
                                                            idx
                                                        ].status =
                                                            e.target.value)
                                                    }
                                                >
                                                    <option
                                                        value={ordProd.status}
                                                    >
                                                        {ordProd.status}
                                                    </option>
                                                    <option value="ปกติ">
                                                        ปกติ
                                                    </option>
                                                    <option value="ยกเลิกโดยผู้สั่งซื้อ">
                                                        ยกเลิก
                                                    </option>
                                                    <option value="ไม่มีสินค้า">
                                                        ไม่มีสินค้า
                                                    </option>
                                                </Form.Select>
                                            </Form>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => onPayment(orderConfirmData.id)}>
                                ชำระเงิน
                            </Button>
                        </Col>
                    </Row>
                    {alertUpdate ? (
                        <Alert
                            variant="success"
                            dismissible
                            className="alert-success"
                        >
                            <strong>{alertUpdate}</strong>
                        </Alert>
                    ) : null}
                </div>
            )}
        </Container>
    );
}

export default OrderPayment;
