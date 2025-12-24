import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Typography,
  type Theme,
} from "@mui/material";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useState, type FC } from "react";
import theme from "~/libs/mui/theme";

type ImportDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const ImportDialog: FC<ImportDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (newFile: File) => setFile(newFile);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
      <DialogTitle>マスターデータのインポート</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box>
            <Typography component="p">
              csvを利用して、資産マスターをインポートできます。csvファイルの形式は以下の通りです。
            </Typography>
          </Box>
          <ExampleTableBox theme={theme}>
            <DataGrid
              columns={columns}
              rows={rows}
              showColumnVerticalBorder
              showCellVerticalBorder
              hideFooter
            />
          </ExampleTableBox>
          <FormBox theme={theme}>
            <Input type="file" onChange={(e) => console.log(e)} />
            <ExecutionButtonBox theme={theme}>
              <Button variant="contained">実行</Button>
            </ExecutionButtonBox>
          </FormBox>
        </DialogContentText>
        <DialogActions>
          <Box>
            <Button onClick={handleClose}>閉じる</Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const ExampleTableBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(2, 0),
}));

const FormBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(1, 0),
}));

const ExecutionButtonBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(2, 0),
}));

const columns: GridColDef[] = [
  { field: "date", headerName: "日付" },
  {
    field: "amount",
    headerName: "合計（円）",
    flex: 1,
  },
  {
    field: "cash",
    headerName: "預金・現金・暗号資産（円）",
    width: 250,
  },
  {
    field: "investmentTrust",
    headerName: "投資信託（円）",
    width: 130,
  },
  {
    field: "pension",
    headerName: "年金（円）",
    flex: 1,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    date: "2025/12/14",
    amount: 100000,
    cash: 700000,
    investmentTrust: 200000,
    pension: 100000,
  },
  {
    id: 2,
    date: "2025/12/13",
    amount: 100000,
    cash: 700000,
    investmentTrust: 200000,
    pension: 100000,
  },
];
