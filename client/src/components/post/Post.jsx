import React from "react";
import "./post.css";
import postImg from "../images/dm2.jpeg";
import postImg1 from "../images/bg.jpg";
import { BsTextIndentLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

// categories: (3) ['a', 'b', 'c']
// createdAt: "2022-06-17T13:23:01.684Z"
// desc: "These is web series"
// photo: ""
// title: "GOT"
// updatedAt: "2022-06-17T13:23:01.684Z"
// username: "username"
// __v: 0
// _id: "62ac803500982bcc672b430f"

const Post = ({ post }) => {
  const { title, username, desc, photo, categories, updatedAt, _id } = post;

  return (
    <>
      <div className="post">
        <img className="postImg" src={photo ? photo : postImg1} alt="img" />
        <div className="postInfo">
          <div className="postCats">
            {categories.map((cat) => {
              return <span className="postCat">{cat}</span>;
            })}
          </div>

          <NavLink to={`/posts/${_id}`} className="link">
            <span className="postTitle">{title}</span>
          </NavLink>
          <hr />
          <span className="postDate">{new Date(updatedAt).toDateString()}</span>
        </div>

        <NavLink to={`/posts/${_id}`} className="link">
          <p className="postDesc">{desc}</p>
        </NavLink>
      </div>
    </>
  );
};

export default Post;
