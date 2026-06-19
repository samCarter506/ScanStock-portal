import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from "@mui/material";

export default function Header({
  drawerWidth
}) {
  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor:'#0D47A1'
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

        <Typography variant="body2">
          Welcome Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
}