import { useState } from 'react';
import { Box } from '@mui/material';

//Components
import MainAppBar from '../../components/shared-components/Navigation/MainAppBar';
import MainContainer from '../../components/shared-components/Navigation/MainContainer';
import MainDrawer from '../../components/shared-components/Navigation/MainDrawer';


export default function Main(): JSX.Element {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen((lastVal) => !lastVal);
    };

    return(
        <Box sx={{ display: 'flex', height: "100%" }}>
            <MainAppBar open={open} handleDrawer={handleDrawer} />
            <MainDrawer open={open} handleDrawer={handleDrawer} />
            <MainContainer />
        </Box>
    )
}