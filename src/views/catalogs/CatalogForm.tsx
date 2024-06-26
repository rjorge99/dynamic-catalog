import { Box, Button, TextField } from '@mui/material';
import { useAuthStore } from '../../stores/auth-store';
import { useCatalogsStore } from '../../stores/catalogs-store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Field from '../../components/Field';
import { CatalogField } from '../../types/types';
import { Reorder } from 'framer-motion';
import { MessageType, notify } from '../../utils/notifier';

// TODO: Usar formik para validaciones?
const CatalogForm = () => {
   const navigate = useNavigate();
   const { catalogId } = useParams();
   const [catalogName, setCatalogName] = useState('');
   const [catalogFields, setCatalogFields] = useState<CatalogField[]>([]);
   const loggedUser = useAuthStore((store) => store.loggedUser);
   const createCatalogStructure = useCatalogsStore((store) => store.createCatalogStructure);
   const getCatalogStructureById = useCatalogsStore((store) => store.getCatalogStructureById);
   const updateCatalogStructureById = useCatalogsStore((store) => store.updateCatalogStructureById);

   const handleAddField = () => {
      setCatalogFields([...catalogFields, { id: crypto.randomUUID().replace(/-/g, ''), name: '', type: 'text' }]);
   };

   useEffect(() => {
      if (catalogId === 'new') return;

      async function getCatalogStructure() {
         const catalog = await getCatalogStructureById(catalogId!);

         setCatalogName(catalog!.catalogName);
         setCatalogFields(catalog!.catalogFields);
      }
      getCatalogStructure();
   }, [catalogId, getCatalogStructureById]);

   const handleSaveCatalog = async () => {
      if (catalogName.trim() === '') return notify('Catalog name is required', MessageType.Error);
      if (catalogFields.length === 0 || catalogFields.filter((field) => field.name.trim() === '').length > 0)
         return notify('All fields must have a name', MessageType.Error);

      if (catalogId === 'new') await createCatalogStructure(loggedUser!.uid, catalogName, catalogFields);
      else await updateCatalogStructureById(catalogId!, loggedUser!.uid, catalogName, catalogFields);
      navigate('/catalogs');
   };

   const handleDeleteField = (id: string) => {
      setCatalogFields(catalogFields.filter((field) => field.id !== id));
   };

   const onFieldChange = (id: string, name: string, type: string) => {
      setCatalogFields(catalogFields.map((field) => (field.id === id ? { ...field, name, type } : field)));
   };

   return (
      <>
         <Box
            display='flex'
            gap={2}
            sx={{
               flexDirection: {
                  xs: 'column',
                  sm: 'row'
               }
            }}>
            <TextField
               autoComplete='off'
               sx={{ flexGrow: 1, maxWidth: 630 }}
               value={catalogName}
               onChange={(e) => setCatalogName(e.target.value)}
               label='Catalog Name'
               placeholder='Catalog'
               variant='standard'
               autoFocus
            />
            <Button variant='contained' size='large' color='secondary' startIcon={<ControlPointIcon />} onClick={handleAddField}>
               Add Field
            </Button>
         </Box>
         <Box sx={{ mt: 5 }} display='flex' gap={2} flexDirection='column' alignItems='flex-start'>
            <Reorder.Group axis='y' values={catalogFields} onReorder={setCatalogFields}>
               {catalogFields.map((field) => (
                  <Reorder.Item key={field.id} value={field}>
                     <Field onDelete={handleDeleteField} catalogField={field} onChange={onFieldChange} />
                  </Reorder.Item>
               ))}
            </Reorder.Group>
         </Box>
         <Box display='flex' gap={2} sx={{ mt: 5 }}>
            <Button variant='outlined' size='large' onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
               Go Back
            </Button>
            <Button variant='contained' size='large' onClick={handleSaveCatalog}>
               Save
            </Button>
         </Box>
      </>
   );
};

export default CatalogForm;
