import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminProduct() {
    const [prodList, setprodList] = useState([]);
    const [alertDeleteMsg, setalertDeleteMsg] = useState("");
    const [modalShow, setmodalShow] = useState(false);
    const [deleteProd, setdeleteProd] = useState([]);

    useLayoutEffect(() => {
        axios.get("/api/product-all").then((res) => {
            // console.log(res.data);
            setprodList(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get("/api/product-all").then((res) => {
            // console.log(res.data);
            setprodList(res.data);
        });
    }, [alertDeleteMsg]);

    function onDeleteClick(id) {
        let prod_name = prodList
            .filter((item) => item.id === id)
            .map((prod) => prod.name);
        setmodalShow(true);
        setdeleteProd([id, prod_name]);
    }

    function onModalClose() {
        setdeleteProd([]);
        setmodalShow(false);
    }

    function onDelete() {
        axios.delete("/api/product/delete/" + deleteProd[0]).then((res) => {
            // console.log(res.data.message);
            setalertDeleteMsg(res.data.message);
            setTimeout(() => {
                setalertDeleteMsg("");
                setmodalShow(false);
            }, 3000);
        });
    }

    return (
        <div>
            <h4 className="topic">จัดการสินค้า</h4>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อสินค้า</th>
                        <th>รหัสสินค้า</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {prodList.map((prod, idx) => (
                        <tr key={idx}>
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td>{prod.product_code}</td>
                            <td>
                                <div>
                                    <Link
                                        to={{
                                            pathname: "/admin/product-detail",
                                            state: {
                                                id: prod.id,
                                                vendor_id: prod.vendor_id,
                                                name: prod.name,
                                                description: prod.description,
                                                product_code: prod.product_code,
                                                price: prod.price,
                                                qty: prod.qty,
                                                category_id: prod.category_id,
                                                active: prod.active,
                                            },
                                        }}
                                    >
                                        <Button variant="primary" size="sm">
                                            แก้ไข
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => onDeleteClick(prod.id)}
                                        size="sm"
                                    >
                                        ลบ
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={modalShow}>
                <Modal.Header closeButton={onModalClose}>
                    <Modal.Title>ยืนยันการทำรายการ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertDeleteMsg.length > 0
                        ? alertDeleteMsg
                        : "คุณต้องการลบสินค้า " +
                          deleteProd[1] +
                          " ใช่หรือไม่?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={
                            alertDeleteMsg.length > 0
                                ? "outline-danger"
                                : "danger"
                        }
                        onClick={onDelete}
                        disabled={alertDeleteMsg.length > 0 ? true : false}
                    >
                        {alertDeleteMsg.length > 0 ? "สำเร็จ" : "ลบ"}
                    </Button>
                    <Button variant="secondary" onClick={onModalClose}>
                        ยกเลิก
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminProduct;
