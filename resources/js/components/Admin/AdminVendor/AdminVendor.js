import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../AdminNav/Admin.css";

function AdminVendor() {
    const [vendorList, setvendorList] = useState([]);
    const [deleteVendId, setdeleteVendId] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [alertDeleteMsg, setalertDeleteMsg] = useState("");

    useEffect(async () => {
        axios.get("/api/vendors").then((res) => {
            // console.log(res.data);
            setvendorList(res.data);
        });
    }, [alertDeleteMsg]);

    function onDeleteClick(id) {
        setdeleteVendId(id);
        setshowModal(true);
    }

    function onDeleteVendor() {
        axios.delete("/api/vendor/delete/" + deleteVendId).then((res) => {
            setalertDeleteMsg(res.data.message);
            setTimeout(() => {
                setshowModal(false);
                setalertDeleteMsg("");
            }, 3000);
        });
    }

    return (
        <div>
            <h4 className="topic">จัดการผู้ใช้</h4>

            <Row>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Link to={{ pathname: "/admin/vendor-create" }}>
                        <Button variant="success" size="sm">
                            <FaPlus /> เพิ่มร้านค้า
                        </Button>
                    </Link>
                </div>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ชื่อร้านค้า</th>
                                <th>วันที่สร้าง</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendorList.map((vend, idx) => (
                                <tr key={idx}>
                                    <td>{vend.id}</td>
                                    <td>{vend.name}</td>
                                    <td>
                                        {moment(vend.created_at)
                                            .locale("th")
                                            .format("LLL")}
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Link
                                                to={{
                                                    pathname:
                                                        "/admin/vendor-detail",
                                                    state: {
                                                        id: vend.id,
                                                        name: vend.name,
                                                    },
                                                }}
                                            >
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    แก้ไข
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    onDeleteClick(vend.id)
                                                }
                                            >
                                                ยกเลิก
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal}>
                <Modal.Header>ยืนยันการทำรายการ</Modal.Header>
                <Modal.Body>
                    {alertDeleteMsg.length > 0
                        ? alertDeleteMsg
                        : "คุณต้องการลบร้านค้านี้ใช่หรือไม่?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={
                            alertDeleteMsg.length > 0
                                ? "outline-danger"
                                : "danger"
                        }
                        disabled={alertDeleteMsg.length > 0 ? true : false}
                        onClick={onDeleteVendor}
                    >
                        {alertDeleteMsg.length > 0 ? "สำเร็จ" : "ลบ"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setshowModal(false)}
                    >
                        ยกเลิก
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminVendor;
