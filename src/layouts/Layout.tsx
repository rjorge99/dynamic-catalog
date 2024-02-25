import Box from '@mui/material/Box';
import { useAuthStore } from '../stores/auth-store';
import {
   AppBar,
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Toolbar,
   Typography
} from '@mui/material';
import ToggleTheme from './components/ToggleTheme';
import UserInformation from './components/UserInformation';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft, Logout } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { PropsWithChildren, useState } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
   const [open, setOpen] = useState(false);
   const signOutFromGoogle = useAuthStore((store) => store.signOutFromGoogle);

   const toggleDrawer = () => {
      setOpen((isOpened) => !isOpened);
   };

   return (
      <Box>
         <Drawer open={open} onClose={toggleDrawer}>
            <Box>
               <IconButton onClick={toggleDrawer}>
                  <ChevronLeft />
               </IconButton>
            </Box>
            <Divider />
            <List>
               {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                     <ListItemButton
                        sx={{
                           minHeight: 48,
                           justifyContent: open ? 'initial' : 'center',
                           px: 7
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
                           px: 7
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
                        px: 7
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
         <AppBar position='static'>
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
         <Box padding={4}>{children}</Box>
      </Box>
   );
};

export default Layout;
