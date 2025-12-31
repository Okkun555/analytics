import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import type { FC } from "react";
import type { User } from "~/types";

type UsersTableProps = {
  users: Array<User>;
};

export const UsersTable: FC<UsersTableProps> = ({ users }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>ユーザー名</StyledTableCell>
          <StyledTableCell>年齢</StyledTableCell>
          <StyledTableCell>性別</StyledTableCell>
          <StyledTableCell>職種</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.sex === "man" ? "男性" : "女性"}</TableCell>
            <TableCell>{user.occupation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
