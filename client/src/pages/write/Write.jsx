import React from "react";
import "./write.css";
import { BsImageFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import bgImg from "../../components/images/bg.jpg";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Write = () => {
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const { user } = useContext(Context);
  const [hand, setHand] = useState(true);

  const [writeInfo, setWriteInfo] = useState({
    title: "",
    desc: "",
    username: user.username,
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
    const { title, desc } = writeInfo;
    if (!selectedFile || !title || !desc) {
      setHand(true);
      return alert("Please fill all fields");
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

  const uploadImage = async (image) => {
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ data: image, writeInfo: writeInfo }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setHand(true);
      setFileInput("");
      setPreviewSource("");
      setWriteInfo({
        title: "",
        desc: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="write">
        <div className="showImg">
          {/* <img src={bgImg} alt="img" /> */}
          {previewSource ? (
            <img src={previewSource} alt="image" style={{}} />
          ) : (
            <h1>Select Image Here...</h1>
          )}
        </div>

        <form className="writeForm" onSubmit={handleSubmitFile}>
          <div className="writeFormGroup">
            <h3>
              Select Image{" "}
              <label htmlFor="fileInput">
                <BiImageAdd className="writeIcon" />
              </label>
            </h3>
            <hr />

            <input
              className="form-control form-control-sm"
              // id="formFileSm"
              type="file"
              onChange={handleFileInput}
              value={fileInput}
              id="fileInput"
              style={{ display: "none" }}
            />
            <input
              type="text"
              placeholder="Title..."
              className="writeInput"
              autoFocus={true}
              name="title"
              value={writeInfo.title}
              onChange={handlewriteInfo}
            />
          </div>

          <div className="writeFormGroup">
            <textarea
              type="text"
              placeholder="Tell Your Story..."
              className="writeInput writeText"
              name="desc"
              value={writeInfo.desc}
              onChange={handlewriteInfo}
            ></textarea>
          </div>

          {hand ? (
            <button className="writeSubmit">Publish</button>
          ) : (
            <button
              className="writeSubmit"
              disabled={true}
              style={{ cursor: "not-allowed" }}
            >
              Wait
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Write;
