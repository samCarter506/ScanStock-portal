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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    GetProducts,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
} from "../../Services/ProductsApi";

import { GetCategories } from "../../Services/CategoryApi";
import { GetLocations } from "../../Services/LocationApi";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState({
        barcode: "",
        ProductName: "",
        Description: "",
        Quantity: 0,
        MinimumStock: 0,
        CostPrice: 0,
        SellingPrice: 0,
        ExpiryDate: "",
        CategoryId: "",
        LocationId: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const products = await GetProducts();
        const categories = await GetCategories();
        const locations = await GetLocations();

      
        setProducts(products);
        setCategories(categories);
        setLocations(locations);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAdd = () => {
        setForm({
            Barcode: "",
            ProductName: "",
            Description: "",
            Quantity: 0,
            MinimumStock: 0,
            CostPrice: 0,
            SellingPrice: 0,
            ExpiryDate: "",
            CategoryId: "",
            LocationId: ""
        });

        setIsEdit(false);
        setOpen(true);
    };
    const handleEdit = (product) => {

        setForm({
            ...product,

            LocationId:
                product.Locations &&
                    product.Locations.length > 0
                    ? product.Locations[0].LocationId
                    : "",

            CategoryId: product.CategoryId || ""
        });

        setIsEdit(true);
        setOpen(true);
    };

    const handleSave = async () => {

        if (isEdit) {
            await UpdateProduct(form);
        } else {
            await CreateProduct(form);
        }

        setOpen(false);
        loadData();
    };

    const handleDelete = async (id) => {
        await DeleteProduct(id);
        loadData();
    };

    return (
        <Box p={3}>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
            >
                <Typography variant="h5">
                    Products
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Product
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Barcode</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Selling</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.Barcode}</TableCell>
                                <TableCell>{product.ProductName}</TableCell>
                                <TableCell>{product.Description}</TableCell>
                                <TableCell>{product.Quantity}</TableCell>
                                <TableCell>{product.CostPrice}</TableCell>
                                <TableCell>{product.SellingPrice}</TableCell>

                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleEdit(product)}
                                        sx={{ cursor: "pointer", mr: 2 }}
                                    />

                                    <DeleteIcon
                                        onClick={() => handleDelete(product._id)}
                                        sx={{ cursor: "pointer" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >
                <DialogTitle>
                    {isEdit ? "Edit Product" : "Add Product"}
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Barcode"
                        name="barcode"
                        value={form.barcode}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Product Name"
                        name="ProductName"
                        value={form.ProductName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Description"
                        name="Description"
                        value={form.Description}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        type="number"
                        label="Quantity"
                        name="Quantity"
                        value={form.Quantity}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category</InputLabel>

                        <Select
                            name="CategoryId"
                            value={form.CategoryId}
                            onChange={handleChange}
                        >
                            {(Array.isArray(categories) ? categories : []).map((cat) => (
                                <MenuItem
                                    key={cat._id}
                                    value={cat._id}
                                >
                                    {cat.CategoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Location</InputLabel>

                        <Select
                            name="LocationId"
                            value={form.LocationId}
                            onChange={handleChange}
                        >
                            {(Array.isArray(locations) ? locations : []).map((loc) => (
                                <MenuItem
                                    key={loc._id}
                                    value={loc._id}
                                >
                                    {loc.LocationName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
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

        </Box>
    );
}