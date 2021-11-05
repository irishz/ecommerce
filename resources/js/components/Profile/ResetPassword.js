import axios from "axios";
import React, { useState } from "react";
import { Form, Modal, Row, Alert, Button, Container } from "react-bootstrap";

function ResetPassword(props) {
    const [newPassword, setnewPassword] = useState("");
    const [alertReset, setalertReset] = useState("");
    const [textToShort, settextToShort] = useState(true);

    // console.log(props);

    function handleNewPswdChange(e) {
        setnewPassword(e.target.value);
        if (e.target.value.length < 6) {
            settextToShort(true);
        } else {
            settextToShort(false);
        }
    }

    function handleSubmit() {
        let obj = {
            id: props.user_id,
            newPassword: newPassword,
        };

        // console.log(obj);

        axios.put("/api/user/reset-password", obj).then((res) => {
            // console.log(res.data.message);
            setalertReset(res.data.message);
            setTimeout(() => {
                props.setmodalVisible(false);
                setalertReset("");
            }, 3000);
        });
    }

    return (
        <Modal show={props.modalVisible}>
            <Modal.Header>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pd-5">
                <Container>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => handleNewPswdChange(e)}
                            ></Form.Control>
                            {textToShort ? (
                                <Form.Text style={{ color: "tomato" }}>
                                    password must be at least 6 character.
                                </Form.Text>
                            ) : null}
                        </Form.Group>
                    </Form>
                    {alertReset.length > 0 ? (
                        <Alert variant="success">{alertReset}</Alert>
                    ) : null}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => props.setmodalVisible(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleSubmit()}
                    disabled={textToShort}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ResetPassword;