import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfigContext from "../Context/ConfigContext";
import "./Order.css";

function OrderProduct(props) {
    const [orderId, setorderId] = useState(null);
    const [orderProdList, setorderProdList] = useState([]);
    const [orderStatus, setorderStatus] = useState(null);

    const cfg = useContext(ConfigContext);

    useEffect(async () => {
        // console.log(props.location.state.total);
        setorderId(props.location.state.order_id);

        if (orderId) {
            axios
                .get("/api/order-product/" + orderId)
                .then((res) => {
                    // console.log(res.data);
                    setorderProdList(res.data);
                })
                .catch((err) => console.log(err));
        }

        if (props.location.state.status) {
            switch (props.location.state.status) {
                case "ยกเลิก":
                    setorderStatus(0);
                    break;
                case "สั่งซื้อ":
                    setorderStatus(1);
                    break;
                case "ยืนยัน":
                    setorderStatus(2);
                    break;
                case "ชำระเงิน":
                    setorderStatus(3);
                    break;
                default:
                    setorderStatus(5);
                    break;
            }
        }
    }, [orderId]);

    return (
        <Container>
            {/* Stepper */}
            <div className="stepper">
                {["สั่งซื้อ", "ยืนยัน", "ชำระเงิน"].map((item, idx) => (
                    <div className="stepper-content" key={idx}>
                        <div
                            className={
                                orderStatus >= idx + 1
                                    ? "stepper-item-active"
                                    : "stepper-item"
                            }
                        >
                            <label>{idx + 1}</label>
                        </div>
                        <label
                            className={
                                orderStatus >= idx + 1
                                    ? "stepper-text-active"
                                    : "stepper-text"
                            }
                        >
                            {item}
                        </label>
                    </div>
                ))}
            </div>

            <Row>
                <Col>
                    <p>
                        <strong>หมายเลขคำสั่งซื้อ : </strong>
                        {"#" + orderId}
                    </p>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>รหัสสินค้า</th>
                        <th>สินค้า</th>
                        <th>จำนวน</th>
                        <th>หน่วย</th>
                        <th>ราคา</th>
                        <th>ทั้งหมด</th>
                        <th>สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    {orderProdList.map((order, idx) => (
                        <tr key={idx} style={{ whiteSpace: 'nowrap' }} className={order.status === 'ปกติ' ? 'normal': 'unnormal'}>
                            <td>{order.product.product_code}</td>
                            <td>{order.product.name}</td>
                            <td>{order.qty}</td>
                            <td>{order.product.unit}</td>
                            <td>{order.product.price}</td>
                            <td>{order.qty * order.product.price}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="order-total">
                <Col lg={6} md={6} xs={12}>
                    <label>
                        วันที่สั่งซื้อ:{" "}
                        <strong>
                            {moment(props.location.state.createdAt)
                                .locale("th")
                                .format("LLL")}
                        </strong>
                    </label>
                </Col>
                <Col lg={6} md={6} xs={12} style={{ textAlign: "end" }}>
                    <label>
                        <strong>
                            รวมทั้งหมด: {props.location.state.total}{" "}
                            {cfg.currency_symbol}
                        </strong>
                    </label>
                </Col>
            </Row>
            <div className="backto-order">
                <Link to="/shop/order">
                    <Button variant="primary">กลับสู่หน้าคำสั่งซื้อ</Button>
                </Link>
            </div>
        </Container>
    );
}

export default OrderProduct;
