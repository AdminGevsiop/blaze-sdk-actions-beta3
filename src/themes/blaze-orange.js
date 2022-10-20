import { fade } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'

const themeColor = {
  primary: '#fba100',
  secondary: '#ffbf4d',
  success: '#4caf50',
  info: '#2196f3',
  warning: '#ff9800',
  error: '#f44336',
};

const blazeOrange = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: themeColor.primary,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: themeColor.secondary,
      // dark: will be calculated from palette.secondary.main,
    },
    success: {
      main: themeColor.success,
    },
    info: {
      main: themeColor.info,
    },
    warning: {
      main: themeColor.warning,
    },
    error: {
      main: themeColor.error,
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  overrides: {
    MuiToolbar: {
      regular: {
        '@media (min-width: 600px)': {
          minHeight: 56,
        },
      },
    },
    MuiButton: {
      root: {
        padding: '7px 15px',
        border: '1px solid transparent',
        textTransform: 'none',
        color: '#78899D',
        '&:hover': {
          backgroundColor: fade(themeColor.primary, 0.08),
        },
      },
      outlined: {
        padding: '7px 15px',
        borderColor: '#DFE0E4',
        '&$disabled': {
          border: '1px solid rgba(189, 112, 255, 0.4)',
          color: '#606368',
          opacity: 0.35,
        },
      },
      outlinedSizeSmall: {
        padding: '4px 8px',
      },
      text: {
        padding: '8px 12px',
      },
    },
    MuiListItem: {
      button: {
        borderLeft: '4px solid transparent',
        '&.active, &:hover': {
          background: fade(themeColor.primary, 0.1),
        },
      },
      root: {
        '&$selected, &$selected:hover': {
          backgroundColor: fade(themeColor.primary, 0.1),
          borderColor: themeColor.primary,
        },
        '&$selected .MuiListItemIcon-root': {
          color: themeColor.primary,
        },
      },
      gutters: {
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40,
        color: fade('#78899d', 0.5),
      },
    },
    MuiInputBase: {
      root: {
        color: '#919699',
      },
      input: {
        color: '#606368',
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#E1E1E1',
      },
      input: {
        padding: '10.5px 14px',
      },
      adornedStart: {
        paddingLeft: '8px',
      },
      inputAdornedStart: {
        paddingLeft: '6px',
      },
      inputMarginDense: {
        paddingTop: '6.5px',
        paddingBottom: '6.5px',
        fontSize: '.875rem',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#E0E0E0',
      },
    },
    MuiTableCell: {
      root: {
        padding: '22px 16px',
      },
      head: {
        padding: '12px 16px',
        fontSize: '.75rem',
        fontWeight: 600,
      },
      body: {
        '&.MuiTableCell-sizeSmall': {
          padding: '14px 16px',
        },
      },
      sizeSmall: {
        padding: '12px 16px',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow:
          '0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)',
      },
      outlined: {
        borderColor: '#E4E6E7',
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: 56,
      },
    },
    MuiFormLabel: {
      root: {
        color: 'inherit',
      },
    },
    MuiDialogActions: {
      root: {
        padding: 16,
      },
    },
    MuiAutocomplete: {
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: 0
        }
      }
    },
    Selected: {},
  },
});

export default blazeOrange;
