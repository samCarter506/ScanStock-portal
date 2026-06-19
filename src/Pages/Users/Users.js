import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    Typography,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { GetUsers, CreateUser, UpdateUser, DeleteUser } from "../../Services/UsersApi";
import { GetUserGroups } from "../../Services/UserGroup"

export default function Users() {
    useEffect(() => {
        console.log("useEffect fired");
        loadUsers();
    }, []);
    const [users, setUsers] = useState([]);
    const [userGroup, setUserGroups] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

   const [form, setForm] = useState({
    UserID: "",
    FirstName: "",
    LastName: "",
    Password: "",
    ConfirmPassword: "",
    UserGroup: ""
});

    // LOAD USERS
    const loadUsers = async () => {
        try {
            console.log("Loading users...");

            const data = await GetUsers();
            const roleData = await GetUserGroups();

            console.log("Users response:", data);
            console.log("Users Roles: ", roleData)

            setUsers(data);
            setUserGroups(roleData);
        } catch (error) {
            console.error("Error loading users:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // OPEN ADD
    const handleAdd = () => {
       setForm({
    userID: "",
    firstName: "",
    lastName: "",
    Password: "",
    ConfirmPassword: "",
    UserGroup: ""
}); setIsEdit(false);
        setOpen(true);
    };

    // OPEN EDIT
    const handleEdit = (user) => {
        console.log(user.UserID)
        setForm(user);
        setIsEdit(true);
        setOpen(true);
    };

    // VIEW
    const handleView = (user) => {
        setSelectedUser(user);
    };

    // SAVE
    const handleSave = async () => {

    if (!isEdit) {

        if (!form.Password) {
            alert("Password is required");
            return;
        }

        if (form.Password !== form.ConfirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (form.Password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        if (!form.UserGroup) {
            alert("Please select a role");
            return;
        }

        await CreateUser(form);

    } else {

        await UpdateUser(form);

    }

    setOpen(false);
    loadUsers();
};

    // DELETE
    const handleDelete = async (id) => {
        await DeleteUser(id);
        loadUsers();
    };

    return (
        <Box p={3}>
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h5">Users</Typography>

                <Button
                    variant="contained"

                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add User
                </Button>
            </Box>

            {/* TABLE */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>FirstName</TableCell>
                            <TableCell>LastName</TableCell>
                            <TableCell>CreateDate</TableCell>
                            <TableCell>LastUpdate</TableCell>
                            <TableCell>LastUpdateUser</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.UserID}>
                                <TableCell>{user.UserID}</TableCell>
                                <TableCell>{user.FirstName}</TableCell>
                                <TableCell>{user.LastName}</TableCell>
                                <TableCell>{user.CreateDate}</TableCell>
                                <TableCell>{user.LastUpdate}</TableCell>
                                <TableCell>{user.LastUpdateUser}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleView(user)}>
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton onClick={() => handleEdit(user)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton color="#0D47A1" onClick={() => handleDelete(user.UserID)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ADD / EDIT DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="UserID"
                        name="userID"
                        value={form.UserID}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="FirstName"
                        name="firstName"
                        value={form.FirstName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="LastName"
                        name="lastName"
                        value={form.LastName}
                        onChange={handleChange}
                    />
                    {!isEdit && (
                        <>
                            <TextField
                                fullWidth
                                type="password"
                                margin="dense"
                                label="Password"
                                name="Password"
                                value={form.Password || ""}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                margin="dense"
                                label="Confirm Password"
                                name="ConfirmPassword"
                                value={form.ConfirmPassword || ""}
                                onChange={handleChange}
                            />
                            <Select
    fullWidth
    name="UserGroup"
    value={form.UserGroup || ""}
    onChange={handleChange}
>
    {userGroup.map((role) => (
        <MenuItem
            key={role.Role}
            value={role.Role}
        >
            {role.Role}
        </MenuItem>
    ))}
</Select>
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* VIEW DIALOG */}
            <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)}>
                <DialogTitle>User Details</DialogTitle>

                <DialogContent>
                    <Typography>ID: {selectedUser?.UserID}</Typography>
                    <Typography>FirstName: {selectedUser?.FirstName}</Typography>
                    <Typography>LastName: {selectedUser?.LastName}</Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setSelectedUser(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}