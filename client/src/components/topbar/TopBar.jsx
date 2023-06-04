import React from "react";
import "./topbar.css";
import { FaFacebookSquare } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { BsPinterest } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import userImg from "../images/test1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { BiUserCircle } from "react-icons/bi";

const TopBar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(Context);

  const handleLogout = (e) => {
    const flag = window.confirm("Are You Sure?");
    if(!flag) return;
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <a target="_blank" href="https://www.google.com">
            <FaFacebookSquare className="topIcon" />
          </a>

          <GrTwitter className="topIcon" />
          <BsPinterest className="topIcon" />
          <BsInstagram className="topIcon" />
        </div>
        <div className="topCenter">
          <ul className="topList">
            <NavLink to="/" className="link">
              <li className="topListItem ">HOME</li>
            </NavLink>
            <NavLink to={"/about"} className="link">
              <li className="topListItem">ABOUT</li>
            </NavLink>
            <NavLink to={"/contact"} className="link">
              <li className="topListItem">CONTACT</li>
            </NavLink>

            <NavLink to={"/write"} className="link">
              <li className="topListItem">WRITE</li>
            </NavLink>

            {/* <NavLink to={"/login"} className="link">
              <li className="topListItem">{user || "LOGIN"}</li>
            </NavLink> */}

            {/* <NavLink to={"/logout"} className="link"> */}
            <li className="topListItem" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
            {/* </NavLink> */}
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <NavLink to={"/settings"}>
              <fieldset className="userImageField">
                {user.profile ? (
                  <img src={user.profile} alt="img" />
                ) : (
                  <BiUserCircle className="userImageNone"/>
                )}
              </fieldset>
            </NavLink>
          ) : (
            <>
              <NavLink to={"/login"} className="link loginReg">
                <>{"LOGIN"}</>
              </NavLink>
              <NavLink to={"/register"} className="link loginReg">
                <> {"REGISTER"}</>
              </NavLink>
            </>
          )}

          <BiSearch className="searchIcon" />
        </div>
      </div>
    </>
  );
};

export default TopBar;
