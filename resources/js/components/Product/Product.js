import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Row,
    Button,
    ButtonGroup,
    ToggleButton,
    Form,
} from "react-bootstrap";
import "./Product.css";
import ConfigContext from "../Context/ConfigContext";
import AuthContext from "../Context/AuthContext";
import { BsCartFill, BsArrowUpCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

function Product() {
    const [prodList, setprodList] = useState([]);
    const [search, setsearch] = useState("");
    const [categoryList, setcategoryList] = useState([]);
    const [activeCategory, setactiveCategory] = useState(1);
    const [goToTopBtnVisible, setgoToTopBtnVisible] = useState(false);

    const cc = useContext(ConfigContext);
    const userId = useContext(AuthContext);
    const cartContext = useContext(AuthContext);

    const fetchProducts = async () => {
        await axios.get("/api/product/" + activeCategory).then((res) => {
            // console.log(res.data);
            setprodList(res.data);
        });
    };

    useLayoutEffect(() => {
        axios.get("/api/category").then((res) => {
            // console.log(res.data);
            setcategoryList(res.data);
        });
    }, [onSearch]);

    useEffect(() => {
        fetchProducts();
    }, [activeCategory]);

    function onSearch(e) {
        setsearch(e.target.value);
    }

    function onScroll() {
        let scrolled = document.documentElement.scrollTop;
        if (scrolled > 700) {
            setgoToTopBtnVisible(true);
        } else if (scrolled <= 700) {
            setgoToTopBtnVisible(false);
        }
    }

    function addToCart(e, prod) {
        e.preventDefault();

        let cart_obj = {
            product_id: prod.id,
            user_id: userId.userId,
            qty: 1,
            price: prod.price,
            total: prod.price,
        };
        // console.log(cart_obj);

        axios
            .post("/api/addcart", cart_obj)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ!",
                    text: res.data.message,
                    timer: 2000,
                    showConfirmButton: false,
                });
                cartContext.setcartCount(cartContext.cartCount + 1);
            })
            .catch((err) => console.log(err));
    }

    window.addEventListener("scroll", onScroll);

    return (
        <Container>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Col>
                    <ButtonGroup size="sm" className="mb-3">
                        {categoryList.map((category, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant="warning"
                                name="radio"
                                value={category.id}
                                checked={activeCategory === category.id}
                                onChange={() => setactiveCategory(category.id)}
                            >
                                {activeCategory === category.id ? (
                                    <strong>{category.name}</strong>
                                ) : (
                                    category.name
                                )}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col style={{ display: "flex", justifyContent: "end" }}>
                    <ButtonGroup size="sm">
                        <Form.Control
                            type="text"
                            placeholder="ค้นหาสินค้าที่นี่..."
                            value={search}
                            onChange={(e) => onSearch(e)}
                        ></Form.Control>
                        <Button variant="secondary" disabled>
                            <FaSearch />
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                {prodList
                    .filter((prod) => prod.name.includes(search))
                    .map((prod, idx) => (
                        <Col lg={2} md={3} sm={4} xs={6} key={idx}>
                            <Card className="product-card mb-2">
                                <Card.Img
                                    variant="top"
                                    src={
                                        "/products/" +
                                        prod.id +
                                        "/" +
                                        prod.name +
                                        ".jpg"
                                    }
                                />
                                <Card.Body style={{ display: "block" }}>
                                    <Card.Title className="prod-title">
                                        {prod.name}
                                    </Card.Title>
                                    <Card.Text className="prod-description">
                                        {prod.description}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>{prod.price} </strong>
                                        {cc.currency_symbol}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={(e) => addToCart(e, prod)}
                                    >
                                        <BsCartFill
                                            style={{ marginBottom: "5" }}
                                        />{" "}
                                        เพิ่มใส่รถเข็น
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
            {goToTopBtnVisible ? (
                <BsArrowUpCircleFill
                    style={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        cursor: "pointer",
                    }}
                    className="go-top"
                    size={28}
                    color="#3936f7"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                />
            ) : null}
        </Container>
    );
}

export default Product;
