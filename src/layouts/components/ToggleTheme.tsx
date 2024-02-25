import { IconButton } from '@mui/material';
import { useUIStore } from '../../stores/ui-store';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ToggleTheme = () => {
   const setColorMode = useUIStore((store) => store.toggleColorMode);
   const colorMode = useUIStore((store) => store.colorMode);

   return (
      <IconButton sx={{ ml: 1 }} onClick={setColorMode} color='inherit'>
         {colorMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
   );
};

export default ToggleTheme;
