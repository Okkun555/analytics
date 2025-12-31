import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
  type Theme,
} from "@mui/material";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import type { ImportFormValues, User } from "~/types";
import theme from "~/libs/mui/theme";
import { useImportDialog } from "./useImportDialog";
import type React from "react";

type ImportDialogProps = {
  users: User[];
  isOpen: boolean;
  handleClose: () => void;
};

export const ImportDialog: FC<ImportDialogProps> = ({
  users,
  isOpen,
  handleClose,
}) => {
  const { control, handleSubmit, reset } = useImportDialog();

  const onSubmit = async (data: ImportFormValues) => {
    console.log(data);
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{ sx: { width: "90vw", maxWidth: "1400px" } }}
    >
      <DialogTitle>資産データのインポート</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography component="p">
            CSVファイルを利用して、資産データを登録できます。ファイルの形式は以下の通りです。
          </Typography>
        </DialogContentText>

        <CsvExampleTableBox theme={theme}>
          <DataGrid
            columns={columns}
            rows={rows}
            showColumnVerticalBorder
            showCellVerticalBorder
            hideFooter
            disableColumnSorting
            disableColumnMenu
          />
        </CsvExampleTableBox>

        <Divider
          sx={{
            borderBottomWidth: 2,
            marginTop: theme.spacing(2),
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ marginTop: theme.spacing(2) }}>
            <Typography component="p" fontWeight="bold">
              1.対象の管理ユーザーを選択してください
            </Typography>

            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field} id="user-id" sx={{ width: "30%" }}>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Typography component="p" fontWeight="bold">
              2.CSVファイルを選択してください
            </Typography>

            <Controller
              name="file"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <TextField
                  type="file"
                  inputRef={field.ref}
                  onChange={(e) =>
                    field.onChange(
                      (e.target as HTMLInputElement).files?.[0] ?? null
                    )
                  }
                />
              )}
            />
            <Button type="submit" variant="contained" fullWidth>
              インポートする
            </Button>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CsvExampleTableBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(2, 0),
}));

const columns: GridColDef[] = [
  { field: "date", headerName: "日付", flex: 1 },
  {
    field: "amount",
    headerName: "合計（円）",
    flex: 1,
  },
  {
    field: "cash",
    headerName: "預金・現金・暗号資産（円）",
    flex: 2,
  },
  {
    field: "investmentTrust",
    headerName: "投資信託（円）",
    flex: 1,
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
