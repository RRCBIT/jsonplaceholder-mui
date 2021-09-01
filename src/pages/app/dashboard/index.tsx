import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";

import { DashboardCard } from "modules/app/dashboard";
import {
  PATH_USER,
  PATH_POST,
  PATH_TODOS,
  PATH_ALBUM
} from "routes/routes.paths";
import { getAlbumList } from "store/albums.slice";
import { getTodoList } from "store/todos.slice";
import { getPostList } from "store/posts.slices";
import { getUserList } from "store/users.slice";
import { RootState } from "store";

export default function Dashboard() {
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums);
  const todos = useSelector((state: RootState) => state.todos);
  const posts = useSelector((state: RootState) => state.posts);
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getAlbumList());
    dispatch(getTodoList());
    dispatch(getPostList());
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item lg={3} md={3}>
        <DashboardCard
          loading={albums.loading}
          title="User"
          number={users.userList.length}
          link={PATH_USER}
        />
      </Grid>
      <Grid item lg={3} md={3}>
        <DashboardCard
          loading={posts.loading}
          title="Post"
          number={posts.postList.length}
          link={PATH_POST}
        />
      </Grid>
      <Grid item lg={3} md={3}>
        <DashboardCard
          loading={todos.loading}
          title="Todos"
          number={todos.todoList.length}
          link={PATH_TODOS}
        />
      </Grid>
      <Grid item lg={3} md={3}>
        <DashboardCard
          loading={albums.loading}
          title="Album"
          number={albums.albumList.length}
          link={PATH_ALBUM}
        />
      </Grid>
    </Grid>
  );
}
