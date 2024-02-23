import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import catalogIcon from '../assets/catalog.png';

const Register = () => {
   return (
      <>
         <Box padding={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
            <img src={catalogIcon} alt='Catalog image' width={80} />
            <Box>
               <Typography component='h2' variant='h4' fontWeight='bold' mt={3}>
                  Create an account
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
                  label='Email'
                  type='email'
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
               <Button variant='contained' color='secondary' fullWidth sx={{ mt: 3 }}>
                  Sign Up
               </Button>

               <Box textAlign='center' mt={3}>
                  <Typography variant='body2' display='inline-block'>
                     Already an account?
                  </Typography>{' '}
                  <Link href='#' underline='none'>
                     <Typography color='secondary' variant='body2' fontWeight='bold' display='inline-block'>
                        Sign In
                     </Typography>
                  </Link>
               </Box>
            </Box>
         </Box>
      </>
   );
};

export default Register;
