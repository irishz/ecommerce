import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Form, Button, Row, Col, Figure } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";

function AdminProductDetail(props) {
    const prodData = useLocation();
    const history = useHistory();
    const [vendList, setvendList] = useState([]);
    const [prodName, setprodName] = useState(prodData.state.name);
    const [prodCode, setprodCode] = useState(prodData.state.product_code);
    const [prodDescription, setprodDescription] = useState(
        prodData.state.description
    );
    const [prodActive, setprodActive] = useState(prodData.state.active);
    const [prodPrice, setprodPrice] = useState(prodData.state.price);
    const [prodVend, setprodVend] = useState(prodData.state.vendor_id);
    const [prodCategory, setprodCategory] = useState(
        prodData.state.category_id
    );
    const [prodImage, setprodImage] = useState([]);
    const [prodImageData, setprodImageData] = useState(null);
    const [prodImageURL, setprodImageURL] = useState(
        "/products/" + prodData.state.id + "/" + prodData.state.name + ".jpg"
    );
    const [alertUpdate, setalertUpdate] = useState("");

    useLayoutEffect(() => {
        axios.get("/api/vendors").then((res) => {
            // console.log(res.data);
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
        let productActive;
        if (prodActive) {
            productActive = 1;
        } else {
            productActive = 0;
        }

        let prodObj = {
            name: prodName,
            product_code: prodCode,
            description: prodDescription,
            active: productActive,
            price: prodPrice,
            category_id: prodCategory,
            vendor_id: prodVend,
        };
        console.log(prodObj);
        if (prodImage.length > 0) {
            axios.post(
                "/api/image/upload/" + prodData.state.id + "/" + prodName,
                prodImageData
            );
        }

        axios
            .put("/api/product/update/" + prodData.state.id, prodObj)
            .then((res) => {
                setalertUpdate(res.data.message);
            });
    }

    return (
        <div>
            <h4 className="topic">{prodData.state.name}</h4>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ID:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            defaultValue={prodData.state.id}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        ชื่อสินค้า:
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            type="text"
                            value={prodName}
                            onChange={(e) => setprodName(e.target.value)}
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
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={prodDescription}
                            onChange={(e) => setprodDescription(e.target.value)}
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
                    <Form.Label column sm="1">
                        Active:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Check
                            type="switch"
                            onChange={() => setprodActive(!prodActive)}
                            checked={prodActive > 0 ? true : false}
                        />
                    </Col>
                    <Form.Label column sm="1">
                        หมวดหมู่:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Select
                            onChange={(e) => setprodCategory(e.target.value)}
                        >
                            <option value={prodCategory}>
                                {prodCategory > 1 ? "ของแห้ง" : "ของใช้"}
                            </option>
                            <option value={1}>ของใช้</option>
                            <option value={2}>ของแห้ง</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
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

export default AdminProductDetail;
