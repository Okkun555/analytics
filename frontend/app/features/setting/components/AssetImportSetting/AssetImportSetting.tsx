import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useState } from "react";
import theme from "~/libs/mui/theme";
import { ImportDialog } from "./ImportDialog";
import { fetchUsers } from "~/repositories/usersRepository";

export const AssetImportSetting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { users } = fetchUsers();

  return (
    <>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="h2" fontWeight="bold">
            資産データ一覧
          </Typography>
          <Button variant="contained" size="small" onClick={handleOpen}>
            資産データのインポート
          </Button>
        </Box>
        <Divider
          sx={{
            borderColor: theme.palette.primary.main,
            borderBottomWidth: 2,
            marginTop: theme.spacing(1),
          }}
        />
      </Container>
      <ImportDialog users={users} isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};
