import React, { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    CircularProgress,
    TextField
} from "@mui/material";

import {
    GetOutbounds,
    GetOutboundLinesByOutbound
} from "../../Services/outboundApi";

export default function Outbound() {

    const [outbounds, setOutbounds] = useState([]);
    const [filteredOutbounds, setFilteredOutbounds] = useState([]);

    const [selectedOutbound, setSelectedOutbound] =
        useState(null);

    const [outboundLines, setOutboundLines] =
        useState([]);

    const [search, setSearch] = useState("");

    const [loadingHeaders, setLoadingHeaders] =
        useState(false);

    const [loadingLines, setLoadingLines] =
        useState(false);

    useEffect(() => {
        loadOutbounds();
    }, []);

    useEffect(() => {

        if (!search) {
            setFilteredOutbounds(outbounds);
            return;
        }

        const filtered = outbounds.filter(
            x =>
                x.OutboundNumber
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
        );

        setFilteredOutbounds(filtered);

    }, [search, outbounds]);

    const loadOutbounds = async () => {

        try {

            setLoadingHeaders(true);

            const response =
                await GetOutbounds();

            const data =
                response.data || response || [];

            setOutbounds(data);
            setFilteredOutbounds(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingHeaders(false);

        }
    };

    const handleSelectOutbound =
        async (outbound) => {

        try {

            setSelectedOutbound(outbound);

            setLoadingLines(true);

            const response =
                await GetOutboundLinesByOutbound(
                    outbound._id
                );

            setOutboundLines(
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

            <Typography
                variant="h5"
                gutterBottom
            >
                Outbound Management
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>

                <TextField
                    fullWidth
                    label="Search Outbound"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </Paper>

            {/* HEADER GRID */}

            <Paper sx={{ mb: 2 }}>

                <Box p={2}>
                    <Typography
                        variant="h6"
                    >
                        Outbound Headers
                    </Typography>
                </Box>

                {loadingHeaders ? (
                    <Box
                        textAlign="center"
                        p={3}
                    >
                        <CircularProgress />
                    </Box>
                ) : (

                    <TableContainer
                        sx={{
                            maxHeight: 300
                        }}
                    >

                        <Table stickyHeader>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Outbound Number
                                    </TableCell>

                                    <TableCell>
                                        Customer
                                    </TableCell>

                                    <TableCell>
                                        Reference
                                    </TableCell>

                                    <TableCell>
                                        Total Items
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell>
                                        Create Date
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {filteredOutbounds.map(
                                    (row) => (

                                    <TableRow
                                        key={
                                            row._id
                                        }
                                        hover
                                        selected={
                                            selectedOutbound?._id ===
                                            row._id
                                        }
                                        onClick={() =>
                                            handleSelectOutbound(
                                                row
                                            )
                                        }
                                        sx={{
                                            cursor:
                                                "pointer"
                                        }}
                                    >

                                        <TableCell>
                                            {
                                                row.OutboundNumber
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                row.CustomerId?.CustomerName
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                row.ReferenceNumber
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                row.TotalItems
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                row.Status
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                new Date(
                                                    row.CreateDate
                                                )
                                                    .toLocaleDateString()
                                            }
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

                    <Typography
                        variant="h6"
                    >
                        Outbound Lines
                    </Typography>

                    {selectedOutbound && (

                        <Typography>
                            Selected:
                            {" "}
                            {
                                selectedOutbound.OutboundNumber
                            }
                        </Typography>

                    )}

                </Box>

                {loadingLines ? (

                    <Box
                        textAlign="center"
                        p={3}
                    >
                        <CircularProgress />
                    </Box>

                ) : (

                    <TableContainer
                        sx={{
                            maxHeight: 400
                        }}
                    >

                        <Table stickyHeader>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Product
                                    </TableCell>

                                    <TableCell>
                                        Location
                                    </TableCell>

                                    <TableCell>
                                        Qty Issued
                                    </TableCell>

                                    <TableCell>
                                        Selling Price
                                    </TableCell>

                                    <TableCell>
                                        Batch Number
                                    </TableCell>

                                    <TableCell>
                                        Issue Date
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {outboundLines.map(
                                    (line) => (

                                    <TableRow
                                        key={
                                            line._id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                line.ProductId?.ProductName
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                line.LocationId?.LocationName
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                line.QuantityIssued
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                line.SellingPrice
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                line.BatchNumber
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                new Date(
                                                    line.IssueDate
                                                )
                                                .toLocaleDateString()
                                            }
                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                )}

            </Paper>

        </Box>
    );
}