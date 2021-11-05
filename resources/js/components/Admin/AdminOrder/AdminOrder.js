import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Card,
    Col,
    Button,
    Form,
    Row,
    Table,
    Spinner,
    Alert,
} from "react-bootstrap";

function AdminOrder() {
    const [orderList, setorderList] = useState([]);
    const [orderStatus, setorderStatus] = useState("Ordered");
    const [orderMonthList, setorderMonthList] = useState([]);
    const [startDate, setstartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setendDate] = useState(
        moment().add(1, "day").format("YYYY-MM-DD")
    );
    const [alertUpdate, setalertUpdate] = useState("");

    const [btnProcess, setbtnProcess] = useState(true);
    const [isbtnLoading, setisbtnLoading] = useState(false);

    useEffect(async () => {
        await axios.get("/api/order-all").then((res) => {
            // console.log(res.data);
            setorderList(res.data);
        });
    }, [btnProcess]);

    function onStartDateChange(date) {
        setstartDate(date.target.value);
    }

    function onEndDateChange(date) {
        setendDate(date.target.value);
    }

    async function onSearch() {
        await axios
            .get("/api/order-month/" + startDate + "/" + endDate)
            .then((res) => {
                console.log(res.data);
                setorderMonthList(
                    res.data.filter((list) => list.status === orderStatus)
                );
                setbtnProcess(false);
            });
    }

    function onProcess() {
        let updateList = orderMonthList.map((order) => order.id);
        setisbtnLoading(true);

        console.log(updateList);

        axios
            .put("/api/order/status", { id: updateList, status: "Confirmed" })
            .then((res) => {
                setisbtnLoading(false);
                setalertUpdate(res.data.message);
                setbtnProcess(true);
                setTimeout(() => {
                    setalertUpdate(null);
                }, 3000);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h4>Admin Order Page</h4>

            <Row style={{ marginTop: 15, justifyContent: "space-between" }}>
                {["Ordered", "Confirmed", "Paymented", "Received"].map(
                    (stat, idx) => (
                        <Col key={idx} lg={3}>
                            <Card
                                style={{
                                    backgroundColor: "#FF5733",
                                    color: "white",
                                    fontWeight: "bold",
                                    marginInline: 10,
                                }}
                            >
                                <Card.Body>
                                    <h6>{stat}</h6>
                                    <p>
                                        {
                                            orderList.filter(
                                                (order) => order.status === stat
                                            ).length
                                        }
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                )}
            </Row>

            <Row style={{ marginTop: 15 }}>
                <Col>
                    <Form>
                        <Form.Text>Start Date</Form.Text>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(date) => onStartDateChange(date)}
                        ></Form.Control>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Text>End Date</Form.Text>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(date) => onEndDateChange(date)}
                        ></Form.Control>
                    </Form>
                </Col>
                <Col lg={2}>
                    <Form>
                        <Form.Text>Status</Form.Text>
                        <Form.Select
                            value={orderStatus}
                            onChange={(e) => setorderStatus(e.target.value)}
                        >
                            {[
                                "Ordered",
                                "Confirmed",
                                "Paymented",
                                "Received",
                            ].map((stat, idx) => (
                                <option key={idx} value={stat}>
                                    {stat}
                                </option>
                            ))}
                        </Form.Select>
                    </Form>
                </Col>
                <Col lg={2} style={{ display: "flex", alignSelf: "center" }}>
                    <Button variant="primary" onClick={() => onSearch()}>
                        Search
                    </Button>
                    <Button
                        variant="success"
                        disabled={btnProcess}
                        onClick={(e) => onProcess(e)}
                    >
                        {isbtnLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                            />
                        ) : (
                            "Process"
                        )}
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    {orderMonthList.length > 0 ? (
                        <div>
                            <div
                                style={{
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            >
                                {alertUpdate ? (
                                    <Alert
                                        variant="success"
                                        dismissible
                                        className="alert-success"
                                    >
                                        <strong>{alertUpdate}</strong>
                                    </Alert>
                                ) : null}
                                <label>
                                    <strong>Total : </strong>{" "}
                                    {orderMonthList.length}{" "}
                                    <strong>records.</strong>
                                </label>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>User</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderMonthList.map((order, idx) => (
                                        <tr key={idx}>
                                            <td>{order.id}</td>
                                            <td>
                                                {order.user.first_name}{" "}
                                                {order.user.last_name}
                                            </td>
                                            <td>{order.status}</td>
                                            <td>
                                                {moment(order.created_at)
                                                    .locale("th")
                                                    .format("LLL")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <p>Not found any data.</p>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default AdminOrder;
