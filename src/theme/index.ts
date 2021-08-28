import { createTheme, Theme, ThemeOptions } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";

interface IPalette extends Palette {
  danger: PaletteColor;
  success: PaletteColor;
}
export interface ITheme extends Theme {
  palette: IPalette;
}
interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    danger: {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    success: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 500
      }
    }
  }
} as IThemeOptions);
