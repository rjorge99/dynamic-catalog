import { Logout, Mail, GridView } from '@mui/icons-material';
import { Divider, List } from '@mui/material';
import { useAuthStore } from '../../stores/auth-store';
import { useCatalogsStore } from '../../stores/catalogs-store';
import { useUIStore } from '../../stores/ui-store';
import ListElement from './ListElement';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
   const signOut = useAuthStore((store) => store.signOut);
   const resetAuth = useAuthStore((store) => store.reset);
   const resetCatalog = useCatalogsStore((store) => store.reset);
   const resetUI = useUIStore((store) => store.reset);
   const catalogStructures = useCatalogsStore((store) => store.catalogsStructures);
   const navigate = useNavigate();

   const handleLogout = () => {
      signOut();
      resetAuth();
      resetCatalog();
      resetUI();
   };

   return (
      <>
         <List>
            {catalogStructures.map(({ catalogName }) => (
               <ListElement text={catalogName} key={catalogName} Icon={<Mail />} />
            ))}
         </List>
         <Divider />
         <List>
            <ListElement text='Catalogs' Icon={<GridView />} onClick={() => navigate('/catalogs')} />
         </List>
         <Divider />
         <List>
            <ListElement text='Logout' onClick={handleLogout} Icon={<Logout />} />
         </List>
      </>
   );
};

export default MenuList;
