import React, { useRef, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Divider
} from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { ScanProduct } from "../../Services/ProductsApi";

export default function Scanner() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scanningRef = useRef(false);

  const handleScan = async (result) => {
    if (!result?.text || scanningRef.current) {
      return;
    }

    const scannedBarcode = result.text.trim();

    if (!scannedBarcode) {
      return;
    }

    scanningRef.current = true;

    setBarcode(scannedBarcode);
    setProduct(null);
    setError("");
    setLoading(true);

    try {
      const response = await ScanProduct(scannedBarcode);

      /*
        Supports either:
        1. product returned directly
        2. { data: product }
        3. { success: true, data: product }
      */
      const productData =
        response?.data?.data ||
        response?.data ||
        response;

      if (!productData || !productData.ProductName) {
        setError("Product was not found for this barcode.");
        return;
      }

      setProduct(productData);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Product was not found for this barcode."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScanAgain = () => {
    setBarcode("");
    setProduct(null);
    setError("");
    setLoading(false);

    // Allow scanner to scan the next barcode
    scanningRef.current = false;
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Product Scanner
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Scan a product barcode to view its stock details.
      </Typography>

      <Paper
        sx={{
          p: 2,
          maxWidth: 600,
          mx: "auto",
          overflow: "hidden"
        }}
      >
        {!product && !loading && (
          <BarcodeScannerComponent
            width="100%"
            height={350}
            onUpdate={(err, result) => {
              if (result) {
                handleScan(result);
              }
            }}
          />
        )}

        {loading && (
          <Box textAlign="center" py={8}>
            <CircularProgress />

            <Typography sx={{ mt: 2 }}>
              Loading product details...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {barcode && (
          <Typography sx={{ mt: 2 }}>
            <strong>Scanned Barcode:</strong> {barcode}
          </Typography>
        )}

        {product && (
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 3,
              border: "1px solid",
              borderColor: "divider"
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Product Details
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Product:</strong> {product.ProductName}
            </Typography>

            <Typography>
              <strong>Description:</strong>{" "}
              {product.Description || "Not available"}
            </Typography>

            <Typography>
              <strong>Barcode:</strong> {product.Barcode}
            </Typography>

            <Typography>
              <strong>Quantity Available:</strong> {product.Quantity}
            </Typography>

            <Typography>
              <strong>Minimum Stock:</strong> {product.MinimumStock}
            </Typography>

            <Typography>
              <strong>Cost Price:</strong> R {product.CostPrice}
            </Typography>

            <Typography>
              <strong>Selling Price:</strong> R {product.SellingPrice}
            </Typography>

            <Button
              variant="contained"
              startIcon={<RestartAltIcon />}
              sx={{ mt: 3 }}
              onClick={handleScanAgain}
            >
              Scan Another Product
            </Button>
          </Paper>
        )}

        {!product && !loading && barcode && (
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            sx={{ mt: 2 }}
            onClick={handleScanAgain}
          >
            Try Again
          </Button>
        )}
      </Paper>
    </Box>
  );
}