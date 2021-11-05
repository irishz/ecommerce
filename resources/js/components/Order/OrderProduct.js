import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfigContext from "../Context/ConfigContext";
import "./Order.css";

function OrderProduct(props) {
    const [orderId, setorderId] = useState(null);
    const [orderProdList, setorderProdList] = useState([]);
    const [orderStatus, setorderStatus] = useState(null);

    const cfg = useContext(ConfigContext);

    useEffect(async () => {
        console.log(props.location.state.total);
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
                case "Cancelled":
                    setorderStatus(0);
                    break;
                case "Ordered":
                    setorderStatus(1);
                    break;
                case "Confirmed":
                    setorderStatus(2);
                    break;
                case "Paymented":
                    setorderStatus(3);
                    break;
                case "Received":
                    setorderStatus(4);
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
                {["Ordered", "Confirmed", "Paymented", "Received"].map((item, idx) => (
                    <div className="stepper-content">
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

            <Table striped bordered hover sm>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderProdList.map((order, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>
                                {order.product.name} x{order.qty}
                            </td>
                            <td>{order.product.price}</td>
                            <td>{order.qty * order.product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="order-total">
                <label>
                    <strong>Created At: </strong>{" "}
                    {moment(props.location.state.createdAt).format("LLL")}
                </label>
                <label>
                    <strong>
                        Total: {props.location.state.total}
                        {cfg.currency_symbol}
                    </strong>
                </label>
            </div>
            <div className="backto-order">
                <Link to="/shop/order">
                    <Button variant="primary">Back to MyOrder</Button>
                </Link>
            </div>
        </Container>
    );
}

export default OrderProduct;
