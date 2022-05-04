import "./post.css";
import { Link } from "react-router-dom";
import { PicBaseUrl } from "../../imageBaseUrl";


export default function Post({ post }) {
  
  return (
    <Link to={`/post/${post._id}`} className="post">
    <div className="postCard">
      {post.photo && <img className="postImg" src={PicBaseUrl + post.photo} alt="" />}
      <div className="postInfo">
{/*         <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div> */}

        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <div className="postBottom">
          <span className="postAuthor">
            <Link to={`/?user=${post.username}`} className="link">
              <i class="fa-solid fa-user"></i>
              <a>{post.username}</a>
            </Link>
          </span>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}
