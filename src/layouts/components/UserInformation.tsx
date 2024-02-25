import { Avatar, Box, Typography } from '@mui/material';
import { useAuthStore } from '../../stores/auth-store';

const UserInformation = () => {
   const loggedUser = useAuthStore((store) => store.loggedUser);
   const userImage = loggedUser?.photoURL;

   return (
      <Box display='flex' alignItems='center' gap={2}>
         <Typography variant='body1'>{loggedUser?.displayName}</Typography>
         <Avatar sx={{ width: 40, height: 40 }} src={userImage} />
      </Box>
   );
};

export default UserInformation;
