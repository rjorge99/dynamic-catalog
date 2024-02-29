import { Button, Stack } from '@mui/material';
import { useCatalogsStore } from '../stores/catalogs-store';
import { useAuthStore } from '../stores/auth-store';
import { MessageType, notify } from '../utils/notifier';

const DashBoard = () => {
   const createCatalogStructure = useCatalogsStore((store) => store.createCatalogStructure);
   const { uid } = useAuthStore((store) => store.loggedUser!);

   const notificar = () => {
      notify('Mensaje', MessageType.Error);
   };

   return (
      <Stack alignItems='flex-start' gap={2}>
         <Button
            variant='outlined'
            // onClick={() => createCatalogStructure(uid, 'medicamentos', { fecha: 'string', nombre: 'string', uid })}>
            onClick={notificar}>
            Create Catalog Structure
         </Button>
      </Stack>
   );
};

export default DashBoard;
