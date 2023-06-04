import React from "react";
import "./sidebar.css";
import sideImg from "../images/text2.png";
import { FaFacebookSquare } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { BsPinterest } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await axios.get("/api/catgories/");

        // console.log(res.data);
        setCat(res.data);
      } catch (error) {
        alert("Something Wrong");
      }
    };

    getCat();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img src={sideImg} alt="img" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            omnis similique, deleniti voluptas quibusdam laudantium.
          </p>
        </div>

        <div className="sidebarItem cat">
          <span className="sidebarTitle">Categories</span>
          <ul className="sidebarListItem">
            {cat.map((c) => {
              return (
                <>
                  <NavLink to={`/?cat=${c.name.toLowerCase()}`} className='link'>
                    <li>{c.name}</li>
                  </NavLink>
                </>
              );
            })}
          </ul>
        </div>

        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <FaFacebookSquare className="sidebarIcon" />
            <GrTwitter className="sidebarIcon" />
            <BsPinterest className="sidebarIcon" />
            <BsInstagram className="sidebarIcon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
