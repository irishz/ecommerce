import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Row,
    Button,
    Alert,
    ButtonGroup,
    ToggleButton,
} from "react-bootstrap";
import "./Product.css";
import ConfigContext from "../Context/ConfigContext";
import AuthContext from "../Context/AuthContext";

function Product() {
    const [prodList, setprodList] = useState([]);
    const [categoryList, setcategoryList] = useState([]);
    const [alertAddToCart, setalertAddToCart] = useState(null);
    const [activeCategory, setactiveCategory] = useState(1);

    const cc = useContext(ConfigContext);
    const userId = useContext(AuthContext);

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
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [activeCategory]);

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
                setalertAddToCart(res.data.message);
                setTimeout(() => {
                    setalertAddToCart(null);
                }, 3000);
            })
            .catch((err) => console.log(err));
    }

    return (
        <Container>
            {alertAddToCart ? (
                <Alert variant="success" dismissible className="alert-success">
                    <strong>{alertAddToCart}</strong>
                </Alert>
            ) : null}
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
            <Row>
                {prodList.map((prod, idx) => (
                    <Col lg={2} md={4} sm={6} xs={12} key={idx}>
                        <Card className="product-card mb-2">
                            <Card.Img
                                variant="top"
                                src='/public/storage/products/103/ปลาทูหอม 400 กรัม.jpg'
                            />
                            <Card.Body>
                                <Card.Title>{prod.name}</Card.Title>
                                <Card.Text className="prod-description">{prod.description}</Card.Text>
                                <Card.Text>
                                    <strong>
                                        {prod.price}
                                        {cc.currency_symbol}
                                    </strong>
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={(e) => addToCart(e, prod)}
                                >
                                    Add to cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Product;
