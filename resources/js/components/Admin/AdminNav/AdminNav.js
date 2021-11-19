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
import {
    BsFillCollectionFill,
    BsFillFileEarmarkPersonFill,
} from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import { IoStorefrontSharp } from "react-icons/io5";

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
                    <MenuItem
                        icon={<MdDashboard />}
                        onClick={() => onToggleClick()}
                    >
                        แดชบอร์ด
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="round">
                    <SubMenu title="คำสั่งซื้อ" icon={<FaThList />}>
                        <MenuItem>
                            คำสั่งซื้อ <Link to="/admin/order" />
                        </MenuItem>
                        <MenuItem>
                            รายละเอียด
                            <Link to="/admin/order-detail" />
                        </MenuItem>
                        <MenuItem>
                            การชำระเงิน <Link to="/admin/order-payment" />
                        </MenuItem>
                        <MenuItem>
                            สรุปยอดกับร้านค้า <Link to="/admin/order-summary" />
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<BsFillCollectionFill />}>
                        จัดการสินค้า <Link to="/admin/product" />
                    </MenuItem>
                    <MenuItem icon={<IoStorefrontSharp />}>
                        จัดการร้านค้า <Link to="/admin/vendor" />
                    </MenuItem>
                    <MenuItem icon={<BsFillFileEarmarkPersonFill />}>
                        จัดการผู้ใช้ <Link to="/admin/user" />
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="round">
                    <MenuItem icon={<FiLogOut />} onClick={() => onLogout()}>
                        ออกจากระบบ
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default AdminNav;
