import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem, Paper } from "@mui/material"
import { MainFormComponent } from "./MainForm"
import { Check } from "@mui/icons-material"

export const CardLayout = () =>
{
    return ( <Paper sx={ { padding: "32px" } }>        
        <MainFormComponent/>       
    </Paper>)
}
export default CardLayout