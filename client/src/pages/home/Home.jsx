import React from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  
  const search = (location.search);

  const fetchPost = async () => {
    try {
      // const response = await fetch("/posts/");
      // const json = await response.json();
      const response = await axios.get(`/api/posts/${search}`);

      setPosts(response.data);
      console.log(posts);
    } catch (error) {
      alert("Server Error");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  // useEffect(() => {
  //   console.log(posts,'f');
  // }, [posts]);


  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />

        <Sidebar />
      </div>
    </>
  );
};

export default Home;
