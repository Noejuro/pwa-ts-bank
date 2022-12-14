
import React from 'react'
import { Toolbar, Box, useTheme, useMediaQuery } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

//Views
import Transactions from '../../../views/Main/Transactions/Transactions';

export default function MainContainer(): JSX.Element {

    const theme         = useTheme();
    const breakpoint    = useMediaQuery(theme.breakpoints.up('md'));

    return(
        <Box component="main" sx={{ flexGrow: 1, p: 0, height: "100%" }}>
            <div className="col h-100">
                <div className="d-flex flex-row flex-grow-1 mx-0 h-100">
                    <div className={`d-flex flex-column pb-3 h-100 flex-grow-1 ${breakpoint ? 'px-5' : 'px-3' }`}>
                        <Toolbar className="mb-2" />
                        <Routes>
                            <Route path="/"             element={<Navigate to="/transactions" />} />
                            <Route path="transactions"        element={<Transactions />} />
                            <Route path="*"             element={<Navigate to="/transactions" />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Box>
    )
}