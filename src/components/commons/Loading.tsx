import { Box, Typography } from '@mui/material';

const Loading = () => {
   return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh' position='absolute' sx={{ width: '100%' }}>
         <Typography component='h2' variant='h1'>
            Loading...
         </Typography>
      </Box>
   );
};

export default Loading;
