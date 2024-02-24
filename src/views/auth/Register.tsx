import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import catalogIcon from '../../assets/catalog.png';
import { useAuthStore } from '../../stores/auth-store';
import { useUIStore } from '../../stores/ui-store';

const Register = () => {
   const createUserEmailAndPassword = useAuthStore((store) => store.createUserEmailAndPassword);
   const setIsLoading = useUIStore((store) => store.setIsLoading);

   const handleCreateUser = async () => {
      setIsLoading(true);
      // await createUserEmailAndPassword('jprge', 'carlos@hotmail.com', '1233456');
   };

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
                  label='Name'
                  name='name'
                  type='text'
                  autoComplete='off'
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position='end'>
                           <AccountCircle />
                        </InputAdornment>
                     )
                  }}
               />
               <TextField
                  fullWidth
                  sx={{ mt: 3 }}
                  label='Email'
                  autoComplete='off'
                  name='email'
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
                  name='password'
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
               <Button onClick={handleCreateUser} variant='contained' fullWidth sx={{ mt: 3 }}>
                  Sign Up
               </Button>

               <Box textAlign='center' mt={3}>
                  <Typography variant='body2' display='inline-block'>
                     Already an account?
                  </Typography>{' '}
                  <Link to='/' component={RouterLink} underline='none'>
                     <Typography variant='body2' fontWeight='bold' display='inline-block'>
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
