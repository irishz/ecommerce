import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    Container,
    Form,
    Row,
    Button,
    Col,
    Alert,
} from "react-bootstrap";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import AuthContext from "../Context/AuthContext";
import "./Profile.css";
import { useHistory } from "react-router";
import axios from "axios";
import DeptContext from "../Context/DeptContext";
import ResetPassword from "./ResetPassword";

function Profile() {
    const userId = useContext(AuthContext);
    const Dept = useContext(DeptContext);

    const history = useHistory();

    const [userData, setuserData] = useState([]);
    const [alertUpdate, setalertUpdate] = useState("");
    const [modalVisible, setmodalVisible] = useState(false);
    const [curr_password, setcurr_password] = useState("");

    useEffect(async () => {
        await axios.get("/api/user").then((res) => {
            // console.log(res.data);
            setcurr_password(res.data.password);
            setuserData(res.data);
        });
    }, [userId]);

    function onSave(e) {
        e.preventDefault();

        let profile_obj = {
            id: userId.userId,
            employee_code: userData.employee_code,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            department: userData.department,
            is_admin: 0,
        };

        axios.put("/api/user/update", profile_obj).then((res) => {
            // console.log(res.data.message);
            setalertUpdate(res.data.message);
            setTimeout(() => {
                setalertUpdate("");
            }, 3000);
        });
    }

    function handleResetPswd() {
        setmodalVisible(true);
    }

    return (
        <Container>
            <div className="header">
                <BsFillFileEarmarkPersonFill size={32} color="#1768ff" />
                <h2 className="title">ข้อมูลส่วนตัว</h2>
            </div>

            <Card>
                <Card.Body>
                    <h5 className="topic">รายละเอียดข้อมูลส่วนตัว</h5>

                    <Form>
                        <Row>
                            <Col>
                                <label className="input-title">
                                    รหัสพนักงาน
                                </label>
                                <Form.Control
                                    maxLength={7}
                                    defaultValue={userData.employee_code}
                                    onChange={(e) =>
                                        (userData.employee_code =
                                            e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label className="input-title">
                                    ชื่อจริง
                                </label>
                                <Form.Control
                                    defaultValue={userData.first_name}
                                    onChange={(e) =>
                                        (userData.first_name = e.target.value)
                                    }
                                />
                            </Col>
                            <Col>
                                <label className="input-title">นามสกุล</label>
                                <Form.Control
                                    defaultValue={userData.last_name}
                                    onChange={(e) =>
                                        (userData.last_name = e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label className="input-title">อีเมล</label>
                                <Form.Control
                                    defaultValue={userData.email}
                                    onChange={(e) =>
                                        (userData.email = e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label className="input-title">
                                    แผนก
                                </label>
                                <Form.Select
                                    defaultValue={userData.department}
                                    onChange={(e) =>
                                        (userData.department = e.target.value)
                                    }
                                >
                                    <option>{userData.department}</option>
                                    {Dept.map((dept, idx) => (
                                        <option key={idx}>{dept}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="btn-section">
                            <Col>
                                <Button
                                    variant="success"
                                    type="submit"
                                    onClick={(e) => onSave(e)}
                                >
                                    บันทึก
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => history.goBack()}
                                >
                                    ยกเลิก
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={() => handleResetPswd()}>
                                    เปลี่ยนรหัสผ่าน
                                </Button>
                                <ResetPassword
                                    modalVisible={modalVisible}
                                    setmodalVisible={setmodalVisible}
                                    user_id={userData.id}
                                />
                            </Col>
                        </Row>
                    </Form>
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
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;

const styles = {
    alert: { marginTop: "10px", textAlign: "center" },
};
