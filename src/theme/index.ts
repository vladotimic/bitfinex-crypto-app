import { createTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import { LinkBehavior } from '../components';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      white: string;
      grey: {
        main: string;
        light: string;
      };
    };
    shadow: {
      main: string;
    };
  }

  interface PaletteOptions {
    neutral: {
      white: string;
      grey: {
        main: string;
        light: string;
      };
    };
    shadow: {
      main: string;
    };
  }
}

const palette = {
  primary: {
    main: '#3bc6f5',
    dark: '#2db5e3',
  },
  neutral: {
    white: '#fff',
    grey: {
      main: '#a2a2a3',
      light: '#d6d6d6',
    },
  },
  shadow: {
    main: '0px 8px 24px rgba(149, 157, 165, 0.2)',
  },
};

const theme = createTheme({
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
        '.ActiveLink': {
          color: palette.primary.main,
        },
        '.InactiveLink': {
          color: palette.neutral.grey.main,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: 'none',
      } as LinkProps,
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        contained: {
          color: palette.neutral.white,
          borderRadius: 'unset',
          boxShadow: 'none',
          textTransform: 'capitalize',
        },
        sizeMedium: {
          minWidth: '6rem',
        },
      },
    },
  },
});

export default theme;
