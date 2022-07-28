import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
    Col,
    Form,
    Row,
    Button,
    Alert,
    FloatingLabel,
    Modal,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import DeptContext from "../../Context/DeptContext";

function AdminUserDetail() {
    const data = useLocation();
    let history = useHistory();

    const [userId, setuserId] = useState(data.state.id);
    const [employeeCode, setemployeeCode] = useState(data.state.employee_code);
    const [firstName, setfirstName] = useState(data.state.first_name);
    const [lastName, setlastName] = useState(data.state.last_name);
    const [email, setemail] = useState(() => {
        data.state.email ? data.state.email : "";
    });
    const [department, setdepartment] = useState(data.state.department);
    const [isAdmin, setisAdmin] = useState(data.state.is_admin);
    const [password, setpassword] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [changePassModalVisible, setchangePassModalVisible] = useState(false);
    const [passwordMatch, setpasswordMatch] = useState(false);
    const [alertChangePass, setalertChangePass] = useState("");

    const [alertUpdate, setalertUpdate] = useState("");

    const Dept = useContext(DeptContext);

    useEffect(() => {
        if (password === confirmPassword) {
            setpasswordMatch(true);
        } else {
            setpasswordMatch(false);
        }
    }, [confirmPassword]);

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

    function handleChangePassClick() {
        setchangePassModalVisible(true);
    }

    function onSavePassword() {
        console.log(userId + " | " + password);
        let userPassObj = {
            id: userId,
            newPassword: password,
        };

        axios.put("/api/user/reset-password", userPassObj).then((res) => {
            // console.log(res.data.message)
            setalertChangePass(res.data.message);
            setTimeout(() => {
                setalertChangePass("");
                setchangePassModalVisible(false);
                setpassword("");
                setconfirmPassword("");
            }, 2000);
        });
    }

    function passwordValidate(e) {
        if (e.target.value === "") {
            setpasswordError("กรุณาใส่รหัสผ่าน");
        } else if (e.target.value.length < 6) {
            setpasswordError("รหัสผ่านขั้นต่ำ 6 ตัวอักษร");
        } else {
            setpasswordError("");
        }
    }

    return (
        <div>
            <h4 className="topic">
                {data.state.first_name + " " + data.state.last_name}
            </h4>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ID:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control plaintext readOnly value={userId} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        รหัสพนักงาน:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control plaintext readOnly value={employeeCode} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
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
                    <Form.Label column sm="2">
                        อีเมล:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            className="user-form"
                            type="email"
                            value={email}
                            defaultValue=""
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
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
                    <Form.Label column sm="2">
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
                <Button
                    variant="outline-primary"
                    onClick={() => handleChangePassClick()}
                >
                    เปลี่ยนรหัสผ่าน
                </Button>
            </div>

            <Modal centered show={changePassModalVisible}>
                <Form noValidate>
                    <Modal.Header>เปลี่ยนรหัสผ่าน</Modal.Header>
                    <Modal.Body>
                        <FloatingLabel label="รหัสผ่าน" className="mb-3">
                            <Form.Control
                                value={password}
                                minLength={6}
                                type="password"
                                required
                                onBlur={(e) => passwordValidate(e)}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </FloatingLabel>
                        {passwordError.length > 0 ? (
                            <Form.Text className="text-danger">
                                {passwordError}
                            </Form.Text>
                        ) : null}
                        <FloatingLabel label="ยืนยันรหัสผ่าน" className="mb-3">
                            <Form.Control
                                className="mb-0"
                                type="password"
                                onChange={(e) =>
                                    setconfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                                minLength={6}
                                required
                            />
                        </FloatingLabel>
                        {passwordMatch ? null : (
                            <Form.Text className="text-danger">
                                รหัสผ่านไม่ตรงกัน
                            </Form.Text>
                        )}
                        {alertChangePass.length > 0 ? (
                            <Alert variant="success">{alertChangePass}</Alert>
                        ) : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-block">
                            <Button
                                variant="success"
                                type="button"
                                onClick={(e) => onSavePassword(e)}
                            >
                                ตกลง
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => setchangePassModalVisible(false)}
                            >
                                ยกเลิก
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>

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
