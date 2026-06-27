import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import AppsIcon from '@mui/icons-material/Apps';
const menuItems = [
  {
    text: "Dashboard",
    icon: <AppsIcon />,
    path: "/dashboard"
  },
  {
    text: "Products",
    icon: <InventoryIcon />,
    path: "/products"
  },
  {
    text: "Barcode Scanner",
    icon: <LinkedCameraIcon />,
    path: "/scanner"
  },
  ,
  {
    text: "Barcodes",
    icon: <QrCodeScannerIcon />,
    path: "/generateBarcode"
  },
  {
    text: "Suppliers",
    icon: <LocalShippingIcon />,
    path: "/suppliers"
  },
  {
    text: "Receipts",
    icon: <ReceiptIcon />,
    path: "/receipts"
  },
   {
    text: "Outbound",
    icon: <ShoppingCartCheckoutIcon />,
    path: "/outbound"
  },
  {
    text: "Locations",
    icon: <FlagOutlinedIcon />,
    path: "/locations"
  },
  {
    text: "Customers",
    icon: <StorefrontIcon />,
    path: "/customers"
  },
  {
    text: "Reports",
    icon: <AssessmentOutlinedIcon />,
    path: "/reports"
  },
  {
    text: "Users",
    icon: <PeopleAltIcon />,
    path: "/users"
  }
];

export default function SideNav({
  drawerWidth

}) {
  const location = useLocation()
  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0D47A1",
          color: "#fff",
        },
      }}
    >
      <Toolbar />

      <Box
        sx={{
          textAlign: "center",
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#FFC107",
            fontWeight: 700
          }}
        >
          ScanStock
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                color: "#fff",

                "&.Mui-selected": {
                  backgroundColor: "rgba(255,193,7,0.15)",
                  borderLeft: "4px solid #FFC107"
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "rgba(255,193,7,0.2)"
                },

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.1)"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#FFC107",
                  minWidth: 40
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}