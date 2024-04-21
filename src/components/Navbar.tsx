/* eslint eqeqeq: "off", curly: "error" -- Here's a description about why this configuration is necessary. */
/* eslint-disable react/no-direct-mutation-state */
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const pathname = window.location.pathname;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem("token-info");
    navigate("/login");
  };
  function stringAvatar(name: any) {
    if (name !== null) {
      const fullName = name.split(" ")[0] + " " + name.split(" ")[1];
      return {
        sx: {
          bgcolor: "blue",
        },
        children: `${fullName.split(" ")[0][0]}${fullName.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: "blue",
        },
        children: `${"?"}`,
      };
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <CatchingPokemonIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AUDIT REPORTING TOOL
        </Typography>
        {pathname !== "/login" &&
          pathname !== "/register" &&
          localStorage.getItem("token-info") && (
            <div>
              <Stack direction="row" spacing={2} paddingRight={10}>
                <Button color="inherit">
                  {" "}
                  <Link to={`/home`}>HOME</Link>
                </Button>

                <Button color="inherit">
                  {" "}
                  <Link to={`/checklist`}>CHECK LIST</Link>
                </Button>
                <Button
                  color="inherit"
                  id="resources-button"
                  onClick={handleClick}
                  aria-controls={open ? "resources-menu" : undefined}
                  aria-aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                >
                  <Link to={`/resources`}>REPORTS</Link>
                </Button>
                {/* <Button color="inherit">Login</Button> */}
              </Stack>
            </div>
          )}
        {/* <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ "aria-labelledby": "resources-button" }}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to={`/`}>Home</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={`/`}>CheckList</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={`/examinor`}>Examinor</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={`/adminlog`}>Admin Logs</Link>
          </MenuItem>
        </Menu> */}

        {localStorage.getItem("token-info") && (
          <Avatar {...stringAvatar(localStorage.getItem("token-info"))} />
        )}
        {localStorage.getItem("token-info") && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
