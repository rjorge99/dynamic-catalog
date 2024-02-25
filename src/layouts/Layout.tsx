import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth-store';
import { Logout } from '@mui/icons-material';
import UserInformation from './components/UserInformation';
import ToggleTheme from './components/ToggleTheme';

export const DRAWER_WIDTH = 240;
export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
   width: DRAWER_WIDTH,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
   }),
   overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
   }
});

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   ...(open && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
   width: DRAWER_WIDTH,
   flexShrink: 0,
   whiteSpace: 'nowrap',
   boxSizing: 'border-box',
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
   })
}));

const Layout = () => {
   const theme = useTheme();
   const [open, setOpen] = React.useState(false);
   const signOutFromGoogle = useAuthStore((store) => store.signOutFromGoogle);

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position='fixed' open={open}>
            <Toolbar sx={{ display: 'flex' }}>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  sx={{
                     marginRight: 5,
                     ...(open && { display: 'none' })
                  }}>
                  <MenuIcon />
               </IconButton>
               <Typography variant='h6' noWrap component='div' flexGrow={1}>
                  Catalogs
               </Typography>
               <Box display='flex' alignItems='center' gap={1}>
                  <ToggleTheme />
                  <UserInformation />
               </Box>
            </Toolbar>
         </AppBar>
         <Drawer variant='permanent' open={open}>
            <DrawerHeader>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
               </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
               {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                     <ListItemButton
                        sx={{
                           minHeight: 48,
                           justifyContent: open ? 'initial' : 'center',
                           px: 2.5
                        }}>
                        <ListItemIcon
                           sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center'
                           }}>
                           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
            <Divider />
            <List>
               {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                     <ListItemButton
                        sx={{
                           minHeight: 48,
                           justifyContent: open ? 'initial' : 'center',
                           px: 2.5
                        }}>
                        <ListItemIcon
                           sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center'
                           }}>
                           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
            <Divider />
            <List>
               <ListItem onClick={signOutFromGoogle} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                     sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5
                     }}>
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                           justifyContent: 'center'
                        }}>
                        <Logout />
                     </ListItemIcon>
                     <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
               </ListItem>
            </List>
         </Drawer>
         <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
         </Box>
      </Box>
   );
};

export default Layout;
