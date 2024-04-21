import "./Registration.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import bcrypt from "bcryptjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

interface Props {}

const Registration = (props: Props) => {
  const salt = bcrypt.genSaltSync(10);
  let postError = "";
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    userRole: "",
  });

  const [userRole, setRole] = React.useState("");
  const [action, setAction] = React.useState("Sign up");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    userRole: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [postMessage, setPostMessage] = React.useState("");

  const handleValidation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    let validationErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userRole: "",
    };
    //let validationErrors = {};
    const data = new FormData(event.currentTarget);

    if (!data.get("firstName")?.toString().trim()) {
      validationErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!data.get("lastName")?.toString().trim()) {
      validationErrors.lastName = "Last name is required";
      isValid = false;
    }

    const emailId = data.get("email")?.toString().trim();
    if (!emailId) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      validationErrors.email = "Invalid Email Id";
      isValid = false;
    }

    const password = data.get("password")?.toString().trim() || "";

    if (!password) {
      validationErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      validationErrors.password = "Password should be at least 6 char";
      isValid = false;
    }
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!data.get("userRole")?.toString().trim()) {
      validationErrors.userRole = "User Role is required";
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      const post = {
        EmailId: data.get("email"),
        Password: hashedPassword,
        LastName: data.get("lastName"),
        FirstName: data.get("firstName"),
        RoleName: data.get("userRole"),
      };
      console.log(post);

      axios
        .post(
          "https://api-checklist.azurewebsites.us/api/user/registration",
          post
        )
        .then((response) => {
          console.log(response);
          //postError = response;
          setPostMessage("User Registered successfully");
        })
        .catch((err) => {
          console.log(err.message);
          setErrorMessage(`${err.response.statusText} - ${err.message}`);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {errorMessage && (
            <Alert severity="error" className="w100">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}
          {postMessage && (
            <Alert severity="success" className="w100">
              <AlertTitle>Success</AlertTitle>
              {postMessage}
            </Alert>
          )}

          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {action}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  variant="filled"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => handleValidation(e)}
                  error={
                    errors?.firstName === "" ||
                    errors?.firstName === null ||
                    errors.firstName === undefined
                  }
                  helperText={errors?.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="filled"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => handleValidation(e)}
                  error={
                    errors?.lastName === "" ||
                    errors?.lastName === null ||
                    errors.lastName === undefined
                  }
                  helperText={errors?.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="filled"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleValidation(e)}
                  error={
                    errors?.email === "" ||
                    errors?.email === null ||
                    errors.email === undefined
                  }
                  helperText={errors?.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="filled"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleValidation(e)}
                  error={
                    errors?.password === "" ||
                    errors?.password === null ||
                    errors.password === undefined
                  }
                  helperText={errors?.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={
                    errors?.userRole === "" ||
                    errors?.userRole === null ||
                    errors.userRole === undefined
                  }
                >
                  <InputLabel id="userRole-label">Role</InputLabel>
                  <Select
                    labelId="userRole-label"
                    id="userRole"
                    value={userRole}
                    label="Role"
                    name="userRole"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Admin</MenuItem>
                    <MenuItem value={20}>Auditor</MenuItem>
                    <MenuItem value={30}>Risk Manager</MenuItem>
                  </Select>
                  <FormHelperText>{errors.userRole}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Registration;
