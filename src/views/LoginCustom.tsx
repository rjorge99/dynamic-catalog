import { AccountCircle } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

const LoginCustom = () => {
    return (
        <Box
            padding={2}
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            height='100%'>
            <Box
                sx={{
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
                        startAdornment: (
                            <InputAdornment position='start'>
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
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
                <Button variant='contained' color='secondary' fullWidth sx={{ mt: 3 }}>
                    Sign In
                </Button>
            </Box>
            {/* <Box width='100%'>
                <TextField
                    fullWidth
                    label='Username'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
            <Box width='100%'>
                <TextField
                    fullWidth
                    label='Password'
                    type='password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
            </Box> */}
        </Box>
    );
};

export default LoginCustom;
