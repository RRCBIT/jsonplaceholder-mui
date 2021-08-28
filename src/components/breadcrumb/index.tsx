import { useLocation } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { ITheme } from "theme";
import { RootState } from "store";

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main
    },
    typography: {
      textTransform: "capitalize"
    }
  })
);

export default function Breadcrumb() {
  const location = useLocation();
  let path = location.pathname;
  path = path.replace(/\/$/, "");
  const splitPath = path.split("/");

  const { root, typography } = useStyles();
  const { params } = useSelector((state: RootState) => state.routerParams);

  const filteredSplitPath = splitPath.filter(
    (item) => item && item !== params && item !== "app"
  );

  return (
    <Breadcrumbs aria-label="breadcrumb" className={root}>
      {filteredSplitPath.map((breadcrumb) => {
        const pageName = breadcrumb.replace(/[-]+/g, " ");

        return (
          <Typography className={typography} variant="body1" key={breadcrumb}>
            <Box fontWeight={500}>{pageName}</Box>
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}
