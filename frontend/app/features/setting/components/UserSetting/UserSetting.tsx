import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TableContainer,
  Typography,
} from "@mui/material";
import { useState } from "react";
import theme from "~/libs/mui/theme";
import { AddUserDialog } from "./AddUserDialog";
import { fetchUsers } from "~/repositories/usersRepository";
import { UsersTable } from "./UsersTable";

export const UserSetting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { users, isLoading } = fetchUsers();

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" component="h2" fontWeight="bold">
          管理ユーザーの一覧
        </Typography>
        <Button variant="contained" size="small" onClick={handleOpen}>
          管理ユーザーを追加
        </Button>
      </Box>
      <Divider
        sx={{
          borderColor: theme.palette.primary.main,
          borderBottomWidth: 2,
          marginTop: theme.spacing(1),
        }}
      />
      <TableContainer sx={{ margin: theme.spacing(3, 1) }}>
        {isLoading ? <CircularProgress /> : <UsersTable users={users} />}
      </TableContainer>
      <AddUserDialog isOpen={isOpen} handleClose={handleClose} />
    </Container>
  );
};
