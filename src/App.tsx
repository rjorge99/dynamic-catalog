import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes/theme';
import Login from './views/Login';

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Login />
        </ThemeProvider>
    );
}

export default App;
