import { CssBaseline, ThemeProvider } from '@mui/material';
import LoginCustom from './views/LoginCustom';
import { lightTheme } from './themes/theme';

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {/* <LoginMaterial /> */}   
            {/* <Login /> */}
            <LoginCustom />
        </ThemeProvider>
    );
}

export default App;
