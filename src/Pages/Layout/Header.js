import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

export default function Header({ drawerWidth }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userName =
    user.FullName ||
    user.fullName ||
    user.UserName ||
    user.username ||
    "Admin";

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const handleChangePassword = () => {
    handleCloseMenu();
    navigate("/change-password");
  };

  const handleLogout = () => {
    handleCloseMenu();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#0D47A1"
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          ScanStock Warehouse System
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="body2"
          sx={{
            mr: 1,
            display: {
              xs: "none",
              sm: "block"
            }
          }}
        >
          Welcome, {userName}
        </Typography>

        <Tooltip title="Account menu">
          <IconButton
            color="inherit"
            onClick={handleOpenMenu}
            size="large"
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>

            Profile Management
          </MenuItem>

          <MenuItem onClick={handleChangePassword}>
            <ListItemIcon>
              <LockResetIcon fontSize="small" />
            </ListItemIcon>

            Change Password
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}