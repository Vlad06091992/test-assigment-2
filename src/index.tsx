import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"
import {createTheme, ThemeProvider} from "@mui/material";

let persister = persistStore(store)
const container = document.getElementById('root')!;
const root = createRoot(container);


// const theme = createTheme({
//     typography: {
//         fontFamily: 'Montserrat',
//         button: {
//             textTransform: 'none',
//         },
//     },
//     palette: {
//         primary: {
//             light: '#757ce8',
//             main: '#366EFF',
//             dark: '#002884',
//             contrastText: '#fff',
//         },
//         secondary: {
//             light: '#ff7961',
//             main: '#f44336',
//             dark: '#ba000d',
//             contrastText: '#000',
//         },
//     },
// });

root.render(
    <React.StrictMode>
        {/*<ThemeProvider theme={theme}>*/}
        <Provider store={store}>
            <PersistGate persistor={persister}>
                <App/>
            </PersistGate>
        </Provider>
        {/*</ThemeProvider>*/}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
