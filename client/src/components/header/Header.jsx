import React from "react";
import "./header.css";
import bgImg from "../images/bg.jpg";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerTitle">
          <span className="headerTitleSm">React & Node</span>
          <span className="headerTitleLg">Blog</span>
        </div>

        <img className="headerImg" src={bgImg} alt="img" />
      </div>
    </>
  );
};

export default Header;
