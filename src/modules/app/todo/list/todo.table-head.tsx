import TableCell from "@material-ui/core/TableCell";

export default function TodoTableHead() {
  return (
    <>
      <TableCell>ID</TableCell>
      <TableCell>Title</TableCell>
      <TableCell>User</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Action</TableCell>
    </>
  );
}
