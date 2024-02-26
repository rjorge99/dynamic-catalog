import { Button, Stack } from '@mui/material';
import { useCatalogsStore } from '../stores/catalogs-store';
import { useAuthStore } from '../stores/auth-store';

const DashBoard = () => {
   const createCatalogStructure = useCatalogsStore((store) => store.createCatalogStructure);
   const { uid } = useAuthStore((store) => store.loggedUser!);

   return (
      <Stack alignItems='flex-start' gap={2}>
         <Button
            variant='outlined'
            onClick={() => createCatalogStructure(uid, 'medicamentos', { fecha: 'string', nombre: 'string', uid })}>
            Create Catalog Structure
         </Button>
      </Stack>
   );
};

export default DashBoard;
