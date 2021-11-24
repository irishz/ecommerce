import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Form, Row, Col, Button, Figure } from "react-bootstrap";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import "../AdminNav/Admin.css";
function AdminProductCreate() {
    const [prodName, setprodName] = useState("");
    const [prodCode, setprodCode] = useState("");
    const [prodCategory, setprodCategory] = useState(1);
    const [prodDescription, setprodDescription] = useState("");
    const [prodPrice, setprodPrice] = useState(0);
    const [prodUnit, setprodUnit] = useState("");
    const [prodVend, setprodVend] = useState("");
    const [prodImage, setprodImage] = useState([]);
    const [prodImageData, setprodImageData] = useState(null);
    const [prodImageURL, setprodImageURL] = useState([]);
    const [vendList, setvendList] = useState([]);

    const history = useHistory();

    useLayoutEffect(() => {
        axios.get("/api/vendors").then((res) => {
            setvendList(res.data);
        });
    }, []);

    useEffect(() => {
        if (prodImage.length < 1) {
            return;
        }
        const newImageURL = [];
        prodImage.forEach((image) =>
            newImageURL.push(URL.createObjectURL(image))
        );
        setprodImageURL(newImageURL);
    }, [prodImage]);

    function handleImageChange(files) {
        setprodImage([...files]);
        let fd = new FormData();

        fd.append("myImage", files[0], files.name);

        setprodImageData(fd);
    }

    function onSave() {
        let prodObj = {
            category_id: prodCategory,
            vendor_id: parseInt(prodVend),
            product_code: prodCode,
            name: prodName,
            description: prodDescription,
            price: prodPrice,
            unit: prodUnit,
            qty: 0,
            active: 1,
        };

        console.log(prodObj);

        axios
            .all([
                axios.post("/api/product/create", prodObj),
                axios.post(
                    "/api/image/upload/" + 0 + "/" + prodName,
                    prodImageData
                ),
            ])
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "สำเร็จ!",
                    text: res[0].data.message + "และ" + res[1].data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                });
            })
            .catch((err) => {
                console.log(err.data);
            });
    }

    return (
        <div>
            <h4 className="topic">เพิ่มสินค้า</h4>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ชื่อสินค้า:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            type="text"
                            value={prodName}
                            onChange={(e) => setprodName(e.target.value)}
                            required
                        />
                    </Col>
                    <Form.Label column sm="2">
                        รหัสสินค้า:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            type="text"
                            value={prodCode}
                            onChange={(e) => setprodCode(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        รายละเอียด:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="text"
                            value={prodDescription}
                            onChange={(e) => setprodDescription(e.target.value)}
                        />
                    </Col>
                    <Form.Label column sm="2">
                        หน่วย:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            type="text"
                            value={prodUnit}
                            onChange={(e) => setprodUnit(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ราคา (บาท):
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            type="number"
                            min={0}
                            value={prodPrice}
                            onChange={(e) => setprodPrice(e.target.value)}
                        />
                    </Col>
                    <Form.Label column sm="2">
                        หมวดหมู่:
                    </Form.Label>
                    <Col sm="3">
                        <Form.Select
                            onChange={(e) => setprodCategory(e.target.value)}
                        >
                            <option value={1}>ของใช้</option>
                            <option value={2}>ของแห้ง</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ร้านค้า:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Select
                            onChange={(e) => setprodVend(e.target.value)}
                        >
                            <option value={prodVend}>
                                {vendList
                                    .filter((vend) => vend.id === prodVend)
                                    .map((vend) => vend.name)}
                            </option>
                            {vendList.map((vend, idx) => (
                                <option key={idx} value={vend.id}>
                                    {vend.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        รูปภาพ:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e.target.files)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"></Form.Label>
                    <Col sm="10">
                        <Figure>
                            <Figure.Image
                                src={prodImageURL}
                                width={150}
                                height={150}
                            ></Figure.Image>
                            <Figure.Caption>{prodName}</Figure.Caption>
                        </Figure>
                    </Col>
                </Form.Group>
            </Form>

            <div style={{ display: "flex" }}>
                <Button variant="success" onClick={() => onSave()}>
                    บันทึก
                </Button>
                <Button variant="danger" onClick={() => history.goBack()}>
                    ยกเลิก
                </Button>
            </div>
        </div>
    );
}

export default AdminProductCreate;
