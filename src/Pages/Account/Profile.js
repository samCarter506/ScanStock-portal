import React, {
  useEffect,
  useState
} from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import {
  GetMyProfile,
  UpdateMyProfile
} from "../../Services/UsersApi";

export default function Profile() {
  const [profile, setProfile] = useState({
    UserID: "",
    FirstName: "",
    LastName: "",
    UserGroup: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await GetMyProfile();

      setProfile(response.data);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await UpdateMyProfile({
        firstName: profile.FirstName,
        lastName: profile.LastName
      });

      setMessage(response.message);

      const savedUser = response.data;

      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          ...savedUser
        })
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const roleNames =
    profile.UserGroup
      ?.map((role) => role.Role)
      .join(", ") || "No role assigned";

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        p={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={750}>
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          My Profile
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

        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User ID"
                value={profile.UserID || ""}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="FirstName"
                value={profile.FirstName || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="LastName"
                value={profile.LastName || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                value={roleNames}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}