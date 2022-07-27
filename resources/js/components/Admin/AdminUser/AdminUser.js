import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";

function AdminUser(props) {
    const [userList, setuserList] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [deleteUserId, setdeleteUserId] = useState(null);
    const [alertDeleteMsg, setalertDeleteMsg] = useState("");
    const [alertCreateSuccess, setalertCreateSuccess] = useState(null);

    useEffect(async () => {
        axios.get("/api/user-all").then((res) => {
            // console.log(res.data);
            setuserList(res.data);
        });
    }, [alertDeleteMsg]);

    useEffect(() => {
        setalertCreateSuccess(props.alertCreateSuccess);
        setTimeout(() => {
            setalertCreateSuccess(null);
        }, 3000);

        return () => {
            setalertCreateSuccess(null);
        };
    }, [props.alertCreateSuccess]);

    function onDeleteClick(user_id) {
        setshowModal(true);
        setdeleteUserId(user_id);
    }

    function onDeleteUser() {
        axios.delete("/api/user/delete/" + deleteUserId).then((res) => {
            console.log(res.data.message);
            setalertDeleteMsg(res.data.message);
            setTimeout(() => {
                setalertDeleteMsg("");
                setshowModal(false);
            }, 3000);
        });
    }

    return (
        <div>
            <div className="topic d-flex pb-2 justify-content-between">
                <h4 className="align-self-center mb-0 text-bold">
                    จัดการผู้ใช้
                </h4>
                <Link to={{ pathname: "/admin/user-create" }}>
                    <Button variant="success">
                        <BsPersonPlusFill /> เพิ่มผู้ใช้
                    </Button>
                </Link>
            </div>

            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>รหัสพนักงาน</th>
                                <th>ชื่อจริง</th>
                                <th>นามสกุล</th>
                                <th>แผนก</th>
                                <th>อีเมล</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{user.id}</td>
                                    <td>{user.employee_code}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.department}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Link
                                                to={{
                                                    pathname:
                                                        "/admin/user-detail",
                                                    state: {
                                                        id: user.id,
                                                        employee_code:
                                                            user.employee_code,
                                                        first_name:
                                                            user.first_name,
                                                        last_name:
                                                            user.last_name,
                                                        department:
                                                            user.department,
                                                        email: user.email,
                                                        is_admin: user.is_admin,
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
                                                    onDeleteClick(user.id)
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

            <Modal centered show={showModal}>
                <Modal.Header>ยืนยันการทำรายการ</Modal.Header>
                <Modal.Body>
                    {alertDeleteMsg.length > 0
                        ? alertDeleteMsg
                        : "คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={
                            alertDeleteMsg.length > 0
                                ? "outline-danger"
                                : "danger"
                        }
                        disabled={alertDeleteMsg.length > 0 ? true : false}
                        onClick={onDeleteUser}
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

            <Modal centered show={alertCreateSuccess ? true : false}>
                <Modal.Body>{alertCreateSuccess}</Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminUser;
