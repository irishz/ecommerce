import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Col,
    Container,
    Form,
    Row,
    Table,
    Button,
    Alert,
} from "react-bootstrap";
import "../AdminNav/Admin.css";

function OrderDetail() {
    const [searchInput, setsearchInput] = useState(null);
    const [orderPaymentData, setorderPaymentData] = useState({});
    const [alertUpdate, setalertUpdate] = useState("");

    useEffect(() => {
        axios.get("/api/getsingleorder/" + searchInput).then((res) => {
            // console.log(res.data);
            setorderPaymentData(res.data);
        });
    }, [searchInput]);

    function onSave() {
        let orderProdList = orderPaymentData.order_product.map((ord) => ({
            id: ord.id,
            status: ord.status,
        }));
        // console.log(orderProdList);

        axios
            .put("/api/order-product/status", orderProdList)
            .then((res) => {
                setalertUpdate(res.data.message);
                setTimeout(() => {
                    setalertUpdate("");
                }, 3000);
            })
            .catch((err) => console.log(err));
    }

    return (
        <Container>
            <h4 className="topic">รายละเอียดคำสั่งซื้อ</h4>

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

            <Row className="mb-2">
                <Col lg={2}>
                    <strong>หมายเลขออเดอร์:</strong> {orderPaymentData.id}
                </Col>
                <Col lg={2}>
                    <strong>ยอดรวม:</strong> {orderPaymentData.total}
                </Col>
                <Col lg={2}>
                    <strong>สถานะ:</strong> {orderPaymentData.status}
                </Col>
                <Col>
                    <strong>วันที่สั่งซื้อ:</strong>{" "}
                    {moment(orderPaymentData.created_at)
                        .locale("th")
                        .format("LLL")}
                </Col>
            </Row>

            {_.isEmpty(orderPaymentData) ? (
                <p>ไม่พบข้อมูล.</p>
            ) : (
                <div>
                    {" "}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderPaymentData.order_product.map(
                                (ordProd, idx) => (
                                    <tr
                                        key={idx}
                                        className={
                                            ordProd.status !== "ปกติ"
                                                ? "unnormal"
                                                : "normal"
                                        }
                                    >
                                        <td>{ordProd.product.product_code}</td>
                                        <td>{ordProd.product.name}</td>
                                        <td>
                                            <Form>
                                                <Form.Select
                                                    onChange={(e) =>
                                                        (orderPaymentData.order_product[
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
                            <Button variant="success" onClick={() => onSave()}>
                                บันทึก
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

export default OrderDetail;
