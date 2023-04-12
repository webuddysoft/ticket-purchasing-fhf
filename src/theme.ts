import { createTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import React from "react";

declare module '@mui/material/styles' {
  interface TypographyVariants {
      date: React.CSSProperties;
      time: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    date?: React.CSSProperties;
    time?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    date: true;
    time: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system', 
      'BlinkMacSystemFont', 
      'Segoe UI', 
      'Roboto', 
      'Oxygen',
      'Ubuntu', 
      'Cantarell', 
      'Fira Sans', 
      'Droid Sans', 
      'Helvetica Neue',
      'sans-serif'
    ].join(", "),
    h2: {
      fontSize: "26px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "24px",
      fontWeight: "bold"
    },
    h4: {
      fontSize: "18px",
      fontWeight: "bold"
    },
    h5: {
      fontSize: "16px",
    },
    date: {
      fontSize: "16px",
      fontWeight: "bold",
      color: deepPurple[500],
      textTransform: "uppercase"
    },
    time: {
      fontSize: "14px",
      color: grey[600],
      textTransform: "uppercase"
    }
  }  
});

export default theme;