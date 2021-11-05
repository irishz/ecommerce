import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import AuthContext from "../Context/AuthContext";
import "./Order.css";
import moment from "moment";
import { Link } from "react-router-dom";

function Order() {
    const userId = useContext(AuthContext);

    const [orderList, setorderList] = useState([]);

    useEffect(async () => {
        axios.get("/api/getorder").then((res) => {
            // console.log(res.data);
            setorderList(res.data);
        });
    }, [userId]);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>Total</th>
                        <th>CreateDate</th>
                        <th>Status</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList
                        .sort((a, b) => b.created_at - a.created_at)
                        .map((order, idx) => (
                            <tr key={idx}>
                                <td>{order.id}</td>
                                <td>{order.total}</td>
                                <td>
                                    {moment(order.created_at)
                                        .locale("th")
                                        .format("LLL")}
                                </td>
                                <td>{order.status}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/shop/order-detail",
                                            state: {
                                                order_id: order.id,
                                                status: order.status,
                                                total: order.total,
                                                createdAt: order.created_at,
                                            },
                                        }}
                                    >
                                        <Button variant="primary" size="sm">
                                            View
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Order;
