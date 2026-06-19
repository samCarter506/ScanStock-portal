import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    GetSuppliers,
    GetSupplier,
    CreateSupplier,
    UpdateSupplier,
    DeleteSupplier
} from "../../Services/SupplierApi"; 

const initialState = {
    supplierCode: "",
    supplierName: "",
    contactPerson: "",
    emailAddress: "",
    cellPhone: "",
    province: "",
    postalCode: "",
    city: "",
    address: "",
    isActive: true,
    lastUpdateUser: ""
};

export default function Supplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        const res = await GetSuppliers();
        console.log("======",res)
        // backend should return array OR {data:[]}
        setSuppliers(res.data || res);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleOpen = (supplier = null) => {
        if (supplier) {
            setEditMode(true);
            setForm({
                supplierCode: supplier.SupplierCode,
                supplierName: supplier.SupplierName,
                contactPerson: supplier.ContactPerson,
                emailAddress: supplier.EmailAddrss,
                cellPhone: supplier.Cellphone,
                province: supplier.Province,
                postalCode: supplier.PostalCode,
                city: supplier.City,
                address: supplier.Address,
                isActive: supplier.IsActive,
                lastUpdateUser: supplier.LastUpdateUser || ""
            });
        } else {
            setEditMode(false);
            setForm(initialState);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(initialState);
    };

    const handleSave = async () => {
        if (editMode) {
            await UpdateSupplier(form);
        } else {
            await CreateSupplier(form);
        }

        handleClose();
        loadSuppliers();
    };

    const handleDelete = async (id) => {
        await DeleteSupplier(id);
        loadSuppliers();
    };

    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>
                Suppliers
            </Typography>

            <Button variant="contained" onClick={() => handleOpen()}>
                Add Supplier
            </Button>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {suppliers.map((s) => (
                            <TableRow key={s.SupplierCode}>
                                <TableCell>{s.SupplierCode}</TableCell>
                                <TableCell>{s.SupplierName}</TableCell>
                                <TableCell>{s.ContactPerson}</TableCell>
                                <TableCell>{s.EmailAddrss}</TableCell>
                                <TableCell>{s.City}</TableCell>

                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpen(s)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton onClick={() => handleDelete(s.SupplierCode)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* CREATE / EDIT DIALOG */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    {editMode ? "Edit Supplier" : "Add Supplier"}
                </DialogTitle>

                <DialogContent>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={1}>
                        <TextField
                            label="Supplier Code"
                            name="supplierCode"
                            value={form.supplierCode}
                            onChange={handleChange}
                            disabled={editMode}
                        />

                        <TextField
                            label="Supplier Name"
                            name="supplierName"
                            value={form.supplierName}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Contact Person"
                            name="contactPerson"
                            value={form.contactPerson}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Email"
                            name="emailAddress"
                            value={form.emailAddress}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Cell Phone"
                            name="cellPhone"
                            value={form.cellPhone}
                            onChange={handleChange}
                        />

                        <TextField
                            label="City"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Province"
                            name="province"
                            value={form.province}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Postal Code"
                            name="postalCode"
                            value={form.postalCode}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}