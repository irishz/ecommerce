import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from "react-router-dom";

import NavigationBar from "../NavigationBar/NavigationBar";
import Login from "../Login/Login";
import Home from "../Home/Home";
// import Register from "../Register/Register";
import ADMHome from "../Admin/AdminNav/AdminNav";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

import ConfigContext from "../Context/ConfigContext";
import AuthContext from "../Context/AuthContext";
import DeptContext from "../Context/DeptContext";

import Order from "../Order/Order";
import OrderProduct from "../Order/OrderProduct";
import Profile from "../Profile/Profile";
import AdminNav from "../Admin/AdminNav/AdminNav";
import AdminOrder from "../Admin/AdminOrder/AdminOrder";
import AdminHome from "../Admin/AdminHome/AdminHome";
import AdminUser from "../Admin/AdminUser/AdminUser";
import AdminUserDetail from "../Admin/AdminUser/AdminUserDetail";
import { Container } from "react-bootstrap";
import { departments } from "./Department";
import OrderPayment from "../Admin/AdminOrder/OrderPayment";
import OrderDetail from "../Admin/AdminOrder/OrderDetail";
import AdminProduct from "../Admin/AdminProduct/AdminProduct";
import AdminProductDetail from "../Admin/AdminProduct/AdminProductDetail";
import OrderSummary from "../Admin/AdminOrder/OrderSummary";
import AdminVendor from "../Admin/AdminVendor/AdminVendor";
import AdminVendorDetail from "../Admin/AdminVendor/AdminVendorDetail";
import AdminVendorCreate from "../Admin/AdminVendor/AdminVendorCreate";
import axios from "axios";
import AdminProductCreate from "../Admin/AdminProduct/AdminProductCreate";

function App() {
    const [userName, setuserName] = useState("");
    const [userId, setuserId] = useState(null);
    const [cartCount, setcartCount] = useState(0);
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(async () => {
        await axios.get("/api/user").then((res) => {
            if (res.data.is_admin === 1) {
                setisAdmin(true);
            } else {
                setisAdmin(false);
            }
            setuserName(res.data.first_name);
            setuserId(res.data.id);
        });
    }, [userName]);

    useEffect(async () => {
        await axios.get("/api/getcart").then((res) => {
            // console.log('cart: ' + res.data.length);
            setcartCount(res.data.length);
        });
    }, [cartCount]);

    if (!userName) {
        return <Login setuserName={setuserName} />;
    }

    return (
        <Router>
            <AuthContext.Provider
                value={{
                    userId: userId,
                    cartCount: cartCount,
                    setcartCount: setcartCount,
                }}
            >
                <ConfigContext.Provider value={{ currency_symbol: "บาท" }}>
                    <DeptContext.Provider value={departments}>
                        {isAdmin ? (
                            <Container className="m-0 p-0">
                                <div className="d-flex">
                                    <AdminNav
                                        username={userName}
                                        setuserName={setuserName}
                                    />
                                    <div
                                        style={{
                                            marginLeft: 15,
                                            marginTop: 15,
                                            width: "100%",
                                        }}
                                    >
                                        <Switch>
                                            <Route
                                                exact
                                                path="/admin"
                                                component={AdminHome}
                                            />
                                            <Route
                                                path="/admin/order"
                                                component={AdminOrder}
                                            />
                                            <Route
                                                path="/admin/order-detail"
                                                component={OrderDetail}
                                            />
                                            <Route
                                                path="/admin/order-payment"
                                                component={OrderPayment}
                                            />
                                            <Route
                                                path="/admin/order-summary"
                                                component={OrderSummary}
                                            />
                                            <Route
                                                path="/admin/product"
                                                component={AdminProduct}
                                            />
                                            <Route
                                                path="/admin/product-create"
                                                component={AdminProductCreate}
                                            />
                                            <Route
                                                path="/admin/product-detail"
                                                component={AdminProductDetail}
                                            />
                                            <Route
                                                path="/admin/vendor"
                                                component={AdminVendor}
                                            />
                                            <Route
                                                path="/admin/vendor-create"
                                                component={AdminVendorCreate}
                                            />
                                            <Route
                                                path="/admin/vendor-detail"
                                                component={AdminVendorDetail}
                                            />
                                            <Route
                                                path="/admin/user"
                                                component={AdminUser}
                                            />
                                            <Route
                                                path="/admin/user-detail"
                                                component={AdminUserDetail}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                            </Container>
                        ) : (
                            <div className="App">
                                <NavigationBar
                                    username={userName}
                                    setuserName={setuserName}
                                />

                                <div className="auth-wrapper">
                                    <div className="auth-inner">
                                        <Switch>
                                            <Route
                                                exact
                                                path="/shop"
                                                component={Home}
                                            />
                                            <Route
                                                path="/shop/login"
                                                component={() => (
                                                    <Login
                                                        setuserName={
                                                            setuserName
                                                        }
                                                    />
                                                )}
                                            />
                                            <Route
                                                path="/shop/product"
                                                component={Product}
                                            />
                                            <Route
                                                path="/shop/cart"
                                                component={Cart}
                                            />
                                            <Route
                                                path="/shop/order"
                                                component={Order}
                                            />
                                            <Route
                                                path="/shop/order-detail"
                                                component={OrderProduct}
                                            />
                                            <Route
                                                path="/shop/profile"
                                                component={Profile}
                                            />
                                            <Route
                                                path="/shop/admin"
                                                component={ADMHome}
                                            />
                                            {/* <Route path="/shop/register" component={Register} /> */}
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DeptContext.Provider>
                </ConfigContext.Provider>
            </AuthContext.Provider>
        </Router>
    );
}

export default withRouter(App);
