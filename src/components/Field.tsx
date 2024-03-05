import { Box, Button, Card, CardContent, MenuItem, Select, TextField } from '@mui/material';
import { CatalogField, FIELD_TYPES } from '../types/types';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
   onDelete: (key: string) => void;
   onChange: (id: string, name: string, type: string) => void;
   catalogField: CatalogField;
}

const Field = ({ onDelete, onChange, catalogField }: Props) => {
   const { id, name, type } = catalogField;
   const [nameField, setNameField] = useState(name);
   const nameFieldDebounced = useDebounce<string>(nameField, 300);

   useEffect(() => {
      onChange(id, nameFieldDebounced, type);
   }, [nameFieldDebounced, id, type, onChange]);

   return (
      <Card
         sx={{
            width: {
               xs: '100%',
               sm: 800
            }
         }}
         className='catalog-field'>
         <CardContent>
            <Box
               display='flex'
               gap={1}
               width='100%'
               flexDirection='column'
               sx={{
                  flexDirection: { xs: 'column', sm: 'row' }
               }}>
               <TextField sx={{ flexGrow: 1 }} size='small' value={nameField} onChange={(e) => setNameField(e.target.value)} />
               <Select
                  size='small'
                  onChange={(e) => onChange(id, name, e.target.value)}
                  value={type}
                  label='Field'
                  sx={{ minWidth: 160 }}>
                  {Object.entries(FIELD_TYPES).map(([key, value]) => (
                     <MenuItem key={key} value={key}>
                        {value}
                     </MenuItem>
                  ))}
               </Select>
               <Button variant='contained' color='error' startIcon={<DeleteIcon />} onClick={() => onDelete(id)}>
                  Delete
               </Button>
            </Box>
         </CardContent>
      </Card>
   );
};

export default Field;
