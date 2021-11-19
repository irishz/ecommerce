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
import "../AdminNav/Admin.css";

function OrderPayment() {
    const [searchInput, setsearchInput] = useState(null);
    const [alertUpdate, setalertUpdate] = useState("");
    const [orderConfirmData, setorderConfirmData] = useState(null);

    useEffect(() => {
        axios.get("/api/getsingleorder/" + searchInput).then((res) => {
            console.log(res.data);
            if (res.data !== null) {
                setorderConfirmData(res.data);
            } else if (res.data.status !== "ยืนยัน") {
                setorderConfirmData(null);
            } else {
                setorderConfirmData(null);
            }
        });
    }, [searchInput]);

    async function onPayment(order_id) {
        // Update Order Status to 'Paymented'
        await axios
            .put("/api/order/status", { id: [order_id], status: "ชำระเงิน" })
            .then((res) => {
                setsearchInput(null);
                setorderConfirmData(null);
                setalertUpdate(res.data.message);
                setTimeout(() => {
                    setalertUpdate(null);
                }, 3000);
            })
            .catch((err) => console.log(err));

        //Create Invoice
        await axios
            .post("/api/invoice", {
                id: orderConfirmData.id,
                user_id: orderConfirmData.user.id,
            })
            .then((res) => {
                setsearchInput(null);
                setorderConfirmData(null);
                setalertUpdate(res.data.message);
                setTimeout(() => {
                    setalertUpdate(null);
                }, 3000);
            });
    }

    return (
        <Container>
            <h4 className="topic">ชำระเงิน</h4>

            <Row className="mb-10">
                <Col lg={4}>
                    <Form style={{ display: "flex" }}>
                        <Form.Group>
                            <Form.Text>ใส่หมายเลขคำสั่งซื้อ</Form.Text>
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

            {_.isEmpty(orderConfirmData) ? null : (
                <Row className="mb-2">
                    <Col lg={2}>
                        <strong>หมายเลขออเดอร์:</strong> {orderConfirmData.id}
                    </Col>
                    <Col lg={2}>
                        <strong>สถานะ:</strong> {orderConfirmData.status}
                    </Col>
                    <Col>
                        <strong>ชื่อผู้สั่งซื้อ:</strong>{" "}
                        {orderConfirmData.order_product.length < 0
                            ? null
                            : orderConfirmData.user.first_name}
                    </Col>
                    <Col>
                        <strong>วันที่สั่งซื้อ:</strong>{" "}
                        {moment(orderConfirmData.created_at)
                            .locale("th")
                            .format("LLL")}
                    </Col>
                </Row>
            )}

            {_.isEmpty(orderConfirmData) ? (
                <p>ไม่พบข้อมูล.</p>
            ) : (
                <div>
                    {" "}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>จำนวน</th>
                                <th>รวม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderConfirmData.order_product.map(
                                (ordProd, idx) => (
                                    <tr key={idx}>
                                        <td>{ordProd.product.product_code}</td>
                                        <td>{ordProd.product.name}</td>
                                        <td>{ordProd.qty}</td>
                                        <td>{ordProd.total}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => onPayment(orderConfirmData.id)}
                                disabled={
                                    orderConfirmData.status !== "ยืนยัน"
                                        ? true
                                        : false
                                }
                            >
                                {orderConfirmData.status === "ชำระเงิน"
                                    ? "ชำระเงินแล้ว"
                                    : "ชำระเงิน"}
                            </Button>
                        </Col>
                        <Col style={{ textAlign: "end", marginRight: "2rem" }}>
                            <strong>ทั้งหมด: {orderConfirmData.total} บาท</strong>
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
