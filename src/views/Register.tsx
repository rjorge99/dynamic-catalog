import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';

const Register = () => {
    return (
        <>
            <Box
                padding={2}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                height='100%'>
                <Box>
                    <Typography component='h2' variant='h4' fontWeight='bold' mt={3}>
                        Register for an account
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mt: 5,
                        width: '100%',
                        maxWidth: {
                            sm: '480px'
                        }
                    }}>
                    <TextField
                        fullWidth
                        label='Username'
                        type='text'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        label='Password'
                        type='password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <VpnKey />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        label='Confirm Password'
                        type='password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <VpnKey />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                        sx={{ mt: 3 }}>
                        Sign Up
                    </Button>

                    <Link href='#' underline='none'>
                        <Typography
                            color='secondary'
                            variant='body2'
                            fontWeight='bold'
                            mt={1}
                            textAlign='right'>
                            Sign In
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </>
    );
};

export default Register;
