import Post from "../post/Post";
import "./posts.css";
import Container from '@material-ui/core/Container';





export default function Posts({posts}) {
  return (
    <Container className="postsBody">
        <div className="posts">
        {posts.map((p) => (
          <Post post={p}  />
          ))}
        </div>
    </Container>
  );
}
