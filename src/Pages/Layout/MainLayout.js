import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppHeader from "./Header";
import SideMenu from "./SideNav";
import Footer from "./Footer";

const drawerWidth = 240;

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader drawerWidth={drawerWidth} />

      <SideMenu drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}