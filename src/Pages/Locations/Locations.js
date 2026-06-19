import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Checkbox,
    FormControlLabel
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    GetLocations,
    CreateLocation,
    UpdateLocation,
    DeleteLocation
} from "../../Services/LocationApi";

export default function Locations() {


    const [locations, setLocations] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [form, setForm] = useState({
        id: "",
        LocationCode: "",
        LocationName: "",
        Description: "",
        Warehouse: "",
        Aisle: "",
        Shelf: "",
        isActive: "",
        Bin: "",
        CheckDigit: ""

    });

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        try {
            const data = await GetLocations();
            setLocations(data || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        setForm({
            ...form,
            isActive: e.target.checked
        });
    };

    const resetForm = () => {
        setForm({
            id: "",
            LocationCode: "",
            LocationName: "",
            Description: "",
            Warehouse: "",
            Aisle: "",
            Shelf: "",
            isActive: "",
            Bin: "",
            CheckDigit: ""
        });
    };

    const handleAdd = () => {
        resetForm();
        setIsEdit(false);
        setOpen(true);
    };

    const handleEdit = (location) => {
        setForm(location);
        setIsEdit(true);
        setOpen(true);
    };

    const handleView = (location) => {
        setSelectedLocation(location);
    };

    const handleSave = async () => {

        if (!form.locationCode) {
            alert("Location Code is required");
            return;
        }

        if (!form.locationName) {
            alert("Location Name is required");
            return;
        }

        try {

            if (isEdit) {
                await UpdateLocation(form);
            } else {
                await CreateLocation(form);
            }

            setOpen(false);
            loadLocations();

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this location?"))
            return;

        try {
            await DeleteLocation(id);
            loadLocations();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box p={3}>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
            >
                <Typography variant="h5">
                    Locations
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Location
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>LocationCode</TableCell>
                            <TableCell>LocationName</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Warehouse</TableCell>
                            <TableCell>Shelf</TableCell>
                            <TableCell>Bin</TableCell>
                            <TableCell>CheckDigit</TableCell>
                            <TableCell>IsActive</TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {locations
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((location) => (
                                <TableRow key={location.id}>

                                    <TableCell>
                                        {location.LocationCode}
                                    </TableCell>

                                    <TableCell>
                                        {location.LocationName}
                                    </TableCell>

                                    <TableCell>
                                        {location.Description}
                                    </TableCell>

                                    <TableCell>
                                        {location.Warehouse}
                                    </TableCell>
                                    <TableCell>
                                        {location.Shelf}
                                    </TableCell>
                                    <TableCell>
                                        {location.Bin}
                                    </TableCell>
                                    <TableCell>
                                        {location.CheckDigit}
                                    </TableCell>
                                    <TableCell>
                                        {location.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </TableCell>

                                    <TableCell align="center">

                                        <IconButton
                                            onClick={() =>
                                                handleView(location)
                                            }
                                        >
                                            <VisibilityIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={() =>
                                                handleEdit(location)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDelete(location.id)
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
                    count={locations.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(e, newPage) =>
                        setPage(newPage)
                    }
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(
                            parseInt(e.target.value, 10)
                        );
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </TableContainer>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="md"
            >

                <DialogTitle>
                    {isEdit
                        ? "Edit Location"
                        : "Add Location"}
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Location Code"
                        name="locationCode"
                        value={form.locationCode}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Location Name"
                        name="locationName"
                        value={form.locationName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Province"
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Postal Code"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.isActive}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Active"
                    />

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

            <Dialog
                open={!!selectedLocation}
                onClose={() =>
                    setSelectedLocation(null)
                }
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Location Details
                </DialogTitle>

                <DialogContent>

                    <Typography>
                        <strong>Code:</strong>{" "}
                        {selectedLocation?.locationCode}
                    </Typography>

                    <Typography>
                        <strong>Name:</strong>{" "}
                        {selectedLocation?.locationName}
                    </Typography>

                    <Typography>
                        <strong>Address:</strong>{" "}
                        {selectedLocation?.address}
                    </Typography>

                    <Typography>
                        <strong>City:</strong>{" "}
                        {selectedLocation?.city}
                    </Typography>

                    <Typography>
                        <strong>Province:</strong>{" "}
                        {selectedLocation?.province}
                    </Typography>

                    <Typography>
                        <strong>Postal Code:</strong>{" "}
                        {selectedLocation?.postalCode}
                    </Typography>

                    <Typography>
                        <strong>Status:</strong>{" "}
                        {selectedLocation?.isActive
                            ? "Active"
                            : "Inactive"}
                    </Typography>

                    <Typography>
                        <strong>Updated By:</strong>{" "}
                        {selectedLocation?.lastUpdateUser}
                    </Typography>

                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setSelectedLocation(null)
                        }
                    >
                        Close
                    </Button>
                </DialogActions>

            </Dialog>

        </Box>
    );


}
