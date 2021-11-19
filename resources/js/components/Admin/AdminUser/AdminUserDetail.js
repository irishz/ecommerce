import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import DeptContext from "../../Context/DeptContext";

function AdminUserDetail() {
    const data = useLocation();
    let history = useHistory();

    const [userId, setuserId] = useState(data.state.id);
    const [employeeCode, setemployeeCode] = useState(data.state.employee_code);
    const [firstName, setfirstName] = useState(data.state.first_name);
    const [lastName, setlastName] = useState(data.state.last_name);
    const [email, setemail] = useState(data.state.email);
    const [department, setdepartment] = useState(data.state.department);
    const [isAdmin, setisAdmin] = useState(data.state.is_admin);

    const [alertUpdate, setalertUpdate] = useState("");

    const Dept = useContext(DeptContext);

    function onSave(e) {
        e.preventDefault();

        let role;
        if (isAdmin) {
            role = 1;
        } else {
            role = 0;
        }

        let userObj = {
            id: userId,
            employee_code: employeeCode,
            first_name: firstName,
            last_name: lastName,
            email: email,
            department: department,
            is_admin: role,
        };

        console.log(userObj);
        axios.put("/api/user/update", userObj).then((res) => {
            // console.log(res.data.message);
            setalertUpdate(res.data.message);
            setTimeout(() => {
                setalertUpdate("");
            }, 3000);
        });
    }

    return (
        <div>
            <h4 className="topic">
                {data.state.first_name + " " + data.state.last_name}
            </h4>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        ID:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control plaintext readOnly value={userId} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        รหัสพนักงาน:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control plaintext readOnly value={employeeCode} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        ชื่อ-นามสกุล:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            className="user-form"
                            type="text"
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                        />
                    </Col>
                    <Col sm="4">
                        <Form.Control
                            className="user-form"
                            type="text"
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        อีเมล:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            className="user-form"
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        แผนก:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Select
                            defaultValue={department}
                            onChange={(e) => setdepartment(e.target.value)}
                        >
                            <option>{department}</option>
                            {Dept.map((dept, idx) => (
                                <option key={idx}>{dept}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        ประเภท:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Check
                            type="switch"
                            label="ผู้ดูแลระบบ"
                            onChange={() => setisAdmin(!isAdmin)}
                            checked={isAdmin > 0 ? true : false}
                        />
                    </Col>
                </Form.Group>
            </Form>

            <div className="d-block">
                <Button
                    type="submit"
                    variant="success"
                    onClick={(e) => onSave(e)}
                >
                    บันทึก
                </Button>
                <Button variant="danger" onClick={() => history.goBack()}>
                    ย้อนกลับ
                </Button>
            </div>

            {alertUpdate ? (
                <Alert
                    variant="success"
                    dismissible
                    className="alert-success"
                    style={styles.alert}
                >
                    <strong>{alertUpdate}</strong>
                </Alert>
            ) : null}
        </div>
    );
}

export default AdminUserDetail;

const styles = {
    alert: { marginTop: "10px", textAlign: "center" },
};
