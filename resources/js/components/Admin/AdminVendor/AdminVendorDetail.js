import React, { useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";

function AdminVendorDetail() {
    const vendData = useLocation();
    const history = useHistory();

    const [vendId, setvendId] = useState(vendData.state.id);
    const [vendName, setvendName] = useState(vendData.state.name);
    const [alertUpdateMsg, setalertUpdateMsg] = useState("");

    function onSave() {
        let vendObj = {
            name: vendName,
        };

        axios.put("/api/vendor/update/" + vendId, vendObj).then((res) => {
            // console.log(res.data.message);
            setalertUpdateMsg(res.data.message);
            setTimeout(() => {
                setalertUpdateMsg("");
                history.goBack();
            }, 3000);
        });
    }

    return (
        <div>
            <h4 className="topic">{vendData.state.name}</h4>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ID:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control plaintext readOnly value={vendId} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ชื่อร้านค้า:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            type="text"
                            onChange={(e) => setvendName(e.target.value)}
                            value={vendName}
                        />
                    </Col>
                </Form.Group>
            </Form>

            <div className="d-block">
                <Button variant="success" onClick={onSave}>
                    บันทึก
                </Button>
                <Button variant="danger" onClick={() => history.goBack()}>
                    ย้อนกลับ
                </Button>
            </div>

            {alertUpdateMsg ? (
                <Alert
                    variant="success"
                    dismissible
                    className="alert-success"
                    style={styles.alert}
                >
                    <strong>{alertUpdateMsg}</strong>
                </Alert>
            ) : null}
        </div>
    );
}

export default AdminVendorDetail;

const styles = {
    alert: { marginTop: "10px", textAlign: "center" },
};
