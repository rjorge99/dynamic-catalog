import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes/theme';

function App() {
   return (
      <ThemeProvider theme={lightTheme}>
         <CssBaseline />
      </ThemeProvider>
   );
}

export default App;
