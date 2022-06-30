import "./header.css"
import { Link } from "react-router-dom";
import  { PicBaseUrl } from "../../imageBaseUrl";
var BudvistaBanner = PicBaseUrl + "BudvistaBanner.jpg"


export default function Header() {
  return (
    <div className="header">
        <img className="headerImg" src={BudvistaBanner} alt="" />
        <div className="headerTitles">
            <span className="headerTitlesSm">สร้างออนไลน์เมนูสำหรับร้านของคุณได้แล้ววันนี้</span>
            <span className="headerTitlesLg">BUDVISTA</span>
            <Link to={'/Menutemplate'}>
            <span className="headerBtn">สนใจสร้างออนไลน์เมนู</span>
            </Link>
        </div>
    </div>
  )
}
