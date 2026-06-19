import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: "1px solid #E0E0E0",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography
        variant="body2"
        color="#0D47A1"
      >
        © 2026 ScanStock Warehouse Management System
      </Typography>
    </Box>
  );
}