//REACT
import React from 'react';
//MUI COMPONENTS
import { createTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes} from '@material-ui/core';
//MUI COLORS
import {blue, green, red} from '@material-ui/core/colors';
 
const theme = createTheme({
    palette: {
        type: 'dark',
        secondary: red,
        primary: blue,
    },
});
 
const responsiveTheme = responsiveFontSizes(theme);
 
const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={responsiveTheme}>
            <CssBaseline/>
            {props.children}
        </MuiThemeProvider>
    );
};
 
export default DefaultThemeProvider;