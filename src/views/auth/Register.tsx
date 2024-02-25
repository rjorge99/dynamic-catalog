import { AccountCircleOutlined, LockOutlined, MailOutline } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import catalogIcon from '../../assets/catalog.png';
import { useAuthStore } from '../../stores/auth-store';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface IFormProps {
   displayName: string;
   email: string;
   password: string;
   confirmPassword: string;
}

const INITIAL_VALUES: IFormProps = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
};

const Register = () => {
   const createUserEmailAndPassword = useAuthStore((store) => store.createUserEmailAndPassword);

   return (
      <>
         <Box padding={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
            <img src={catalogIcon} alt='Catalog image' width={80} />
            <Box>
               <Typography component='h2' variant='h4' fontWeight='bold' mt={3}>
                  Create an account
               </Typography>
            </Box>
            <Formik
               initialValues={INITIAL_VALUES}
               validationSchema={Yup.object({
                  displayName: Yup.string().max(20, 'Must be at most 20 characters').required('Name is required'),
                  email: Yup.string().email('Invalid email').required('Email is required'),
                  password: Yup.string()
                     .min(5, 'Password must be at least 5 characters')
                     .max(20, 'Must be at most 20 characters')
                     .required('Password is required'),
                  confirmPassword: Yup.string()
                     .oneOf([Yup.ref('password')], 'Passwords must match')
                     .required('Please confirm your password')
               })}
               onSubmit={({ displayName, email, password }, { setSubmitting }) => {
                  setSubmitting(true);
                  createUserEmailAndPassword(displayName, email, password);
               }}>
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
                           value={values.displayName}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           fullWidth
                           label='Name'
                           name='displayName'
                           type='text'
                           autoComplete='off'
                           helperText={errors.displayName && touched.displayName && errors.displayName}
                           error={touched.displayName && !!errors?.displayName}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position='end'>
                                    <AccountCircleOutlined />
                                 </InputAdornment>
                              )
                           }}
                        />
                        <TextField
                           helperText={errors.email && touched.email && errors.email}
                           error={touched.email && !!errors?.email}
                           value={values.email}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           fullWidth
                           sx={{ mt: 3 }}
                           label='Email'
                           autoComplete='off'
                           name='email'
                           type='email'
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position='end'>
                                    <MailOutline />
                                 </InputAdornment>
                              )
                           }}
                        />
                        <TextField
                           sx={{ mt: 3 }}
                           helperText={errors.password && touched.password && errors.password}
                           error={touched.password && !!errors?.password}
                           fullWidth
                           value={values.password}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           name='password'
                           label='Password'
                           type='password'
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position='end'>
                                    <LockOutlined />
                                 </InputAdornment>
                              )
                           }}
                        />
                        <TextField
                           sx={{ mt: 3 }}
                           helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                           error={touched.confirmPassword && !!errors?.confirmPassword}
                           fullWidth
                           value={values.confirmPassword}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           name='confirmPassword'
                           label='Confirm Password'
                           type='password'
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position='end'>
                                    <LockOutlined />
                                 </InputAdornment>
                              )
                           }}
                        />
                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }} disabled={isSubmitting}>
                           Sign Up
                        </Button>

                        <Box textAlign='center' mt={3}>
                           <Typography variant='body2' display='inline-block'>
                              Already have an account?
                           </Typography>{' '}
                           <Link to='/auth/login' component={RouterLink} underline='none'>
                              <Typography variant='body2' fontWeight='bold' display='inline-block'>
                                 Sign In
                              </Typography>
                           </Link>
                        </Box>
                     </Box>
                  </form>
               )}
            </Formik>
         </Box>
      </>
   );
};

export default Register;
