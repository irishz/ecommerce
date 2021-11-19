import axios from "axios";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Col, Form, Row, Button, Accordion, Badge } from "react-bootstrap";

function OrderSummary() {
    const [startDate, setstartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setendDate] = useState(
        moment().add(1, "day").format("YYYY-MM-DD")
    );
    const [orderList, setorderList] = useState([]);
    const [vendorList, setvendorList] = useState([]);

    useLayoutEffect(() => {
        axios.get("/api/vendors").then((res) => {
            // console.log(res.data);
            setvendorList(res.data);
        });
    }, []);

    async function viewData(process_type) {
        await axios
            .get("/api/order-month-vendor/" + startDate + "/" + endDate)
            .then((res) => {
                console.log(res.data);
                setorderList(res.data);
            });

        if (process_type === "export") {
            console.log("generating pdf");
        }
    }

    return (
        <div>
            <h4 className="topic">สรุปยอดสินค้ากับร้านค้า</h4>

            <Row>
                <Col>
                    <Form>
                        <Form.Text>วันที่เริ่มต้น:</Form.Text>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setstartDate(e.target.value)}
                        ></Form.Control>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Text>วันที่สิ้นสุด:</Form.Text>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setendDate(e.target.value)}
                        ></Form.Control>
                    </Form>
                </Col>
                <Col>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => viewData("view")}
                    >
                        ดูข้อมูล
                    </Button>
                </Col>
                <Col>
                    <Button
                        variant="warning"
                        size="lg"
                        onClick={() => viewData("export")}
                    >
                        Export
                    </Button>
                </Col>
            </Row>

            {orderList.length > 0 ? (
                <Accordion defaultActiveKey="0" flush>
                    {vendorList.map((vend, idx) => (
                        <Accordion.Item
                            key={idx}
                            eventKey={idx}
                        >
                            <Accordion.Header>
                                {vend.name}{" "}
                                <Badge
                                    pill
                                    bg={
                                        orderList.filter(
                                            (order) => order.vend_id === vend.id
                                        ).length > 0
                                            ? "danger"
                                            : "secondary"
                                    }
                                >
                                    {
                                        orderList.filter(
                                            (order) => order.vend_id === vend.id
                                        ).length
                                    }
                                </Badge>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col>ชื่อสินค้า</Col>
                                    <Col>จำนวน</Col>
                                </Row>
                                {orderList
                                    .filter(
                                        (order) => order.vend_id === vend.id
                                    )
                                    .map((order, idx) => (
                                        <Row key={idx}>
                                            <Col>{order.name}</Col>
                                            <Col>
                                                {order.prod_qty + " ชิ้น"}
                                            </Col>
                                        </Row>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            ) : (
                <p>ไม่พบข้อมูล.</p>
            )}
        </div>
    );
}

export default OrderSummary;
