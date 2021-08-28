import { ReactNode, MouseEvent, ChangeEvent, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import MuiTable, { TableProps as MuiTableProps } from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { pageSizeOptions } from "./table.constants";
import { useStyles } from "./table.styles";

interface TableProps extends MuiTableProps {
  loading?: boolean;
  head: ReactNode;
  colSpan: number;
  data: any[];
  renderRows: Function;
}

export default function Table({
  loading,
  head,
  data,
  colSpan,
  renderRows
}: TableProps) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const { paginationGrid } = useStyles();

  function handleChangePage(
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }
  function handleChangePageSize(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPageSize(Number(event.target.value));
    setPage(0);
  }

  const indexOfLastItem = (page + 1) * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentDataList = data.slice(indexOfFirstItem, indexOfLastItem);

  function renderTableBody() {
    if (loading) {
      return (
        <TableRow>
          <TableCell
            align="center"
            style={{ border: "none" }}
            colSpan={colSpan}
          >
            <CircularProgress size="small" />
          </TableCell>
        </TableRow>
      );
    }
    if (data?.length === 0 || !data) {
      return (
        <TableRow>
          <TableCell
            align="center"
            style={{ border: "none" }}
            colSpan={colSpan}
          >
            <Typography variant="body1">No data</Typography>
          </TableCell>
        </TableRow>
      );
    }
    return currentDataList.map((item) => renderRows(item));
  }

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </MuiTable>
      <Grid className={paginationGrid} container justifyContent="flex-end">
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPageOptions={pageSizeOptions}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePageSize}
        />
      </Grid>
    </TableContainer>
  );
}

Table.defaultProps = {
  loading: false
};
