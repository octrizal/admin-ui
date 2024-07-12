import React from "react";
import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        authDispatch({ type: "LOGOUT" });
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });
  };

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
            <Link to="/">
              <DashboardIcon className="icon dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LIST</p>
          <li>
            <Link to="/users">
              <PersonIcon className="icon user" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <ProductionQuantityLimitsIcon className="icon products" />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <CategoryIcon className="icon categories" />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/#">
              <LocalGroceryStoreIcon className="icon orders" />
              <span>Orders</span>
            </Link>
          </li>
          <p className="title">USER</p>
          <li>
            <Link to="/#">
              <AccountCircleIcon className="icon profile" />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <LogoutIcon className="icon logout" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption light"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption dark"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
