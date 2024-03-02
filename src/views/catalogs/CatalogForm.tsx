import { Box, Button, TextField } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Field from '../../components/Field';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useCatalogsStore } from '../../stores/catalogs-store';
import { useAuthStore } from '../../stores/auth-store';

export interface CatalogField {
   id: string;
   name: string;
   type: string;
}

const CatalogForm = () => {
   const navigate = useNavigate();
   const [catalogName, setCatalogName] = useState('New Catalog');
   const [catalogFields, setCatalogFields] = useState<CatalogField[]>([]);
   const loggedUser = useAuthStore((store) => store.loggedUser);
   const createCatalogStructure = useCatalogsStore((store) => store.createCatalogStructure);

   const handleAddField = () => {
      setCatalogFields([...catalogFields, { id: crypto.randomUUID().replace(/-/g, ''), name: '', type: 'text' }]);
   };

   const handleSave = async () => {
      await createCatalogStructure(loggedUser!.uid, catalogName, catalogFields);
      navigate('/catalogs');
   };

   const handleDelete = (id: string) => {
      setCatalogFields(catalogFields.filter((field) => field.id !== id));
   };

   const onFieldChange = (id: string, name: string, type: string) => {
      setCatalogFields(catalogFields.map((field) => (field.id === id ? { ...field, name, type } : field)));
   };

   return (
      <>
         <Box display='flex' gap={5}>
            <TextField
               sx={{ flexGrow: 1 }}
               value={catalogName}
               onChange={(e) => setCatalogName(e.target.value)}
               label='Catalog Name'
               placeholder='Catalog'
               variant='standard'
            />
            <Button variant='contained' size='large' color='secondary' startIcon={<ControlPointIcon />} onClick={handleAddField}>
               Add Field
            </Button>
         </Box>
         <Box p={2} sx={{ mt: 5 }} display='flex' gap={2} flexDirection='column' alignItems='flex-start'>
            {catalogFields.map((field) => (
               <Field key={field.id} onDelete={handleDelete} catalogField={field} onChange={onFieldChange} />
            ))}
         </Box>
         <Box display='flex' gap={2} sx={{ mt: 5 }}>
            <Button variant='outlined' size='large' onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
               Go Back
            </Button>
            <Button variant='contained' size='large' onClick={handleSave}>
               Save
            </Button>
         </Box>
      </>
   );
};

export default CatalogForm;
