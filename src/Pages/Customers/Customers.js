import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    FormControlLabel,
    Grid,
    TablePagination
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
    GetCustomers,
    CreateCustomer,
    UpdateCustomer,
    DeleteCustomer
} from "../../Services/CustomerApi";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [form, setForm] = useState({
        id: "",
        CustomerCode: "",
        CustomerName: "",
        ContactPerson: "",
        EmailAddrss: "",
        Cellphone: "",
        Province: "",
        PostalCode: "",
        City: "",
        Address: "",
        IsActive: true,
        CustomerType: "",
        CreditLimit: 0,
        TaxNumber: "",
        Balance: 0,
        LastUpdateUser: ""
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await GetCustomers();
            setCustomers(data || []);
        } catch (error) {
            console.error("Error loading customers:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setForm((prev) => ({
            ...prev,
            IsActive: e.target.checked
        }));
    };

    const resetForm = () => {
        setForm({
            id: "",
            CustomerCode: "",
            CustomerName: "",
            ContactPerson: "",
            EmailAddrss: "",
            Cellphone: "",
            Province: "",
            PostalCode: "",
            City: "",
            Address: "",
            IsActive: true,
            CustomerType: "",
            CreditLimit: 0,
            TaxNumber: "",
            Balance: 0,
            LastUpdateUser: ""
        });
    };

    const handleAdd = () => {
        resetForm();
        setIsEdit(false);
        setOpen(true);
    };

    const handleEdit = (customer) => {
        setForm(customer);
        setIsEdit(true);
        setOpen(true);
    };

    const handleView = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleSave = async () => {
        try {
            if (!form.CustomerCode) {
                alert("Customer Code is required");
                return;
            }

            if (!form.CustomerName) {
                alert("Customer Name is required");
                return;
            }

            if (!form.Address) {
                alert("Address is required");
                return;
            }

            if (isEdit) {
                await UpdateCustomer(form);
            } else {
                await CreateCustomer(form);
            }

            setOpen(false);
            resetForm();
            loadCustomers();
        } catch (error) {
            console.error(error);
            alert("Failed to save customer");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?")) {
            return;
        }

        try {
            await DeleteCustomer(id);
            loadCustomers();
        } catch (error) {
            console.error(error);
            alert("Failed to delete customer");
        }
    };

    return (
        <Box p={3}>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h5">
                    Customer Management
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Customer
                </Button>
            </Box>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact Person</TableCell>
                            <TableCell>Cellphone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                 <TableBody>
    {customers
        .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        )
        .map((cust) => (
            <TableRow
                key={cust.id || cust.CustomerCode}
            >
                <TableCell>
                    {cust.CustomerCode}
                </TableCell>

                <TableCell>
                    {cust.CustomerName}
                </TableCell>

                <TableCell>
                    {cust.ContactPerson}
                </TableCell>

                <TableCell>
                    {cust.Cellphone}
                </TableCell>

                <TableCell>
                    {cust.IsActive
                        ? "Active"
                        : "Inactive"}
                </TableCell>

                <TableCell align="center">
                    <IconButton
                        onClick={() =>
                            handleView(cust)
                        }
                    >
                        <VisibilityIcon />
                    </IconButton>

                    <IconButton
                        onClick={() =>
                            handleEdit(cust)
                        }
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() =>
                            handleDelete(cust.id)
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))}
</TableBody>
                </Table>
                <TablePagination
    component="div"
    count={customers.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={
        handleChangeRowsPerPage
    }
    rowsPerPageOptions={[5, 10, 25, 50]}
/>
            </TableContainer>

            {/* Add/Edit Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    {isEdit
                        ? "Edit Customer"
                        : "Add Customer"}
                </DialogTitle>

                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mt: 1 }}
                    >
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Customer Code"
                                name="CustomerCode"
                                value={form.CustomerCode}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Customer Name"
                                name="CustomerName"
                                value={form.CustomerName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Contact Person"
                                name="ContactPerson"
                                value={form.ContactPerson}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="EmailAddrss"
                                value={form.EmailAddrss}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Cellphone"
                                name="Cellphone"
                                value={form.Cellphone}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Province"
                                name="Province"
                                value={form.Province}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="City"
                                value={form.City}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                name="PostalCode"
                                value={form.PostalCode}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="Address"
                                value={form.Address}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Customer Type"
                                name="CustomerType"
                                value={form.CustomerType}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Credit Limit"
                                name="CreditLimit"
                                value={form.CreditLimit}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Tax Number"
                                name="TaxNumber"
                                value={form.TaxNumber}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Balance"
                                name="Balance"
                                value={form.Balance}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            form.IsActive
                                        }
                                        onChange={
                                            handleCheckboxChange
                                        }
                                    />
                                }
                                label="Active Customer"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Dialog */}
        <Dialog
    open={!!selectedCustomer}
    onClose={() =>
        setSelectedCustomer(null)
    }
    maxWidth="md"
    fullWidth
>
    <DialogTitle>
        Customer Details
    </DialogTitle>

    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography>
                    <strong>Code:</strong>{" "}
                    {selectedCustomer?.CustomerCode}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Name:</strong>{" "}
                    {selectedCustomer?.CustomerName}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Contact Person:</strong>{" "}
                    {selectedCustomer?.ContactPerson}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Email:</strong>{" "}
                    {selectedCustomer?.EmailAddrss}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Cellphone:</strong>{" "}
                    {selectedCustomer?.Cellphone}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Province:</strong>{" "}
                    {selectedCustomer?.Province}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>City:</strong>{" "}
                    {selectedCustomer?.City}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Postal Code:</strong>{" "}
                    {selectedCustomer?.PostalCode}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography>
                    <strong>Address:</strong>{" "}
                    {selectedCustomer?.Address}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Customer Type:</strong>{" "}
                    {selectedCustomer?.CustomerType}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Credit Limit:</strong>{" "}
                    {selectedCustomer?.CreditLimit}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Tax Number:</strong>{" "}
                    {selectedCustomer?.TaxNumber}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Balance:</strong>{" "}
                    {selectedCustomer?.Balance}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Status:</strong>{" "}
                    {selectedCustomer?.IsActive
                        ? "Active"
                        : "Inactive"}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    <strong>Updated By:</strong>{" "}
                    {selectedCustomer?.LastUpdateUser}
                </Typography>
            </Grid>
        </Grid>
    </DialogContent>

    <DialogActions>
        <Button
            onClick={() =>
                setSelectedCustomer(null)
            }
        >
            Close
        </Button>
    </DialogActions>
</Dialog>
        </Box>
    );
}