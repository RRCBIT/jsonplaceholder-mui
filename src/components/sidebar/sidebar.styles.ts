import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    sidebar: {
      height: "100vh",
      position: "fixed",
      width: "15rem",
      backgroundColor: theme.palette.primary.main
    },
    brand: {
      height: "5rem",
      "& h6": {
        color: "#fff"
      }
    },
    menuList: {
      width: "100%",
      padding: 0
    },
    menuItem: {
      padding: 0,
      "& a": {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: theme.spacing(2),
        color: "#fff",
        "& svg": {
          marginRight: theme.spacing(1)
        }
      }
    },
    active: {
      backgroundColor: theme.palette.primary.dark
    }
  })
);
