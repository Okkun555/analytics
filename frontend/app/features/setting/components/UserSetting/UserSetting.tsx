import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useState } from "react";
import theme from "~/libs/mui/theme";
import { AddUserDialog } from "./AddUserDialog";

export const UserSetting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" component="h2">
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

      <AddUserDialog isOpen={isOpen} handleClose={handleClose} />
    </Container>
  );
};
