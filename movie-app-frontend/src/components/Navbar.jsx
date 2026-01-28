import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Menu, 
  MenuItem,
  IconButton
} from "@mui/material";
import { AccountCircle, Search, Menu as MenuIcon } from "@mui/icons-material";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleMenuClose();
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: scrolled ? "rgba(20, 20, 20, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: "none",
          transition: "all 0.3s ease",
          zIndex: 1000
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ 
                color: "#e50914", 
                fontWeight: "bold",
                cursor: "pointer",
                mr: 4,
                fontFamily: "Netflix Sans, Arial, sans-serif"
              }}
              onClick={() => navigate("/")}
            >
              NETFLIX
            </Typography>
            
            {isAuthenticated && (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate("/")}
                  sx={{ color: "white", fontSize: "14px" }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate("/search")}
                  sx={{ color: "white", fontSize: "14px" }}
                >
                  Search
                </Button>
                {user?.role === "admin" && (
                  <Button 
                    color="inherit" 
                    onClick={() => navigate("/admin")}
                    sx={{ color: "white", fontSize: "14px" }}
                  >
                    Admin
                  </Button>
                )}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" sx={{ display: { xs: "none", md: "flex" } }}>
                  <Search />
                </IconButton>
                
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AccountCircle />
                  <Typography sx={{ fontSize: "14px", display: { xs: "none", md: "block" } }}>
                    {user?.name || "User"}
                  </Typography>
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{
                    "& .MuiPaper-root": {
                      bgcolor: "#141414",
                      color: "white",
                    }
                  }}
                >
                  <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate("/login")}
                  sx={{ color: "white", fontSize: "14px" }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate("/register")}
                  sx={{ 
                    bgcolor: "#e50914", 
                    "&:hover": { bgcolor: "#f40612" },
                    fontSize: "14px"
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}

            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
