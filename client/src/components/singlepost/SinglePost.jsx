import "./singlePost.css";
// import { Link } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";
import Back from "../back/Back";
import { axiosInstance } from "../../config";
import { PicBaseUrl } from "../../imageBaseUrl";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

   

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <>
    <div className="singlePost">
      <div className="singlePostWrapper">
        { post.photo && (
          <img className="singlePostImg" src={PicBaseUrl +  post.photo} alt="" />
        )}
        <h1 className="singlePostTitle">
          { post.title}
          { post.username === user?.username && (
            <div className="singlePostEdit">
              <i class="fa-solid fa-pen"></i>
              <i class="fa-solid fa-trash" onClick={handleDelete}></i>  
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">By :
            <Link to={`/?user=${ post.username}`} className="link">
               { post.username}
            </Link>
          </span>
          <span className="singlePostDate">
            Posted {new Date( post.createdAt).toLocaleDateString()}
          </span>

        </div>
          <Back/>
        <div className="singlePostText">
          <pre className="posttext">{ post.desc}</pre>
        </div>
        
      </div>
    </div>
    </>
  );
}
