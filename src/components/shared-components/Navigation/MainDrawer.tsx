import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../../features/auth/authSlice'

//Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppDispatch } from '../../../store';
import { resetAssociate, resetTransactions } from '../../../features/bank/bankSlice';

interface IProps {
    open: boolean,
    handleDrawer() : void
}

const drawerWidth: number = 200;

export default function MainDrawer(props: IProps): JSX.Element {

    const theme         = useTheme();
    const breakpoint    = useMediaQuery(theme.breakpoints.up('md'));
    const dispatch      = useDispatch<AppDispatch>()

    const {open, handleDrawer} = props;

    const onLogout = () => {
        // Reset Auth
        dispatch(logout());
        dispatch(reset());
        dispatch(resetTransactions());
        dispatch(resetAssociate());
    }
    
    return(
        <Drawer
            variant={breakpoint ? "permanent" : "temporary"}
            open={open}
            onClose={handleDrawer}
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            PaperProps={{
                sx: {
                    backgroundColor: "#537895",
                    backgroundImage: "linear-gradient(315deg, #537895 0%, #09203f 74%)",
                    color: "white",
                }
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <Link to="/transactions"> 
                        <ListItem button>
                            <ListItemIcon>
                                <ShoppingCartIcon sx={{color: "white"}} />
                            </ListItemIcon>
                            <ListItemText  sx={{color: "white"}} primary="Transactions" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={onLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon sx={{color: "white"}} />
                        </ListItemIcon>
                        <ListItemText  sx={{color: "white"}} primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}