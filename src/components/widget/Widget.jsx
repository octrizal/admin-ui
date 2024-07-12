// Widget.jsx

import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  let data;

  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let queryCollection;
      switch (type) {
        case "user":
          queryCollection = collection(db, "users");
          break;
        case "order":
          queryCollection = collection(db, "products");
          break;
        case "earning":
          queryCollection = collection(db, "categories");
          break;
        default:
          break;
      }

      if (queryCollection) {
        try {
          const querySnapshot = await getDocs(queryCollection);
          const dataLength = querySnapshot.size; // Get the number of documents in the collection

          // Example calculation for percentage difference
          // This needs to be adjusted based on your specific requirements
          const lastMonthDataLength = dataLength; // Replace this with actual data length calculation
          const prevMonthDataLength = dataLength; // Replace this with actual data length calculation

          setAmount(lastMonthDataLength);
          setDiff(
            ((lastMonthDataLength - prevMonthDataLength) / prevMonthDataLength) * 100
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [type]);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "View all products",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "CATEGORIES",
        isMoney: false,
        link: "View all categories",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">
          {data.isMoney && "$"} {amount}
        </div>
        <div className="link">{data.link}</div>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
