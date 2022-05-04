import SideBar from '../../sidebar/SideBar'
import SinglePost from '../../singlepost/SinglePost'
import './single.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config";

export default function Single() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data)
    };
    getPost();
  }, [path]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // console.log(post)

  return (
    <>
    <div className='single'>
      <SinglePost post={post} />
      <SideBar shop ={post}/>
      </div>
    </>
  )
}
