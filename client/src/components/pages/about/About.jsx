import React from "react";
import "./about.css";
import Container from "@material-ui/core/Container";
import Footer from "../../footer/Footer";
import Directory from "../../directory/Directory"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GridViewIcon from '@mui/icons-material/GridView';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import  { PicBaseUrl } from "../../../imageBaseUrl";

// import headerimg from "../../../images/mobilebanner.png";
// import headerimg1 from "../../../images/laptoptabletmobile.png";
// import footerImg from "../../../images/menuscan.jpg";

export default function About() {
  const headerimg  = PicBaseUrl + "aboutMobilebanner.png";
  const headerimg1 = PicBaseUrl + "aboutLaptop.png";
  const footerImg  = PicBaseUrl + "footerImg.png";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Container className="aboutBody">
        <div className="aboutTitle">
          <h1>
          <div className="aboutBrand">
          BUDVISTA</div> Online cannabis directory
          </h1>
          <p>Our platform design to gather thailand cannabis dispensary and community so all information can be found in one place.</p>
          <div className="aboutBtn">
          <Link to='/register' className="titleBtnLeft"><span>List my shop</span></Link>
          </div>
        </div>
        <div className="aboutImg">
          <img src={headerimg} alt="" />
        </div>
      </Container>

      <Container className="aboutBody2">
      <div className="aboutImg">
          <img src={headerimg1} alt="" />
        </div>
        <div className="aboutTitle">
          <ul className="aboutList">
          <h1>
          ระบบจัดการร้านค้าออนไลน์
          </h1>
          <li>ปรับเปลี่ยน รูปภาพข้อมูลได้ตลอดเวลา</li>
          <li>ลดค่าใช้จ่ายในการทำเมนูรูปเล่ม</li>
          <li>ระบบ QR shop สร้าง qr code ให้กับร้านค้าของคุณ</li>
          </ul>
          
          <div className="aboutBtn2">
          <a href="https://lin.ee/CsBrWSv" className="titleBtn2"><span>ทดลองใช้งานฟรี</span></a>
          </div>
        </div>
      </Container>



      <div className="about">
        <Container className="aboutService">
          <h1>ขั้นตอนการสร้างร้านค้า </h1>
          <Container className="aboutCards">
            <div className="aboutCard">
              <AssignmentIcon className="aboutIcons"/>
              <h4>กรอกข้อมูลร้านค้า</h4>
              <p>ใสข้อมูลร้านค้า ชื่อ ที่อยู่ เบอร์ ติดต่อๆ และอื่นๆ</p>
            </div>
            <div className="aboutCard">
              <GridViewIcon className="aboutIcons"/>
              <h4>สร้างหัวข้อเมนู</h4>
              <p>สร้างหัวขอหลักสำหรับสินค้า</p>
            </div>
            <div className="aboutCard">
              <AddCircleOutlineIcon className="aboutIcons"/>
              <h4>เพิ่มสินค้า</h4>
              <p>
              สร้างสินค้าและเพิ่มเข้าไปให้กับร้านค้าของคุณ
              </p>
            </div>
            <div className="aboutCard">
              <QrCodeScannerIcon className="aboutIcons"/>
              <h4>ดาวโหลด QR เพิ่อใช้งาน</h4>
              <p>
              สามารถเลือกใช้สี และ text ได้ตามต้องการ
              </p>
            </div>

          </Container>
        </Container>

<Container className="aboutFaq">
        <h1>Important Facts about Cannabis in Thailand.</h1>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: 'text.secondary' }}> Is Cannabis Legal In Thailand?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Marking a first for Asia, Thailand pulled cannabis from its list of narcotics on June 9, making its import, export, production, distribution, consumption and possession legal.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ color: 'text.secondary' }}>
          Where can i buy cannabis product 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Now that cannabis is legal, people are free to post about local shops that sell marijuana.
Please feel free to create posts with locations of other places that you’re aware of that are selling cannabis, legally.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ color: 'text.secondary' }}>
            What you need to know before buy cannabis
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
           <Typography sx={{ color: 'text.secondary' }}>
           Cannabis on domestic flight
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Airports of Thailand (AOT) has said that their rules only prevent passengers under 20 years of age from bringing cannabis on domestic flights. They have also said that there is no limit on the amount that can be transported (within the limits of airline luggage policies).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ color: 'text.secondary' }}>
          DON’T TOKE IN PUBLIC
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The government has since introduced a nuisance rule which, similar to tobacco smoking laws, aims to protect people from second-hand smoke exposure. In theory, this would prohibit cannabis from being smoked in public areas or if someone complains the offender will be issued a warning for the first offense. A 2,000 baht fine and up to a month in jail and a 25,000 baht fine can be issued for a second and subsequent offenses.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>


        <Container className="aboutContact">
        <div className="aboutContactText">
          <h1>
            Create online store for my shop now
          </h1>
          <Link to="/"><button className="requestBtn">Request demo</button></Link>
        </div>
      </Container>

        <div className="contactUs">
          <Container className="contactContainer">
            <div className="contactLeft">
              <img src={footerImg} alt="" />
              <Link to="/Menus">
                <div className="contactLeftText">
                  <h5>Click/Scan to view</h5>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </Link>
            </div>
            <div className="contactRight">
              <h1>Follow us on</h1>
              <div className="contactRightIcons">
                <a href="https://www.facebook.com/eatout.solutions">
                  <i class="contactRightIcon fa-brands fa-facebook-f"></i>
                </a>
                <i class="contactRightIcon fa-brands fa-instagram"></i>
                <i class="contactRightIcon fa-brands fa-line"></i>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Directory/>
      <Footer />
    </>
  );
}


// import React from "react";
// import "./about.css";
// import Container from "@material-ui/core/Container";
// import Footer from "../../footer/Footer";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";

// import headerimg from "../../../images/headerimg.jpg";
// import imgstep1 from "../../../images/menuscan6.jpg";
// import imgstep2 from "../../../images/menuscan7.jpg";
// import imgstep3 from "../../../images/menuscan4.jpg";
// import footerImg from "../../../images/menuscan.jpg";
// import vid from "../../../images/video-3.mp4";

// export default function About() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <Container className="aboutBody">
//         <div className="aboutTitle">
//           <h1>
//           - Looking for online menu for your restaurant ?
//           </h1>
//           <p> Join our community and create online menu with QR code for restaurant FREE today. </p>
//           <div className="aboutBtn">
//           <Link to="/" className="titleBtnLeft"><span>Explore</span></Link>
//           <Link to="/createshop" className="titleBtnRight"><span>Create menu</span></Link>
//           </div>
//         </div>
//         <div className="aboutImg">
//           <img src={headerimg} alt="" />
//         </div>
//       </Container>

//       <Container className="registerMe">
//         <div className="imgTop">
//           <video loop autoplay="autoplay" playsinline muted>
//             <source src={vid} />
//           </video>

//           <div className="registerContent">
//             <div className="contentTitle">
//               <h1>EATOUT</h1>
//             </div>
//             <div className="contentDesc">
//               <p>
//               we are a service platform that support your restaurant to display your menu online 
//               </p>
//               <Link className="registerMeBtn" to="/Menus">
//                 {" "}
//                 Checkout Menu
//               </Link>
              
//             </div>
//           </div>
//         </div>
//       </Container>

//       <div className="about">
//         <div className="aboutService">
//           <h1>How it works</h1>
//           <h3>
//             Listed your restaurant with us and get ready for a contactless expreience 
//           </h3>
//           <Container className="aboutCards">
//             <div className="aboutCard">
//               <img src={imgstep1} alt='create-menu'/>
//               <h4>Transform your offline menu to online</h4>
//               <p>Create your account and get start !</p>
//             </div>
//             <div className="aboutCard">
//             <img src={imgstep2} alt='create-menu'/>

//               <h4>Create store & Generate Qr code</h4>
//               <p>Create your shop then add your product to your online menu</p>
//             </div>
//             <div className="aboutCard">
//               <img src={imgstep3} alt='qr-menu'/>
//               <h4>Display Qr code on your media & store</h4>
//               <p>
//                 Copy your shop link address and paste to our QR generator to get
//                 your restaurant qr menu
//               </p>
//             </div>
//           </Container>
//         </div>

//         <Container className="aboutContact">
//         <div className="aboutContactText">
//           <h1>
//             - Need help setting up ? Let our support help you listed your menu online
//           </h1>
//           <a href="https://line.me/en/"><p>CONTACT &gt;</p></a>
//         </div>
//       </Container>

//         <div className="contactUs">
//           <Container className="contactContainer">
//             <div className="contactLeft">
//               <img src={footerImg} alt="" />
//               <Link to="/Menus">
//                 <div className="contactLeftText">
//                   <h5>Click/Scan to view Menu</h5>
//                   <i class="fa-solid fa-magnifying-glass"></i>
//                 </div>
//               </Link>
//             </div>
//             <div className="contactRight">
//               <h1>Follow us on</h1>
//               <div className="contactRightIcons">
//                 <a href="https://www.facebook.com/eatout.solutions">
//                   <i class="contactRightIcon fa-brands fa-facebook-f"></i>
//                 </a>
//                 <i class="contactRightIcon fa-brands fa-instagram"></i>
//                 <i class="contactRightIcon fa-brands fa-line"></i>
//               </div>
//             </div>
//           </Container>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
