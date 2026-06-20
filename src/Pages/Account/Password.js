import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  ChangeMyPassword
} from "../../Services/UserApi";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (form.newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters"
      );
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError(
        "New password and confirmation password do not match"
      );
      return;
    }

    try {
      setSaving(true);

      const response =
        await ChangeMyPassword(form);

      setMessage(response.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  const passwordAdornment = (
    show,
    setShow
  ) => (
    <InputAdornment position="end">
      <IconButton
        edge="end"
        onClick={() => setShow(!show)}
      >
        {show
          ? <VisibilityOffIcon />
          : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box maxWidth={600}>
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Change Password
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            margin="normal"
            type={showCurrent ? "text" : "password"}
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: passwordAdornment(
                showCurrent,
                setShowCurrent
              )
            }}
          />

          <TextField
            fullWidth
            required
            margin="normal"
            type={showNew ? "text" : "password"}
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            helperText="Password must be at least 8 characters"
            InputProps={{
              endAdornment: passwordAdornment(
                showNew,
                setShowNew
              )
            }}
          />

          <TextField
            fullWidth
            required
            margin="normal"
            type={showConfirm ? "text" : "password"}
            label="Confirm New Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: passwordAdornment(
                showConfirm,
                setShowConfirm
              )
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            startIcon={<LockResetIcon />}
            disabled={saving}
            sx={{ mt: 3 }}
          >
            {saving
              ? "Changing Password..."
              : "Change Password"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}