import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import HomeIcon from '@mui/icons-material/Home';



import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

//import logo from "../../images/logo_transparent.png";
import { PicBaseUrl } from "../../imageBaseUrl";

var logo = PicBaseUrl + "eatout.png"
// https://storage.googleapis.com/snackyo/eatout.png
export default function Navbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" color="inherit">
      <Container maxWidth="xl" className="navContainer">
        <Toolbar>
          <div className="desktopLogo">
            <Link className="link" to="/">
              <img src={logo} alt="" width="70px" height="70px" />
            </Link>
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Tooltip title="Explore us">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/">
                        <p className="leftIcon">
                          <HomeIcon />
                          Explore
                        </p>
                      </Link>
                    </Typography>
                  </MenuItem>
                </Tooltip>

                <Tooltip title="Find some menu ?">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/Menus">
                        <p className="leftIcon">
                          <ChromeReaderModeIcon />
                          Menu
                        </p>
                      </Link>
                    </Typography>
                  </MenuItem>
                </Tooltip>

                <Tooltip title="Blog page">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/Blog">
                        <p className="leftIcon">
                          <ContentPasteSearchIcon /> Event
                        </p>
                      </Link>
                    </Typography>
                  </MenuItem>
                </Tooltip>
                <Tooltip title="QR code">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        <Link to='/qr'>
                      <p className="leftIcon">
                        <QrCodeScannerIcon /> QR Code
                      </p>
                        </Link>
                    </Typography>
                  </MenuItem>
                </Tooltip>
              </Button>
            </Menu>
            <div className="mobileLogo">
              <Link className="link" to="/">
                <img src={logo} alt="" width="70px" height="65px" />
              </Link>
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{ color: "white", display: "flex" }}
            >
              <Tooltip title="Whats new !">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link className="centerIcon" to="/">
                      <HomeIcon />
                      <p>Explore</p>
                    </Link>
                  </Typography>
                </MenuItem>
              </Tooltip>

              <Tooltip title="Find some menu ?">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/Menus">
                      <p className="centerIcon">
                        <ChromeReaderModeIcon />
                        <p>Menu</p>
                      </p>
                    </Link>
                  </Typography>
                </MenuItem>
              </Tooltip>

              <Tooltip title="Blog page">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/Blog">
                      <p className="centerIcon">
                        <ContentPasteSearchIcon /> <p>Event</p>
                      </p>
                    </Link>
                  </Typography>
                </MenuItem>
              </Tooltip>

              <Tooltip title="Get QR !">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/qr">
                      <p className="centerIcon">
                        <QrCodeScannerIcon /> <p>QR</p>
                      </p>
                    </Link>
                  </Typography>
                </MenuItem>
              </Tooltip>
              
            </Button>
          </Box>

          <div className="right">
            {user ? (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <div className="topImg">
                    <img
                      src={user.profilePic=="" ? PicBaseUrl+"noPreview.png" : PicBaseUrl+user.profilePic} 
                    />
                  </div>
                  <i class="rightIcon fa-solid fa-caret-down"></i>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link className="link" to={"/profileinfo"}>
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className="link" to={"/Menutemplate"}>
                      Create Menu
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className="link" to={"/Blog"}>
                      Create Event
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <li className="rightText" onClick={handleLogout}>
                      {user && "Logout"}
                    </li>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <i class="rightIcon fa-solid fa-circle-user"></i>
                  <i class="rightIcon fa-solid fa-caret-down"></i>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link className="link" to="/Login">
                      LOGIN
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className="link" to="/Register">
                      SIGNUP
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
