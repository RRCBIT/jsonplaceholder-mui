import Dashboard from "pages/app/dashboard";
import { UserList } from "pages/app/user";
import { PostList } from "pages/app/post";
import { CommentList } from "pages/app/comment";
import { AlbumList } from "pages/app/album";
import { TodoList } from "pages/app/todo";

import { RouteModel } from "types";

import {
  PATH_DASHBOARD,
  PATH_ALBUM,
  PATH_COMMENT,
  PATH_POST,
  PATH_TODOS,
  PATH_USER
} from "./routes.paths";

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: PATH_DASHBOARD,
    component: Dashboard
  },
  {
    exact: true,
    path: PATH_ALBUM,
    component: AlbumList
  },
  {
    exact: true,
    path: PATH_COMMENT,
    component: CommentList
  },
  {
    exact: true,
    path: PATH_POST,
    component: PostList
  },
  {
    exact: true,
    path: PATH_USER,
    component: UserList
  },
  {
    exact: true,
    path: PATH_TODOS,
    component: TodoList
  }
];
