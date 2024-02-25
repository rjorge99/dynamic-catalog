import { LockOutlined, MailOutline } from '@mui/icons-material';
import { Box, Button, Icon, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import * as Yup from 'yup';
import catalogIcon from '../../assets/catalog.png';
import googleIcon from '../../assets/google_icon.svg';

interface IFormProps {
   email: string;
   password: string;
}

const INITIAL_VALUES: IFormProps = {
   email: '',
   password: ''
};

const GoogleIcon = () => {
   return (
      <Icon aria-label='google icon' style={{ display: 'flex', justifyContent: 'center' }}>
         <img src={googleIcon} alt='google icon' style={{ width: '100%' }} />
      </Icon>
   );
};

const Login = () => {
   console.log('Login');
   const signInWithGoogle = useAuthStore((store) => store.signInWithGoogle);
   const signInWithEmailPassword = useAuthStore((store) => store.signInWithEmailPassword);

   return (
      <Box padding={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
         <img src={catalogIcon} alt='Catalog image' width={80} />
         <Box>
            <Typography component='h2' variant='h4' fontWeight='bold' mt={3}>
               Sign into your account
            </Typography>
         </Box>
         <Formik
            onSubmit={({ email, password }, { setSubmitting }) => {
               setSubmitting(true);
               signInWithEmailPassword(email, password);
            }}
            validationSchema={Yup.object({
               email: Yup.string().email('Invalid email').required('Email is required'),
               password: Yup.string()
                  .min(5, 'Must be at least 5 characters')
                  .max(20, 'Must be at most 20 characters')
                  .required('Password is required')
            })}
            initialValues={INITIAL_VALUES}>
            {({ values, errors, handleChange, handleBlur, isSubmitting, touched, handleSubmit }) => (
               <form onSubmit={handleSubmit}>
                  <Box
                     sx={{
                        mt: 5,
                        width: '100%',
                        maxWidth: {
                           sm: '480px'
                        }
                     }}>
                     <TextField
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        label='Email'
                        type='email'
                        name='email'
                        helperText={errors.email && touched.email && errors.email}
                        error={touched.email && !!errors?.email}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 <MailOutline />
                              </InputAdornment>
                           )
                        }}
                     />
                     <TextField
                        helperText={errors.password && touched.password && errors.password}
                        error={touched.password && !!errors?.password}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mt: 3 }}
                        fullWidth
                        label='Password'
                        name='password'
                        type='password'
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 <LockOutlined />
                              </InputAdornment>
                           )
                        }}
                     />
                     <Button disabled={isSubmitting} variant='contained' fullWidth sx={{ mt: 3 }} type='submit'>
                        Sign In
                     </Button>
                     <Box textAlign='center' mt={3}>
                        <Typography variant='body2' display='inline-block'>
                           Don't have an account?
                        </Typography>{' '}
                        <Link to='/auth/register' component={RouterLink} underline='none'>
                           <Typography variant='body2' fontWeight='bold' display='inline-block'>
                              Create an account
                           </Typography>
                        </Link>
                     </Box>
                     <Box textAlign='center' mt={2}>
                        <Button onClick={signInWithGoogle} variant='outlined' fullWidth startIcon={<GoogleIcon />}>
                           Login with Google
                        </Button>
                     </Box>
                  </Box>
               </form>
            )}
         </Formik>
      </Box>
   );
};

export default Login;
