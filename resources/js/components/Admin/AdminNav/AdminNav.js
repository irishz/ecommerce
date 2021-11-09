import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";

function AdminNav(props) {
    const [toggleSwitch, settoggleSwitch] = useState(false);
    const [redirect, setredirect] = useState(false);

    function onToggleClick() {
        settoggleSwitch(!toggleSwitch);
    }

    async function onLogout() {
        await axios.post("/api/logout");

        props.setuserName("");
        setredirect(true);
    }

    if (redirect) {
        <Redirect to="login" />;
    }

    return (
        <ProSidebar style={{ height: "100vh" }} collapsed={toggleSwitch}>
            <SidebarHeader>
                <Menu iconShape="round">
                    <MenuItem icon={<MdDashboard />}>
                        DashBoard <Link to="/admin" />
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="round">
                    <SubMenu title="Order" icon={<FaThList />}>
                        <MenuItem>
                            Order <Link to="/admin/order" />
                        </MenuItem>
                        <MenuItem>
                            Order Payment <Link to="/admin/order-payment" />
                        </MenuItem>
                        <MenuItem>
                            Order Issue <Link to="/admin/order-issue" />
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<FaThList />}>
                        Product <Link to="/admin/product" />
                    </MenuItem>
                    <MenuItem icon={<BsFillFileEarmarkPersonFill />}>
                        User <Link to="/admin/user" />
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="round">
                    <MenuItem icon={<FiLogOut />} onClick={() => onLogout()}>
                        Logout
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default AdminNav;
