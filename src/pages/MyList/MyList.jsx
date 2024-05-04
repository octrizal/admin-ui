import "./mylist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MyDatatable from "../../components/mydatatable/MyDatatable"; 
import Widget from "../../components/widget/Widget";

const MyList = () => {
  return (
    <h1>My List Page</h1>,
    <MyDatatable title="All Data" />,
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="widgets">
        <Widget type="user"/>
        <Widget type="order"/>
        <Widget type="earning"/>
        <Widget type="balance"/>
        </div>
        <MyDatatable />
      </div>
    </div>
  );
};

export default MyList;
