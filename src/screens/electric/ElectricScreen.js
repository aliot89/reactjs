import React, { useState } from "react";
import LoginScreen from "../LoginScreen";
import SideBar from "../../components/SideBar";
import RoutesElectric from "../../config/RoutesElectric";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const ElectricScreen = () => {
  const [login, setLogin] = useState(false);
  const items = localStorage.getItem("accessToken");
  //   alert(items);
  const sideBarMenu = [
    {
      icon: <BadgeOutlinedIcon />,
      text: "Thông tin cá nhân",
      path: "/electric",
    },
    {
      icon: <AutorenewIcon />,
      text: "Trạng thái xử lý",
      path: "/electric/status",
    },
  ];
  return (
    <React.Fragment>
      {!items ? (
        <LoginScreen setLogin={setLogin} />
      ) : (
        <SideBar sideBarMenu={sideBarMenu}>
          <RoutesElectric />
        </SideBar>
      )}
    </React.Fragment>
  );
};

export default ElectricScreen;
