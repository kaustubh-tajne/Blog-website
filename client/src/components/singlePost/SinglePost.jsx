import React, { useState } from "react";
import "./singlePost.css";
import bgImg from "../images/bg.jpg";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BsTextIndentLeft } from "react-icons/bs";
import { useContext } from "react";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const id = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [titleU, setTitleU] = useState("");
  const [descU, setDescU] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [singleP, setSingleP] = useState({});

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);

        setSingleP(res.data);
        // console.log(res);
        setDescU(res.data.desc);
        setTitleU(res.data.title);
      } catch (error) {
        console.log(error);
        alert("Something Wrong");
      }
    };

    getSinglePost();
  }, [id]);

  const { title, username, desc, photo, categories, updatedAt, _id } = singleP;

  const handleDelete = async () => {
    const flag = window.confirm("Delete these post permanently");
    if (flag == false) {
      return;
    }
    try {
      await axios.delete(`/api/posts/${_id}`, {
        data: { username: user.username },
      });

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${_id}`, {
        data: { username: user.username, title: titleU, desc: descU },
      });

      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img
            src={photo ? photo : bgImg}
            alt="img"
            className="singlePostImg"
          />

          {updateMode ? (
            <input
              type="text"
              value={titleU}
              className="singlePostTitleInput"
              onChange={(e) => setTitleU(e.target.value)}
              autoFocus={true}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {username === user?.username && (
                <span className="singlePostEdit">
                  <FiEdit
                    className="singlePostIcon"
                    onClick={() => setUpdateMode(true)}
                  />
                  <RiDeleteBin6Line
                    className="singlePostIcon"
                    onClick={handleDelete}
                  />
                </span>
              )}
            </h1>
          )}

          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:{" "}
              <NavLink to={`/?user=${username}`} className="link">
                <b>@{username}</b>
              </NavLink>
            </span>
            <span className="singlePostDate">
              {new Date(updatedAt).toDateString()}
            </span>
          </div>

          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              placeholder="Type Here"
              value={descU}
              onChange={(e) => setDescU(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}

          {updateMode && (
            <div className="singlePostButton">
              <button type="button" onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
