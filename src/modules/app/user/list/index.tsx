import { useState, useEffect, useCallback } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "store";
import { PATH_USER_CREATE } from "routes/routes.paths";
import { IUser } from "types";
import { getUserList, deleteUser } from "store/users.slice";
import { Table, ActionButton, DeleteModal, Paper } from "components";
import UserTableHead from "./user.table-head";
import { useStyles } from "./user-list.styles";

export default function List() {
  const [selectedUser, setSelectedUser] = useState<IUser>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { filter } = useStyles();
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state: RootState) => state.users);
  const getData = useCallback(() => {
    dispatch(getUserList());
  }, [dispatch]);
  useEffect(() => {
    getData();
  }, [getData]);

  function handleClickDelete(item: IUser) {
    setSelectedUser(item);
    setIsOpen(true);
  }
  function handleClickCancel() {
    setIsOpen(false);
  }
  function handleClickConfirm() {
    dispatch(deleteUser(selectedUser.id));
    setIsOpen(false);
  }

  function renderRows(item: IUser) {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.username}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.phone}</TableCell>
        <TableCell>
          <Link to={`/app/user/detail/${item.id}`}>
            <ActionButton actionType="view" />
          </Link>
          <Link to={`/app/user/edit/${item.id}`}>
            <ActionButton actionType="edit" />
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
        <Grid container justifyContent="flex-end">
          <Link to={PATH_USER_CREATE}>
            <Button variant="contained" disableElevation color="primary">
              Create new user
            </Button>
          </Link>
        </Grid>
      </Paper>
      <Table
        loading={loading}
        data={userList}
        head={<UserTableHead />}
        colSpan={6}
        renderRows={renderRows}
      />
      <DeleteModal
        open={isOpen}
        item="user"
        onClose={handleClickCancel}
        onConfirm={handleClickConfirm}
      />
    </>
  );
}
