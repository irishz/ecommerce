import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";

function Home() {
    const [user, setuser] = useState("");
    const [prodList1, setprodList1] = useState([]);
    const [prodList2, setprodList2] = useState([]);

    useEffect(() => {
        axios.get("/api/user").then((res) => {
            // console.log(res.data);
            setuser(res.data.name);
        });

        axios.get("/api/product-all").then((res) => {
            setprodList1(res.data);
        });
    }, []);

    return (
        <Container>
            <h4>สินค้ามาแรง</h4>
            {
                prodList1.filter(
                    (prod) =>
                        prod.id === Math.floor(Math.random() * prodList1.length)
                ).length
            }
            <Carousel>
                <Carousel.Item>
                    <img
                        width={150}
                        height={150}
                        className="d-block w-100"
                        src={"/products/" + 31 + "/" + "M150" + ".jpg"}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default Home;
