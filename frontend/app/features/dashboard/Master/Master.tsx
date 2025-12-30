import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  type Theme,
} from "@mui/material";
import { ImportDialog } from "./ImportDialog";
import { useMaster } from "./useMaster";

import type { FC } from "react";
import styled from "@emotion/styled";
import theme from "~/libs/mui/theme";

export const Master: FC = () => {
  const {
    isOpenImportDialog,
    handleOpenImportDialog,
    handleCloseImportDialog,
    isOpenAddUserDialog,
    handleOpenAddDialog,
    handleCloseAddUserDialog,
  } = useMaster();

  return (
    <>
      <Typography variant="h5" component="h2">
        アプリケーション設定
      </Typography>
      <ContentContainer theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleOpenAddDialog}
              fullWidth
              size="large"
            >
              管理対象を追加する
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleOpenImportDialog}
              fullWidth
              size="large"
            >
              データを登録する
            </Button>
          </Grid>
        </Grid>
      </ContentContainer>

      <ImportDialog
        isOpen={isOpenImportDialog}
        handleClose={handleCloseImportDialog}
      />
    </>
  );
};

const ContentContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(3, 0),
}));
