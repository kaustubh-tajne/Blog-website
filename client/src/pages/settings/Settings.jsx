import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import profile from "../../components/images/test1.png";
import { BiUserCircle } from "react-icons/bi";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [hand, setHand] = useState(true);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [writeInfo, setWriteInfo] = useState({
    userId: user._id,
    username: "",
    email: "",
    password: "",
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInput(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handlewriteInfo = (e) => {
    const { name, value } = e.target;
    setWriteInfo({ ...writeInfo, [name]: value });
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    setHand(false);
    const { username, email, password } = writeInfo;

    if (!username || !password || !email) {
      return alert("Please fill all fields");
    }

    if (!selectedFile) {
      return alert("Select Profile Image one more time");
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.log("error");
    };
  };

  const handleDeleteAccount = async () => {
    const flag = window.confirm("Are you sure?");

    if (!flag) {
      return;
    }

    try {
      await axios.delete(`/api/users/${user._id}`, {
        data:{userId: user._id}
      });


      localStorage.clear();
      window.location.reload();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const uploadImage = async (image) => {
    try {
      await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({ data: image, writeInfo: writeInfo }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.reload();
      setHand(true);
      setFileInput("");
      setPreviewSource("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="settings">
        <div className="settingWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <button className="settingsDeleteTitle" onClick={handleDeleteAccount}>Delete Account</button>
          </div>

          <form action="" className="settingsForm">
            <div className="settingsPP">
              <div className="settingsPPIconDiv">
                {previewSource ? (
                  <label htmlFor="fileInput" className="profilePic">
                    <img src={previewSource} alt="image" style={{}} />
                  </label>
                ) : user.profile ? (
                  <img src={user.profile} alt="image" style={{}} />
                ) : (
                  <label htmlFor="fileInput" className="profilePic">
                    <BiUserCircle className="settingsPPIcon" />
                  </label>
                )}
              </div>

              <label htmlFor="fileInput" className="profilePic">
                <span>Selet profile picture</span>
              </label>

              <input
                type="file"
                id="fileInput"
                onChange={handleFileInput}
                style={{ display: "none" }}
                value={fileInput}
              />
            </div>

            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={writeInfo.username}
              onChange={handlewriteInfo}
              name="username"
            />

            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={writeInfo.email}
              onChange={handlewriteInfo}
              name="email"
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter password here.."
              value={writeInfo.password}
              onChange={handlewriteInfo}
              name="password"
            />

            {hand ? (
              <button className="settingsSubmit" onClick={handleSubmitFile}>
                Update
              </button>
            ) : (
              <button
                className="settingsSubmitWait settingsSubmit"
                onClick={handleSubmitFile}
                disabled={true}
              >
                Wait..
              </button>
            )}
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Settings;
