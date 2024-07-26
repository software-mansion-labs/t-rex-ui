import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from '@site/src/theme/muiTheme';

export default function Root({ children }) {
  return (
    <>
      <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
    </>
  );
}
