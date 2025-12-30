import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useAddUserDialog } from "./useAddUserDialog";
import { Controller } from "react-hook-form";
import { fetchOccupations } from "~/repositories/occupationsRepository";
import type { UserFormValues } from "~/features/setting/types";
import { postUsers } from "~/repositories/usersRepository";

type AddUserDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AddUserDialog: FC<AddUserDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const { occupations, isLoading } = fetchOccupations();
  const { control, handleSubmit, reset } = useAddUserDialog();

  const { trigger } = postUsers();
  const onSubmit = async (data: UserFormValues) => {
    await trigger({
      user: { ...data },
    });
    reset();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
      <DialogTitle>ユーザーの追加</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography component="p">
            資産を管理するユーザーを追加できます。
            <br />
            ユーザー毎に資産推移を確認したり、全ユーザーの総資産を管理することも可能です。
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    variant="outlined"
                    label="管理ユーザー名"
                  />
                )}
              />

              <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    fullWidth
                    variant="outlined"
                    label="生年月日"
                  />
                )}
              />

              <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="sex-label">性別</InputLabel>
                    <Select {...field} id="sex">
                      <MenuItem value="man">男性</MenuItem>
                      <MenuItem value="woman">女性</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="occupationId"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="occupation-id-label">職種</InputLabel>
                    <Select
                      {...field}
                      id="occupation"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        field.onChange(val === "" ? null : Number(val));
                      }}
                    >
                      {occupations?.map((occupation) => (
                        <MenuItem value={occupation.id} key={occupation.id}>
                          {occupation.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

              <Button type="submit" variant="contained" fullWidth>
                追加する
              </Button>
            </Stack>
          </form>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
