import "./header.css"
import { Link } from "react-router-dom";



export default function Header() {
  return (
    <div className="header">
        <img className="headerImg" src="https://images.pexels.com/photos/10032377/pexels-photo-10032377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
        <div className="headerTitles">
            <span className="headerTitlesSm">สร้างออนไลน์เมนูสำหรับร้านของคุณได้แล้ววันนี้</span>
            <span className="headerTitlesLg">EATOUT</span>
            <Link to={'/Menutemplate'}>
            <span className="headerBtn">สนใจสร้างออนไลน์เมนู</span>
            </Link>
        </div>
    </div>
  )
}
