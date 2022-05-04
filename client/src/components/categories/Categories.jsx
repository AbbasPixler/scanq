import Category from "../category/Category";
import "./categories.css";
import Container from "@material-ui/core/Container";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Categories({ categories }) {

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };


  return (
    <Container className="categoriesBody">
      <Container className="categoriesTitle">
        <h1>Category</h1>
      </Container>

        <MdChevronLeft
          size={25}
          className="slider-icon iconLeft"
          onClick={slideLeft}
        />
      <div className="categoriesContainer">
        <div className="categories" id="slider">
          {/* {categories.map(c=> (
            <Category/>
          ))} */}

          {categories.map((c) => (
            <Category category={c}/>
          ))}
        </div>


      </div>
        <MdChevronRight
          size={25}
          className="slider-icon iconRight"
          onClick={slideRight}
        />
    </Container>
  );
}
