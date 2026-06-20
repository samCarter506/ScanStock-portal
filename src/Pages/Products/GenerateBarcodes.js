import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  CircularProgress
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import QrCodeIcon from "@mui/icons-material/QrCode";

import {
  GetProducts,
  GenerateBarcode
} from "../../Services/ProductsApi";

const API_URL = "http://localhost:4000";

export default function BarcodeGenerator() {
  const [products, setProducts] = useState([]);
  const [selectedBarcode, setSelectedBarcode] = useState("");

  const [productName, setProductName] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await GetProducts();

      const data = response.data || response || [];

      setProducts(data);
    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
        "Unable to load products"
      );
    }
  };

  const handleGenerateBarcode = async () => {
    if (!selectedBarcode) {
      setMessage("Please select a product first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await GenerateBarcode(
        selectedBarcode
      );

      if (!response.success) {
        setMessage(
          response.message ||
          "Unable to generate barcode"
        );

        return;
      }

      setProductName(
        response.product?.ProductName || ""
      );

      // Add timestamp so browser always loads the latest generated image
      setBarcodeUrl(
        `${API_URL}${response.barcodeUrl}?t=${Date.now()}`
      );
    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
        "Unable to generate barcode"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (!barcodeUrl) {
      setMessage("Generate the barcode first.");
      return;
    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 25px;
            }

            .label {
              display: inline-block;
              border: 1px solid #000;
              padding: 15px;
            }

            h3 {
              margin: 0 0 10px 0;
            }

            img {
              max-width: 100%;
            }
          </style>
        </head>

        <body>
          <div class="label">
            <h3>${productName}</h3>
            <img src="${barcodeUrl}" />
          </div>

          <script>
            window.onload = function () {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <Box p={2}>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Barcode Generator
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Select a product and generate its barcode label.
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Select Product
            </Typography>

            {message && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}

            <TextField
              select
              fullWidth
              label="Product"
              margin="normal"
              value={selectedBarcode}
              onChange={(e) => {
                setSelectedBarcode(e.target.value);
                setBarcodeUrl("");
                setMessage("");
              }}
            >
              <MenuItem value="">
                Select Product
              </MenuItem>

              {products.map((product) => (
                <MenuItem
                  key={product._id}
                  value={product.Barcode}
                >
                  {product.ProductName} - {product.Barcode}
                </MenuItem>
              ))}
            </TextField>

            <Button
              fullWidth
              variant="contained"
              startIcon={<QrCodeIcon />}
              sx={{ mt: 2 }}
              onClick={handleGenerateBarcode}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Barcode"}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 3,
              minHeight: 350,
              textAlign: "center"
            }}
          >
            <Typography variant="h6">
              Barcode Preview
            </Typography>

            {loading && (
              <Box mt={5}>
                <CircularProgress />
              </Box>
            )}

            {!loading && barcodeUrl && (
              <Box mt={4}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mb={2}
                >
                  {productName}
                </Typography>

                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: "white",
                    p: 2
                  }}
                >
                  <img
                    src={barcodeUrl}
                    alt="Product barcode"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }}
                  />
                </Box>

                <Box mt={3}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                  >
                    Print Barcode
                  </Button>
                </Box>
              </Box>
            )}

            {!loading && !barcodeUrl && (
              <Typography
                color="text.secondary"
                sx={{ mt: 8 }}
              >
                Select a product and click Generate Barcode.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}