import { useEffect, useCallback, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

import { RootState } from "store";
import { getUserList } from "store/users.slice";
import { getPostList, deletePost } from "store/posts.slices";
import { Paper, Table, ActionButton, DeleteModal } from "components";
import { IUser } from "types/user.model";
import { IPost } from "types/post.model";
import { useStyles } from "./post-list.styles";
import PostTableHead from "./post.table-head";

export default function PostList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost>({
    id: 0,
    userId: 0,
    title: "",
    body: ""
  });
  const { filter, form } = useStyles();
  const dispatch = useDispatch();
  const { userList } = useSelector((state: RootState) => state.users);
  const { loading, postList } = useSelector((state: RootState) => state.posts);

  const getData = useCallback(() => {
    dispatch(getUserList());
    dispatch(getPostList(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  function handleChangeUserId(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setUserId(Number(event.target.value));
  }
  function handleClearFilter() {
    setUserId(null);
  }
  function handleClickCancel() {
    setIsOpen(false);
  }
  function handleClickConfirm() {
    dispatch(deletePost(selectedPost.id));
    setIsOpen(false);
  }
  function handleClickDelete(item: IPost) {
    setSelectedPost(item);
    setIsOpen(true);
  }
  function getUserName(id: number) {
    const user = userList.find((item) => item.id === id);
    if (user) {
      return user.name;
    }
    return "";
  }
  function renderRows(item: IPost) {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>
          <Link to={`/app/user/detail/${item.userId}`}>
            {getUserName(item.userId)}
          </Link>
        </TableCell>
        <TableCell>
          <Link to={`/app/post/detail/${item.id}`}>
            <ActionButton actionType="view" />
          </Link>
          <ActionButton
            actionType="delete"
            onClick={() => handleClickDelete(item)}
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Paper className={filter}>
        <Grid container justifyContent="flex-start">
          <form className={form}>
            <TextField
              select
              size="small"
              variant="outlined"
              label="User"
              InputLabelProps={{ shrink: true }}
              value={userId}
              onChange={handleChangeUserId}
            >
              {userList.map((user: IUser) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="default"
              disableElevation
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          </form>
        </Grid>
      </Paper>
      <Table
        loading={loading}
        head={<PostTableHead />}
        colSpan={4}
        data={postList}
        renderRows={renderRows}
      />
      <DeleteModal
        open={isOpen}
        item="post"
        onClose={handleClickCancel}
        onConfirm={handleClickConfirm}
      />
    </>
  );
}
