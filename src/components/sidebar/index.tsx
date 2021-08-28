import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { NavLink } from "react-router-dom";

import { useStyles } from "./sidebar.styles";
import { sidebarItems } from "./sidebar.constants";

export default function Sidebar() {
  const { active, sidebar, brand, menuList, menuItem } = useStyles();

  function renderSidebarItems(items: typeof sidebarItems) {
    return items.map((item) => (
      <MenuItem className={menuItem} disableGutters key={item.to}>
        <NavLink activeClassName={active} to={item.to}>
          {item.icon} {item.name}
        </NavLink>
      </MenuItem>
    ));
  }

  return (
    <Grid className={sidebar} item container direction="column">
      <Grid
        className={brand}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">JSONPLACEHOLDER</Typography>
      </Grid>
      <MenuList className={menuList}>
        {renderSidebarItems(sidebarItems)}
      </MenuList>
    </Grid>
  );
}
