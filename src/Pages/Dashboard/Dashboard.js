import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
  Chip,
  Button
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import UploadIcon from "@mui/icons-material/Upload";
import RefreshIcon from "@mui/icons-material/Refresh";

import { GetDashboardData } from "../../Services/DashboardApi";

export default function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const response = await GetDashboardData();

      setDashboard(response.data);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  const s = dashboard.summary;

  const cards = [
    {
      title: "Products",
      value: s.totalProducts,
      icon: <InventoryIcon fontSize="large" />
    },
    {
      title: "Total Stock",
      value: s.totalStockQuantity,
      icon: <WarehouseIcon fontSize="large" />
    },
    {
      title: "Suppliers",
      value: s.totalSuppliers,
      icon: <LocalShippingIcon fontSize="large" />
    },
    {
      title: "Locations",
      value: s.totalLocations,
      icon: <FlagOutlinedIcon fontSize="large" />
    },
    {
      title: "Low Stock",
      value: s.lowStockCount,
      icon: <WarningAmberIcon fontSize="large" />
    },
    {
      title: "Out Of Stock",
      value: s.outOfStockCount,
      icon: <CancelIcon fontSize="large" />
    },
    {
      title: "Receipts Today",
      value: s.receiptsToday,
      icon: <DownloadDoneIcon fontSize="large" />
    },
    {
      title: "Outbound Today",
      value: s.outboundToday,
      icon: <UploadIcon fontSize="large" />
    }
  ];

  return (

    <Box p={3}>
        
      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
           sx={{
            color: "#0D47A1",
            fontWeight: 700
          }}
        >
          Dashboard
        </Typography>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={loadDashboard}
        >
          Refresh
        </Button>

      </Box>

      <Grid container spacing={3}>

        {cards.map((card) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={card.title}
          >

            <Card elevation={3}>

              <CardContent>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Box>

                    <Typography
                      color="#FFC107"
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="#0D47A1"
                    >
                      {card.value}
                    </Typography>

                  </Box>
 <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="#FFC107"
                    >
                       {card.icon}
                    </Typography>
                

                </Box>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

      <Grid
        container
        spacing={3}
        mt={2}
      >

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:2 }}>

            <Typography
              variant="h6"
              mb={2}
            >
              Low Stock Products
            </Typography>

            <TableContainer>

              <Table size="small">

                <TableHead>

                  <TableRow>

                    <TableCell>Barcode</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Minimum</TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {dashboard.lowStockProducts.map((p)=>(

                    <TableRow key={p._id}>

                      <TableCell>{p.Barcode}</TableCell>

                      <TableCell>{p.ProductName}</TableCell>

                      <TableCell>

                        <Chip
                          color="warning"
                          label={p.Quantity}
                        />

                      </TableCell>

                      <TableCell>
                        {p.MinimumStock}
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Paper>

        </Grid>

        <Grid item xs={12} md={6}>

          <Paper sx={{p:2}}>

            <Typography
              variant="h6"
              mb={2}
            >
              Recent Receipts
            </Typography>

            <TableContainer>

              <Table size="small">

                <TableHead>

                  <TableRow>

                    <TableCell>Receipt</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Date</TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {dashboard.recentReceipts.map((r)=>(

                    <TableRow key={r._id}>

                      <TableCell>
                        {r.ReceiptNumber}
                      </TableCell>

                      <TableCell>
                        {r.SupplierId?.SupplierName}
                      </TableCell>

                      <TableCell>
                        {new Date(r.ReceivedDate).toLocaleDateString()}
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Paper>

        </Grid>

        <Grid item xs={12}>

          <Paper sx={{p:2}}>

            <Typography
              variant="h6"
              mb={2}
            >
              Recent Outbound Transactions
            </Typography>

            <TableContainer>

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell>Reference</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {dashboard.recentOutbound.map((o)=>(

                    <TableRow key={o._id}>

                      <TableCell>
                        {o.OutboundNumber}
                      </TableCell>

                      <TableCell>
                        {o.CustomerId?.CustomerName}
                      </TableCell>

                      <TableCell>
                        {new Date(o.OutboundDate).toLocaleDateString()}
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </Paper>

        </Grid>

      </Grid>

    </Box>

  );

}