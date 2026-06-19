import React, { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    CircularProgress
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import {
    GetReceipts
} from "../../Services/ReceiptApi";

import {
    GetReceiptLinesByReceipt
} from "../../Services/ReceiptApi";

export default function Receipts() {

    const [receipts, setReceipts] = useState([]);
    const [filteredReceipts, setFilteredReceipts] = useState([]);

    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receiptLines, setReceiptLines] = useState([]);

    const [search, setSearch] = useState("");

    const [loadingHeaders, setLoadingHeaders] = useState(false);
    const [loadingLines, setLoadingLines] = useState(false);

    useEffect(() => {
        loadReceipts();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredReceipts(receipts);
            return;
        }

        const filtered = receipts.filter(r =>
            r.ReceiptNumber
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            r.InvoiceNumber
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredReceipts(filtered);
    }, [search, receipts]);

    const loadReceipts = async () => {
        try {
            setLoadingHeaders(true);

            const response = await GetReceipts();

            const data = response.data || response || [];

            setReceipts(data);
            setFilteredReceipts(data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingHeaders(false);
        }
    };

    const handleSelectReceipt = async (receipt) => {
        try {

            setSelectedReceipt(receipt);
            setLoadingLines(true);

            const response =
                await GetReceiptLinesByReceipt(
                    receipt._id
                );

            setReceiptLines(
                response.data || []
            );

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingLines(false);
        }
    };

    return (
        <Box p={2}>

            {/* HEADER BAR */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5">
                        Receipts Management
                    </Typography>

                    <Button
                        startIcon={<RefreshIcon />}
                        variant="contained"
                        onClick={loadReceipts}
                    >
                        Refresh
                    </Button>
                </Box>
            </Paper>

            {/* SEARCH */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    label="Search Receipt / Invoice"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
            </Paper>

            {/* HEADER GRID */}
            <Paper sx={{ mb: 2 }}>
                <Box p={2}>
                    <Typography variant="h6">
                        Receipt Headers
                    </Typography>
                </Box>

                {loadingHeaders ? (
                    <Box textAlign="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer sx={{ maxHeight: 320 }}>
                        <Table stickyHeader>

                            <TableHead>
                                <TableRow>
                                    <TableCell>Receipt No</TableCell>
                                    <TableCell>Supplier</TableCell>
                                    <TableCell>Invoice</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Total Items</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {filteredReceipts.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        hover
                                        selected={
                                            selectedReceipt?._id === row._id
                                        }
                                        sx={{ cursor: "pointer" }}
                                        onClick={() =>
                                            handleSelectReceipt(row)
                                        }
                                    >

                                        <TableCell>
                                            {row.ReceiptNumber}
                                        </TableCell>

                                        <TableCell>
                                            {row.SupplierId?.SupplierName}
                                        </TableCell>

                                        <TableCell>
                                            {row.InvoiceNumber}
                                        </TableCell>

                                        <TableCell>
                                            {row.Status}
                                        </TableCell>

                                        <TableCell>
                                            {new Date(row.ReceivedDate)
                                                .toLocaleDateString()}
                                        </TableCell>

                                        <TableCell>
                                            {row.TotalItems}
                                        </TableCell>

                                    </TableRow>
                                ))}

                            </TableBody>

                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* DETAIL GRID */}
            <Paper>

                <Box p={2}>
                    <Typography variant="h6">
                        Receipt Lines
                    </Typography>

                    {selectedReceipt && (
                        <Typography variant="body2">
                            Selected: {selectedReceipt.ReceiptNumber}
                        </Typography>
                    )}
                </Box>

                {loadingLines ? (
                    <Box textAlign="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table stickyHeader>

                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Cost Price</TableCell>
                                    <TableCell>Batch</TableCell>
                                    <TableCell>Expiry</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {receiptLines.map((line) => (
                                    <TableRow key={line._id}>

                                        <TableCell>
                                            {line.ProductId?.ProductName}
                                        </TableCell>

                                        <TableCell>
                                            {line.LocationId?.LocationName}
                                        </TableCell>

                                        <TableCell>
                                            {line.QuantityReceived}
                                        </TableCell>

                                        <TableCell>
                                            {line.CostPrice}
                                        </TableCell>

                                        <TableCell>
                                            {line.BatchNumber}
                                        </TableCell>

                                        <TableCell>
                                            {new Date(line.ExpiryDate)
                                                .toLocaleDateString()}
                                        </TableCell>

                                    </TableRow>
                                ))}

                                {receiptLines.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Select a receipt to view lines
                                        </TableCell>
                                    </TableRow>
                                )}

                            </TableBody>

                        </Table>
                    </TableContainer>
                )}

            </Paper>

        </Box>
    );
}