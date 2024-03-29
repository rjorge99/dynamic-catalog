import Box from '@mui/material/Box';
import { Divider, Drawer, IconButton } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import MenuList from '../components/menu/MenuList';
import { useUIStore } from '../stores/ui-store';
import HeaderBar from './components/HeaderBar';

const Layout = () => {
   const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
   const toggleDrawer = useUIStore((state) => state.toggleDrawer);

   return (
      <Box height='100%'>
         <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
            <Box>
               <IconButton onClick={toggleDrawer}>
                  <ChevronLeft />
               </IconButton>
            </Box>
            <Divider />
            <MenuList />
         </Drawer>
         <HeaderBar />
         <Box
            paddingBlock={4}
            sx={{
               paddingInline: {
                  xs: 2,
                  sm: 4
               }
            }}
            height='100%'
            paddingTop={13}>
            <Outlet />
         </Box>
      </Box>
   );
};

export default Layout;
