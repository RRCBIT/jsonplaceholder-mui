import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import { MenuItemModel } from "types";
import {
  PATH_DASHBOARD,
  PATH_ALBUM,
  PATH_POST,
  PATH_TODOS,
  PATH_USER
} from "routes/routes.paths";

export const sidebarItems: MenuItemModel[] = [
  {
    name: "Dashboard",
    to: PATH_DASHBOARD,
    icon: <DashboardIcon />
  },
  {
    name: "User",
    to: PATH_USER,
    icon: <PersonIcon />
  },
  {
    name: "Post",
    to: PATH_POST,
    icon: <InsertDriveFileIcon />
  },
  {
    name: "Album",
    to: PATH_ALBUM,
    icon: <PhotoAlbumIcon />
  },
  {
    name: "Todos",
    to: PATH_TODOS,
    icon: <AssignmentTurnedInIcon />
  }
];
