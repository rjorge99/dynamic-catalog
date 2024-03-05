import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import { useCatalogsStore } from '../../stores/catalogs-store';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ConfirmationDialog from '../../components/commons/Confirmation';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CatalogsList = () => {
   const catalogsStructures = useCatalogsStore((store) => store.catalogsStructures);
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const deleteCatalog = useCatalogsStore((store) => store.deleteCatalog);
   const catalogIdRef = useRef('');
   const navigate = useNavigate();

   const handleDeleteCatalog = (catalogId: string) => async () => {
      catalogIdRef.current = catalogId;
      setIsDeleteDialogOpen(true);
   };

   const handleConfirmDeleteCatalog = async () => {
      await deleteCatalog(catalogIdRef.current);
      navigate('/');
   };

   const handleCloseDialog = () => {
      setIsDeleteDialogOpen(false);
   };
   return (
      <>
         <TableContainer component={Paper} sx={{ maxWidth: { xs: '100%', sm: 900 } }}>
            <Table aria-label='Catalogs table'>
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {catalogsStructures.map((catalog) => (
                     <TableRow key={catalog.catalogName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                           {catalog.catalogName}
                        </TableCell>
                        <TableCell>
                           <Box display='flex' gap={1} sx={{ justifyContent: 'flex-end' }}>
                              <Button
                                 variant='contained'
                                 color='secondary'
                                 startIcon={<EditIcon />}
                                 onClick={() => navigate(`/catalogs/${catalog.catalogId}`)}>
                                 Edit
                              </Button>
                              <Button
                                 variant='contained'
                                 color='error'
                                 startIcon={<DeleteIcon />}
                                 onClick={handleDeleteCatalog(catalog.catalogId)}>
                                 Delete
                              </Button>
                           </Box>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <Button
            sx={{ mt: 5 }}
            variant='contained'
            size='large'
            startIcon={<ControlPointIcon />}
            onClick={() => navigate('/catalogs/new')}>
            New Catalog
         </Button>

         <ConfirmationDialog
            message='Are you sure you want to delete this catalog?'
            isOpen={isDeleteDialogOpen}
            onAccept={handleConfirmDeleteCatalog}
            onClose={handleCloseDialog}
         />
      </>
   );
};

export default CatalogsList;
