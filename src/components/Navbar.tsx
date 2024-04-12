import { AppBar,Toolbar,IconButton,Typography,Stack, Button,Menu,MenuItem, Link} from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { useState } from "react"
import Home from "./Home"
export const Navbar = () =>
{
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>( null )
    const open = Boolean(anchorEl)
    const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) => { setAnchorEl( event?.currentTarget ) }
    const handleClose=()=>{setAnchorEl(null) }
    return (<AppBar position="static">
<Toolbar>
    <IconButton size="large" edge="start" color="inherit" aria-label="logo">
        <CatchingPokemonIcon/>
        </IconButton>
    <Typography variant="h6" component="div" sx={{flexGrow:1}}>
        AUDIT REPORTING TOOL
    </Typography>
    <Stack direction="row" spacing={2}>
        <Button color="inherit">Features</Button>
        {/* <Button color="inherit">Pricing</Button> */}
                <Button color="inherit">About</Button>
                <Button color="inherit" id='resources-button' onClick={ handleClick } aria-controls={ open ?
                    "resources-menu" : undefined }
                    aria-aria-expanded={ open ?
                    "true" : undefined }
                    aria-haspopup="true">Resources</Button>
        {/* <Button color="inherit">Login</Button> */}
            </Stack>
            <Menu id='resources-menu' anchorEl={ anchorEl } open={ open } MenuListProps={ { "aria-labelledby": "resources-button" } } onClose={handleClose}>
                <MenuItem onClick={ handleClose }  >
                    <Link >Home</Link>
                </MenuItem>
                <MenuItem onClick={handleClose} >CheckList</MenuItem>
                <MenuItem onClick={ handleClose }>Examinor</MenuItem>
                <MenuItem onClick={handleClose}>Admin Logs</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
    )
}

export default Navbar