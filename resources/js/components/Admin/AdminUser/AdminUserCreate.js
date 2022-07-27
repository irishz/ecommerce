import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { useHistory, Redirect } from "react-router";
import DeptContext from "../../Context/DeptContext";
import { useForm } from "react-hook-form";
import axios from "axios";

function AdminUserCreate() {
    let history = useHistory();
    const [validated, setvalidated] = useState(false);
    const [alertUserError, setalertUserError] = useState("");
    const [alertCreateSuccess, setalertCreateSuccess] = useState("");
    const Dept = useContext(DeptContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            employeeCode: "",
            firstName: "",
            lastName: "",
            department: "",
            isAdmin: 0,
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setvalidated(true);
        }

        return () => {
            setvalidated(false);
        };
    }, [errors]);

    function onSubmit(data) {
        if (data.isAdmin) {
            data.isAdmin = 1;
        } else {
            data.isAdmin = 0;
        }
        // console.log(data);

        axios.post("/api/register", data).then((res) => {
            if (res.data.message === "รหัสพนักงานนี้มีในระบบอยู่แล้ว") {
                setalertUserError(res.data.message);
                setTimeout(() => {
                    setalertUserError("");
                }, 3000);
            } else {
                setalertCreateSuccess(res.data.message)
                history.push(alertCreateSuccess || "/admin/user")
            }
        });
    }

    return (
        <div>
            <div className="topic d-flex pb-1 justify-content-between">
                <h4 className="align-self-center mb-0">
                    <BsPersonPlusFill /> เพิ่มผู้ใช้
                </h4>
            </div>

            <div className="mt-3">
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            รหัสพนักงาน:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                {...register("employeeCode", {
                                    required: "กรุณาใส่รหัสพนักงาน",
                                    pattern: {
                                        value: /[0-9]{7}/,
                                        message:
                                            "กรุณาใส่รหัสพนักงานเป็นตัวเลข 7 หลัก",
                                    },
                                })}
                                type="text"
                                // value={employeeCode}
                                // onChange={(e) =>
                                //     setemployeeCode(e.target.value)
                                // }
                                maxLength={7}
                                required
                                pattern="^[0-9]{7}$"
                            />
                            {errors.employeeCode ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.employeeCode.message}
                                </Form.Control.Feedback>
                            ) : null}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            ชื่อ-นามสกุล:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                {...register("firstName", {
                                    required: "กรุณาใส่ชื่อจริง",
                                })}
                                type="text"
                                // value={firstName}
                                // onChange={(e) => setfirstName(e.target.value)}
                                required
                            />
                            {errors.firstName ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName.message}
                                </Form.Control.Feedback>
                            ) : null}
                        </Col>
                        <Col sm="4">
                            <Form.Control
                                {...register("lastName", {
                                    required: "กรุณาใส่นามสกุล",
                                })}
                                type="text"
                                // value={lastName}
                                // onChange={(e) => setlastName(e.target.value)}
                                required
                            />
                            {errors.lastName ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName.message}
                                </Form.Control.Feedback>
                            ) : null}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            แผนก:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Select
                                {...register("department", {
                                    required: "กรุณาเลือกแผนก",
                                })}
                                // defaultValue={department}
                                // onChange={(e) => setdepartment(e.target.value)}
                                required
                            >
                                <option></option>
                                {Dept.map((dept, idx) => (
                                    <option key={idx}>{dept}</option>
                                ))}
                            </Form.Select>
                            {errors.department ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.department.message}
                                </Form.Control.Feedback>
                            ) : null}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            ประเภท:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Check
                                {...register("isAdmin")}
                                type="switch"
                                label="ผู้ดูแลระบบ"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            รหัสผ่าน:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                {...register("password", {
                                    required: "กรุณาใส่รหัสผ่าน",
                                    minLength: {
                                        value: 6,
                                        message: "รหัสผ่านขั้นต่ำ 6 ตัวอักษร",
                                    },
                                })}
                                type="password"
                                required
                                minLength={6}
                            />
                            {errors.password ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.password.message}
                                </Form.Control.Feedback>
                            ) : null}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            ยืนยันรหัสผ่าน:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                {...register("confirmPassword", {
                                    required: "กรุณาใส่รหัสผ่าน",
                                    validate: {
                                        notMatch: (value) =>
                                            value === watch("password"),
                                    },
                                })}
                                type="password"
                                pattern={watch("password")}
                                required
                                className="invalid"
                            />
                            {errors.confirmPassword?.type === "notMatch" && (
                                <p className="text-danger text-small mb-0">
                                    รหัสผ่านไม่ตรงกัน
                                </p>
                            )}
                        </Col>
                    </Form.Group>
                    <div className="d-block">
                        <Button variant="success" type="submit">
                            ตกลง
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => history.goBack()}
                        >
                            ยกเลิก
                        </Button>
                    </div>
                </Form>
            </div>
            <Alert
                className="mt-3 text-center"
                variant="danger"
                show={alertUserError.length > 0 ? true : false}
            >
                {alertUserError}
            </Alert>
        </div>
    );
}

export default AdminUserCreate;
