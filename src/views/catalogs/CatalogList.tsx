import { useParams } from 'react-router-dom';
import { useCatalogsStore } from '../../stores/catalogs-store';
import { useEffect, useState } from 'react';
import { CatalogStructure } from '../../types/types';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { EditNote } from '@mui/icons-material';

const CatalogList = () => {
   const { catalogId } = useParams();
   const [currentCatalog, setCurrentCatalog] = useState<CatalogStructure | null>(null);
   const getCatalogStructureById = useCatalogsStore((store) => store.getCatalogStructureById);

   useEffect(() => {
      async function getCatalogInformation(catalogId: string) {
         const catalog = await getCatalogStructureById(catalogId!);
         console.log(catalog);
         setCurrentCatalog(catalog);
      }

      getCatalogInformation(catalogId!);
   }, [getCatalogStructureById]);

   return (
      <Box>
         <Box mb={2} display={'flex'} justifyContent={'space-between'} gap={2}>
            <TextField size='small' placeholder='Search' sx={{ flexGrow: { xs: 1, sm: 0 }, minWidth: { sm: 400 } }} />
            <Button variant='contained' color='secondary' startIcon={<EditNote />}>
               Edit
            </Button>
         </Box>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
               <TableHead>
                  <TableRow>
                     {currentCatalog?.catalogFields.map((field, index) => (
                        <TableCell align={index === 0 ? 'left' : 'right'} key={field.id}>
                           {field.name}
                        </TableCell>
                     ))}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {/* {rows.map((row) => (
                     <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                           {row.name}
                        </TableCell>
                        <TableCell align='right'>{row.calories}</TableCell>
                        <TableCell align='right'>{row.fat}</TableCell>
                        <TableCell align='right'>{row.carbs}</TableCell>
                        <TableCell align='right'>{row.protein}</TableCell>
                     </TableRow>
                  ))} */}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

export default CatalogList;
