import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconProps } from '@mui/material';
import { useUIStore } from '../../stores/ui-store';

interface Props {
   text: string;
   onClick?: () => void;
   Icon: React.ReactElement<SvgIconProps>;
}

const ListElement = ({ text, onClick, Icon }: Props) => {
   const isDrawOpen = useUIStore((state) => state.isDrawerOpen);

   return (
      <ListItem
         disablePadding
         sx={{ display: 'block' }}
         onClick={() => {
            onClick && onClick();
         }}>
         <ListItemButton
            sx={{
               minHeight: 48,
               justifyContent: isDrawOpen ? 'initial' : 'center',
               px: 7
            }}>
            <ListItemIcon
               sx={{
                  minWidth: 0,
                  mr: isDrawOpen ? 3 : 'auto',
                  justifyContent: 'center'
               }}>
               {Icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: isDrawOpen ? 1 : 0 }} />
         </ListItemButton>
      </ListItem>
   );
};

export default ListElement;
