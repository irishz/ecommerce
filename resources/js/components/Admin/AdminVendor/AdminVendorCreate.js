import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Button, Alert, Col } from "react-bootstrap";
import { useHistory } from "react-router";

function AdminVendorCreate() {
    const history = useHistory();
    const [vendName, setvendName] = useState("");
    const [alertCreateMsg, setalertCreateMsg] = useState("");

    function onCreate() {
        let vendObj = {
            name: vendName,
        };

        axios.post("/api/vendor/create", vendObj).then((res) => {
            setalertCreateMsg(res.data.message);
            setTimeout(() => {
                setalertCreateMsg("");
                history.goBack();
            }, 3000);
        });
    }

    return (
        <div>
            <h4 className="topic">สร้างร้านค้า</h4>

            <Form>
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
                <Button variant="success" onClick={onCreate}>
                    สร้าง
                </Button>
                <Button variant="danger" onClick={() => history.goBack()}>
                    ย้อนกลับ
                </Button>
            </div>

            {alertCreateMsg ? (
                <Alert
                    variant="success"
                    dismissible
                    className="alert-success"
                    style={styles.alert}
                >
                    <strong>{alertCreateMsg}</strong>
                </Alert>
            ) : null}
        </div>
    );
}

export default AdminVendorCreate;

const styles = {
    alert: { marginTop: "10px", textAlign: "center" },
};
