import { useEffect, useCallback } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store";
import { IUser } from "types/user.model";
import { getUserList } from "store/users.slice";
import { Table } from "components";

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
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.username}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.phone}</TableCell>
      </TableRow>
    );
  }

  return (
    <Table
      loading={loading}
      data={userList}
      head={<></>}
      colSpan={6}
      renderRows={renderRows}
    />
  );
}
