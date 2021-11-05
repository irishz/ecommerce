import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table, Button, Alert } from "react-bootstrap";

function OrderPayment() {
    const [searchInput, setsearchInput] = useState("");
    const [alertUpdate, setalertUpdate] = useState("");
    const [orderConfirmData, setorderConfirmData] = useState({});

    useEffect(() => {
        axios.get("/api/getsingleorder/" + searchInput).then((res) => {
            // console.log(res.data);
            if (res.data !== null) {
                setorderConfirmData(res.data);
            }
        });
    }, [searchInput]);

    function onPayment(order_id) {
        // Update Order Status to 'Paymented'
        axios
            .put("/api/order/status", { id: [order_id], status: "Paymented" })
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
        
    }

    return (
        <div>
            <h4>Order Payment</h4>

            <Row className="mb-10">
                <Col lg={4}>
                    <Form style={{ display: "flex" }}>
                        <Form.Group>
                            <Form.Text>Please input order id</Form.Text>
                            <Form.Control
                                type="text"
                                value={searchInput}
                                onChange={(e) => setsearchInput(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            {searchInput.length > 0 &&
            orderConfirmData.status === "Confirmed" ? (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>User</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderConfirmData.id}</td>
                            <td>{orderConfirmData.user_id}</td>
                            <td>{orderConfirmData.status}</td>
                            <td>
                                {moment(orderConfirmData.created_at)
                                    .locale("th")
                                    .format("LLL")}
                            </td>
                            <td style={{ color: "tomato", fontWeight: "bold" }}>
                                {orderConfirmData.total}
                            </td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="info"
                                    onClick={() =>
                                        onPayment(orderConfirmData.id)
                                    }
                                >
                                    Payment
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Not found data or order status is not confirm.</p>
            )}
            {alertUpdate ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>{alertUpdate}</strong>
                </Alert>
            ) : null}
        </div>
    );
}

export default OrderPayment;
