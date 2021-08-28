import { useEffect, useCallback } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store";
import { IUser } from "types/user.model";
import { getUserList } from "store/users.slice";
import { Table, ActionButton } from "components";
import UserTableHead from "./user.table-head";

export default function List() {
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state: RootState) => state.users);
  const getData = useCallback(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  function renderRows(item: IUser) {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.username}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.phone}</TableCell>
        <TableCell>
          <ActionButton actionType="view" />
          <ActionButton actionType="edit" />
          <ActionButton actionType="delete" />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table
      loading={loading}
      data={userList}
      head={<UserTableHead />}
      colSpan={5}
      renderRows={renderRows}
    />
  );
}
