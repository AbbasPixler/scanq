import "./category.css";
import { Link } from "react-router-dom";
 
 
export default function Category({ category}) {
 
  return (
    <Link to={`/Menus/${category.name}`} className="category">
      {category.coverImage &&
     <img
      className="categoryImg"
      src={category.coverImage}
      alt={category.name}
    />
     
      }
      <div className="categoryInfo" >
        <span className="categoryTitle" >{category.name}</span>
      </div>
    </Link>
  );
}
