import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CatalogField } from '../views/catalogs/CatalogForm';

const FIELD_TYPES = {
   text: 'Text',
   number: 'Number',
   date: 'Date'
};

interface Props {
   onDelete: (key: string) => void;
   onChange: (id: string, name: string, type: string) => void;
   catalogField: CatalogField;
}

const Field = ({ onDelete, onChange, catalogField: { id, name, type } }: Props) => {
   return (
      <Box display='flex' gap={2} width='100%'>
         <TextField sx={{ flexGrow: 1 }} size='small' value={name} onChange={(e) => onChange(id, e.target.value, type)} />
         <Select
            size='small'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            onChange={(e) => onChange(id, name, e.target.value)}
            value={type}
            label='Age'
            sx={{ minWidth: 120 }}>
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
   );
};

export default Field;
