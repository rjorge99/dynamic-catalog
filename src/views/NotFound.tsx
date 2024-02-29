import { Box, Typography } from '@mui/material';

const NotFound = () => {
   return (
      <Box height='100%' display='grid' sx={{ placeContent: 'center' }}>
         <Typography component='h2' variant='h2'>
            Page not found
         </Typography>
      </Box>
   );
};

export default NotFound;
