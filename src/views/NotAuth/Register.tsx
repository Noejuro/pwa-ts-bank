import React from 'react'
import { Card, CardContent, Grow, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';

//Components
import Form from '../../components/Register/Form';

export default function Register(): JSX.Element {

    const theme         = useTheme();
    const breakpoint    = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <div className={`row h-100 w-100 justify-content-center align-items-center p-2 ${breakpoint && 'mainBackground'} mx-0`}>
            <div className='col-auto text-center'>
                <Grow in={true} timeout={500}>
                    <Card className="px-4" style={{ width: "100%", maxWidth: "44rem", borderRadius: "25px !important" }}>
                        <CardContent>
                            <Typography variant='h6' className="fw-bold pt-2"> Create an account </Typography>
                            <Form />
                            <Typography variant='subtitle2' className="fw-bold pt-4 lh-1"> Already have an account? </Typography>
                            <Link to="/login"> Login </Link>
                        </CardContent>
                    </Card>
                </Grow>
            </div>
        </div>
    )
}