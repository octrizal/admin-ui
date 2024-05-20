import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo">Store</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LIST</p>
          <Link to="/users">
            <li>
              <PersonIcon className="user" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products">
            <li>
              <CategoryIcon className="product" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <LocalGroceryStoreIcon className="orders" />
            <span>Orders</span>
          </li>
          {/* Tambahkan menu Categories di bawah Orders */}
          <Link to="/categories">
            <li>
              <CategoryIcon className="categories" />
              <span>Categories</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="profile" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className="logout" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch ({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch ({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;
