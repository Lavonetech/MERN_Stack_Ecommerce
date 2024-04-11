import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Store } from "./Store";
import { Avatar } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
const drawerWidth = 240;
const navItems = [
  { name: "Home", url: "/" },
  { name: "Signup", url: "/signup" },
  { name: "Login", url: "/login" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For controlling the menu
  const [isAdmin, setIsAdmin] = useState(false);
  // difine cart
  const { state } = useContext(Store);
  const { cart } = state;

  // useEffect(() => {
  // //   const adminUser = async () => {
  // //     try {
  // //       const response = await axios.get("http://localhost:5002/userdetails");

  // //       if (response) {
  // //         setIsAdmin(response.data);
  // //         if(isAdmin.isAdmin===true){ 
  // //           console.log('you are a admin')
  // //         }
  // //       }
  // //     } catch (error) {
  // //       console.error(error);
  // //       console.log("server error");
  // //     }
  // //   };
  // //   adminUser();
  // // }, []);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };

  // Perform logout logic
  const cookies = document.cookie;
  const token = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("jwt="));


  const handleLogout = () => {
    // Get all the cookies
    const cookies = document.cookie;

    // Split the cookies string and find the 'jwt' cookie
    const jwt = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith("jwt="));

    if (jwt) {
      // Set the 'jwt' cookie to an empty value and expire it
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // Refresh the page
    window.location.href='/login';
  };
  const AdminLogin = async () => {
    try {
      const cookie = document.cookie;
      const tokenCookie = cookie.split(";").find((cookie) => cookie.trim().startsWith("jwt="));
  
      if (tokenCookie) {
        const tokenValue = tokenCookie.split('=')[1];  // Extract the token value
        const jwtToken = JSON.parse(atob(tokenValue.split('.')[1]));  // Decode the token
        const isAdmin = jwtToken.user.isAdmin;  // Access isAdmin property directly
  
        setIsAdmin(isAdmin);
      } else {
        setIsAdmin(false);
        console.log("You are not an admin");
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    AdminLogin();
  }, []);
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Lavontech
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component="a"
              href={item.url}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "#fff",
                fontSize: "28px",
              }}
              to={"/"}
            >
              E Store{" "}
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              flex: 1, // Grow to take up available space
              marginRight: "16px", // Adjust margin as needed
            }}
          >
            {/* Search Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                borderRadius: "4px",
                padding: "4px",
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Box>

          {/* Rest of the code */}
          {token ? (
            <>
              <Link to="/cart">
                <IconButton sx={{ marginRight: "-50px", color: "#fff" }}>
                  <ShoppingCartIcon />
                  {cart.cartItems.length > 0 && (
                    <Box
                      sx={{
                        position: "relative",
                        top: "-1rem",
                        left: "-0.5rem",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        width: "15%",
                        color: "#ffffff",
                        fontSize: "14px",
                        textAlign: "center",
                        marginTop: "0.5rem",
                      }}
                    >
                      {cart.cartItems.length}
                    </Box>
                  )}
                </IconButton>
              </Link>
              <Button
                onClick={handleMenuOpen}
                sx={{ color: "#fff", marginRight: "10px" }} // Adjust the marginRight value to your preference
              >
                <Avatar src="/broken-image.jpg" />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem>Settings</MenuItem>
              </Menu>
            </>
          ) : (
            navItems.map((item) => (
              <Button
                key={item.name}
                component="a"
                href={item.url}
                sx={{ color: "#fff", marginRight: "10px" }} // Adjust the marginRight value to your preference
              >
                {item.name}
              </Button>
            ))
          )}
          { isAdmin &&(<div><Button  href="/createproduct" sx={{ background:'#f85606',color: "#fff", marginRight: "10px" }}>Create product</Button></div>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
