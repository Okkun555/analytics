import { Box, Button, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { ImportDialog } from "./ImportDialog";

export const Master: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  return (
    <>
      <Typography variant="h5" component="h2">
        マスター管理
      </Typography>
      <Box>
        <Button variant="contained" onClick={handleOpenDialog}>
          データをImport
        </Button>
      </Box>
      <ImportDialog isOpen={isOpen} handleClose={handleCloseDialog} />
    </>
  );
};
