import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import catalogIcon from '../../assets/catalog.png';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';

const Login = () => {
   const signInWithGoogle = useAuthStore((store) => store.signInWithGoogle);
   const signOutFromGoogle = useAuthStore((store) => store.signOutFromGoogle);
   const signInWithEmailPassword = useAuthStore((store) => store.signInWithEmailPassword);

   const handleLoginGoogle = async () => {
      signInWithGoogle();
   };

   const handleSignInWithEmailPassword = async () => {
      signInWithEmailPassword('fake@test.com', 'password');
   };

   const handleLogoutGoogle = async () => {
      signOutFromGoogle();
   };

   return (
      <Box padding={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
         <img src={catalogIcon} alt='Catalog image' width={80} />
         <Box>
            <Typography component='h2' variant='h4' fontWeight='bold' mt={3}>
               Sign into your account
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
               name='email'
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
               name='password'
               type='password'
               InputProps={{
                  endAdornment: (
                     <InputAdornment position='end'>
                        <VpnKey />
                     </InputAdornment>
                  )
               }}
            />
            {/* <Link href='#' underline='none'>
               <Typography color='secondary' variant='body2' fontWeight='bold' mt={1} textAlign='right'>
                  Forgot your password?
               </Typography>
            </Link> */}
            <Button onClick={handleSignInWithEmailPassword} variant='contained' color='secondary' fullWidth sx={{ mt: 3 }}>
               Sign In
            </Button>
            <Box textAlign='center' mt={3}>
               <Typography variant='body2' display='inline-block'>
                  Don't have an account?
               </Typography>{' '}
               <Link to='/auth/register' component={RouterLink} underline='none'>
                  <Typography color='secondary' variant='body2' fontWeight='bold' display='inline-block'>
                     Create an account
                  </Typography>
               </Link>
            </Box>
            <Box textAlign='center' mt={2}>
               <Button onClick={handleLoginGoogle} fullWidth>
                  Google login
               </Button>
            </Box>
            <Box textAlign='center' mt={2}>
               <Button onClick={handleLogoutGoogle} fullWidth>
                  Google logout
               </Button>
            </Box>
         </Box>
      </Box>
   );
};

export default Login;
