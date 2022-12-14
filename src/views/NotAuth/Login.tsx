
import React from 'react'
import { Fade, Grid, Hidden, Slide, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

//Components
import Form from '../../components/Login/Form'
import DownloadApp from '../../utils/DownloadApp'

export default function Login(): JSX.Element {
    return(
        <Grid container className="mainBackground h-100">
             <Hidden only={['sm', 'xs']}>
                <Grid item xs={7} className="p-5">
                    <Fade in={true} timeout={2000}>
                        <div className="row h-100 w-100 justify-content-center align-items-center p-4">
                            <div>
                                <Typography variant="h3" className="fw-bold lh-1"> Welcome </Typography>
                                <Typography variant="h3" className="fw-bold lh-sm"> to Bank </Typography>
                                <Typography variant="h6" className="fw-light pt-2"> The bank app simplified for you. </Typography>
                                <DownloadApp />
                            </div>
                        </div>
                    </Fade>
                </Grid>
             </Hidden>
             <Slide direction="left" in={true} timeout={700}>
                <Grid item xs={12} md={5} className="mainTextColor bg-white">
                    <div className="row h-100 w-100 justify-content-center align-items-center p-4 mx-0">
                        <div className="text-center">
                            <Typography variant='subtitle1' className="fw-bold lh-1"> Login to your account </Typography>
                            <Typography variant='subtitle1' className="fw-bold"> Create an account <Link to="/register">here</Link> </Typography>
                            <Form />
                            <Typography variant='subtitle1' className="fw-bold"> Don't have an account? </Typography>
                            <Link to="/register"> Create an account </Link>
                            <Hidden only={['sm', 'xs']}>
                                <DownloadApp />
                            </Hidden>
                        </div>
                    </div>
                </Grid>
             </Slide>
        </Grid>
    )
}