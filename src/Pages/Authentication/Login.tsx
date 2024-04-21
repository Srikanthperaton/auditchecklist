import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Paper } from "@mui/material";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface Props {}

const Login = (props: Props) => {
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const salt = bcrypt.genSaltSync(10);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validationErrors = { email: "", password: "" };
    let isValid = true;
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const emailId = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim() || "";

    if (!emailId) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      validationErrors.email = "Invalid Email Id";
      isValid = false;
    }

    if (!data.get("password")?.toString().trim()) {
      validationErrors.password = "Password is required";
      isValid = false;
    }
    const hashedPassword = bcrypt.hashSync(password, salt);
    setErrors(validationErrors);

    if (isValid) {
      const post = {
        EmailId: data.get("email"),
        Password: password,
      };

      axios
        .post("https://api-checklist.azurewebsites.us/api/user/login", post)
        .then((response) => {
          if (response?.data.status === "true") {
            localStorage.setItem("token-info", response?.data.user.firstName);
            setIsLoggedin(true);
            navigate("/dashboard"); // Redirect to the dashboard after login
          } else {
            setErrorMessage(response?.data.message);
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper sx={{ paddingBottom: "100px", border: 2, borderColor: "#1976D2" }}>
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                variant="filled"
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                error={
                  errors?.email === "" ||
                  errors?.email === null ||
                  errors.email === undefined
                }
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                variant="filled"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={
                  errors?.password === "" ||
                  errors?.password === null ||
                  errors.password === undefined
                }
                helperText={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid container justifyContent="flex-end">
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default Login;
