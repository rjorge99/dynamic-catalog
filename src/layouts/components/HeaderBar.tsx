import { Toolbar, IconButton, Typography, Box, AppBar } from '@mui/material';
import ToggleTheme from './ToggleTheme';
import UserInformation from './UserInformation';
import MenuIcon from '@mui/icons-material/Menu';
import { useUIStore } from '../../stores/ui-store';

const HeaderBar = () => {
   const toggleDrawer = useUIStore((state) => state.toggleDrawer);

   return (
      <>
         <AppBar position='fixed'>
            <Toolbar>
               <IconButton onClick={toggleDrawer} size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                  <MenuIcon />
               </IconButton>
               <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  Catalogs
               </Typography>
               <Box display='flex' alignItems='center' gap={1}>
                  <ToggleTheme />
                  <UserInformation />
               </Box>
            </Toolbar>
         </AppBar>
      </>
   );
};

export default HeaderBar;
