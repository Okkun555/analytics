import { useState, type FC } from "react";
import { useSetting } from "./useSetting";
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Typography,
  type Theme,
} from "@mui/material";
import styled from "@emotion/styled";
import theme from "~/libs/mui/theme";
import SettingsIcon from "@mui/icons-material/Settings";
import { AddUserDialog } from "./UserSetting/AddUserDialog";
import { Tab, type TabItems } from "~/components/tab/Tab";
import { UserSetting } from "./UserSetting";

export const Setting: FC = () => {
  const settingMenuItems: TabItems = [
    { label: "ユーザー管理", value: 0 },
    { label: "資産データ", value: 1 },
  ];

  const [value, setValue] = useState<TabItems[number]["value"]>(0);

  const handleChange = (
    _e: React.SyntheticEvent,
    newValue: TabItems[number]["value"]
  ) => setValue(newValue);

  const {
    isOpenImportDialog,
    handleOpenImportDialog,
    handleCloseImportDialog,
    isOpenAddUserDialog,
    handleOpenAddDialog,
    handleCloseAddUserDialog,
  } = useSetting();

  return (
    <>
      <Tab
        tabItems={settingMenuItems}
        currentValue={value}
        handleChange={handleChange}
      />
      {value === 0 && <UserSetting />}
      {/* <ContentContainer theme={theme}>
        <Box sx={{ display: "flex", alignContent: "flex-end" }}>
          <Icon>
            <SettingsIcon />
          </Icon>
          <Typography variant="h5" component="h2" fontWeight="bold">
            アプリケーション設定
          </Typography>
        </Box>
        <SettingContentBox theme={theme}>
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
        </SettingContentBox>
      </ContentContainer>

      <AddUserDialog
        isOpen={isOpenAddUserDialog}
        handleClose={handleCloseAddUserDialog}
      /> */}
    </>
  );
};

const ContentContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(4),
}));

const SettingContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(3, 0),
}));
