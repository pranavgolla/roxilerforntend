import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="tabs-container">
      <Link to="/table" className="tab">
        Transaction Dashboard
      </Link>
      <Link to="/transaction" className="tab">
        Transaction Statistics
      </Link>
      <Link to="/bar" className="tab">
        Bar Chart
      </Link>
    </div>
  );
};

export default Header;
