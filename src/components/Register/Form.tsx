import React, { useEffect } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, reset } from '../../features/auth/authSlice'
import { AppDispatch, RootState } from '../../store';
import { toast } from 'react-toastify'

//INTERFACE
import User from '../../interfaces/User'

interface Register extends User {
    confirmPassword?: string
}

export default function Form(): JSX.Element {

    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit,  formState: { errors }  } = useForm<Register>();

    const { isError, message } = useSelector((state: RootState) => state.auth)

    const onSubmit: SubmitHandler<Register> = data => {
        if(data.confirmPassword === data.password) {
            delete data.confirmPassword
            const userData: Register = {...data}
            dispatch(registerUser(userData));
        } else {
            toast.error("The password confirmation does not match")
        }
    };

    useEffect(() => {
        if(isError) {
            toast.error(message as string);
            dispatch(reset());
        }
        
    }, [isError, message, dispatch])

    return(
        <div className="col text-center m-auto pt-4" style={{maxWidth: "18rem"}} >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* NAME Input */}
                <TextField id="name" label="Name" variant='outlined' size='small' color='primary' className='w-100'
                    required
                    error={!!errors.name}
                    {...register("name", {required: true})} />

                {/* EMAIL Input */}
                <TextField id="email" label="Email" variant='outlined' size='small' color='primary' className='mt-2 w-100' type="email"
                    required
                    error={!!errors.email}
                    {...register("email", {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})} />

                {errors?.email?.type === "pattern" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Invalid Email </Typography>
                    </>
                    
                }

                {/* PASSWORD Input */}
                <TextField id="password" label="Password" variant='outlined' size='small' className='mt-2 w-100'type="password" 
                    required
                    error={!!errors.password}
                    {...register('password', {required: true, minLength: 8})} /> 
                
                {errors?.password?.type === "minLength" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Password must be at least 8 characters long </Typography>
                    </>
                    
                }

                {/* CONFIRM PASSWORD Input */}
                <TextField id="confirmPassword" label="Confirm Password" variant='outlined' size='small' className='my-2 w-100' type="password" 
                    required
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword', {required: true, minLength: 8})} /> 
                
                {errors?.confirmPassword?.type === "minLength" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Password must be at least 8 characters long </Typography>
                    </>
                    
                }

                <Button type="submit" variant="contained" size='small' color='secondary' className={`mt-4`} sx={{minWidth: 120}} > Register </Button>
            </form>
        </div>
    )
}