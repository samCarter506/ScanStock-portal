import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  Alert
} from "@mui/material";

import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import { LoginUser } from "../../Services/AccountApi";

export default function Login() {

  const [form, setForm] = useState({
    userId: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
    const navigate = useNavigate();
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));

    setError("");
  };

  const validateForm = () => {

    let newErrors = {};

    if (!form.userId.trim()) {
      newErrors.userId = "User ID is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
 
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      setError("");

      const response = await LoginUser(form);

      console.log(response);

      // Save token
      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );
      
    navigate("/dashboard");
    

    }
    catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#F4F6F8",
        p: 2
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 420,
          borderRadius: 4,
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            p: 4,
            textAlign: "center"
          }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: 70,
              height: 70,
              mx: "auto",
              mb: 2
            }}
          >
            <Inventory2Icon fontSize="large" />
          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            ScanStock
          </Typography>

          <Typography variant="body2">
            Warehouse Management System
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              textAlign: "center"
            }}
          >
            Sign In
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            name="userId"
            label="User ID"
            margin="normal"
            value={form.userId}
            onChange={handleChange}
            error={!!errors.userId}
            helperText={errors.userId}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              )
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={3}
          >
            © 2026 ScanStock Inventory System
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}