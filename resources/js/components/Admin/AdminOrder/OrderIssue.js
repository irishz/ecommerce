import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table, Button } from "react-bootstrap";

function OrderIssue() {
    const [searchInput, setsearchInput] = useState("");
    const [alertUpdate, setalertUpdate] = useState("");
    const [orderPaymentData, setorderPaymentData] = useState({});

    useEffect(() => {
        axios.get("/api/getsingleorder/" + searchInput).then((res) => {
            // console.log(res.data);
            if (res.data !== null) {
                setorderPaymentData(res.data);
            }
        });
    }, [searchInput]);

    function onIssue(order_id) {
        //Change order status to Received
        axios
            .put("/api/order/status", { id: [order_id], status: "Received" })
            .then((res) => {
                setsearchInput("");
                setorderPaymentData({});
                setalertUpdate(res.data.message);
                setTimeout(() => {
                    setalertUpdate(null);
                }, 3000);
            })
            .catch((err) => console.log(err));

        //Issue product quantity
    }

    return (
        <div>
            <h4>Order Issue Page</h4>

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
            orderPaymentData.status === "Paymented" ? (
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
                            <td>{orderPaymentData.id}</td>
                            <td>{orderPaymentData.user_id}</td>
                            <td>{orderPaymentData.status}</td>
                            <td>
                                {moment(orderPaymentData.created_at)
                                    .locale("th")
                                    .format("LLL")}
                            </td>
                            <td style={{ color: "tomato", fontWeight: "bold" }}>
                                {orderPaymentData.total}
                            </td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="warning"
                                    onClick={() => onIssue(orderPaymentData.id)}
                                >
                                    Issue
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Not found data or order status is not paymented.</p>
            )}
            {alertUpdate ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>{alertUpdate}</strong>
                </Alert>
            ) : null}
        </div>
    );
}

export default OrderIssue;
