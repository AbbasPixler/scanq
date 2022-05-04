import React from "react";
import "./events.css";
import Container from "@material-ui/core/Container";
import Posts from "../../posts/Posts";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config";

export default function Events() {
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts")
      setPosts(res.data)
    }
    fetchPosts()
  },[])
  return (
    <Container className="event">
      <div className="eventTitle">
        <h1>All Events</h1>
      </div>
      <Posts posts={posts} />
    </Container>
  );
}
