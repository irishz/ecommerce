import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminUser() {
    const [userList, setuserList] = useState([]);

    useEffect(async () => {
        axios.get("/api/user-all").then((res) => {
            console.log(res.data);
            setuserList(res.data);
        });
    }, []);

    function onDeleteUser(user_id) {
        console.log(user_id);
    }

    return (
        <div>
            <h4>Admin User Page</h4>

            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Employee Code</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Email</th>
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
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    onDeleteUser(user.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
}

export default AdminUser;
