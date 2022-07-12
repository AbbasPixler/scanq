import "./header.css"
import { Link } from "react-router-dom";
import  { PicBaseUrl } from "../../imageBaseUrl";
import MapIcon from '@mui/icons-material/Map';
var BudvistaBanner = PicBaseUrl + "BudvistaBanner.jpg"


export default function Header() {
  return (
    <div className="header">
        <img className="headerImg" src={BudvistaBanner} alt="" />
        <div className="headerHead">
          <h1>Find cannabis shop around you</h1>
          {/* <a href="#" className="headerBtn">View Map <MapIcon/>

</a> */}
<Link  className="headerBtn" to="/Maps">View Map <MapIcon/></Link>
        </div>
        {/* <div className="headerTitles">
            <span className="headerTitlesSm">สร้างออนไลน์เมนูสำหรับร้านของคุณได้แล้ววันนี้</span>
            <span className="headerTitlesLg">BUDVISTA</span>
            <Link to={'/Menutemplate'}>
            <span className="headerBtn">สนใจสร้างออนไลน์เมนู</span>
            </Link>
        </div> */}
    </div>
  )
}
