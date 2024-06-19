import React from "react";
import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const { dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handeLogout = () => {
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
          <li onClick={handeLogout}>
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
