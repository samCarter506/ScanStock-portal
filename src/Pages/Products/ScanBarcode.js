import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {
    Box,
    Typography,
    Paper
} from "@mui/material";

import { ScanProduct } from "../../Services/ProductsApi";

export default function Scanner() {

    const [barcode, setBarcode] = useState("");
    const [product, setProduct] = useState(null);

    const handleScan = async (result) => {

        if (!result?.text) return;

        if (result.text === barcode) return;

        setBarcode(result.text);

        try {

            const data = await ScanProduct(result.text);

            setProduct(data);

        } catch (err) {

            console.log(err);

        }
    };

    return (
        <Box p={3}>

            <Typography variant="h5" mb={2}>
                Product Scanner
            </Typography>

            <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                    if (result) {
                        handleScan(result);
                    }
                }}
            />

            <Paper sx={{ p: 2, mt: 3 }}>

                <Typography>
                    Barcode: {barcode}
                </Typography>

                {product && (
                    <>
                        <Typography>
                            Product: {product.ProductName}
                        </Typography>

                        <Typography>
                            Quantity: {product.Quantity}
                        </Typography>

                        <Typography>
                            Selling Price: R {product.SellingPrice}
                        </Typography>
                    </>
                )}

            </Paper>

        </Box>
    );
}