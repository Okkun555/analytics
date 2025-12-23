import React, { useState } from "react";
import { Tab, type TabItems } from "~/components/tab/Tab";
import { Master } from "./Master";
import { Container, type Theme } from "@mui/material";
import styled from "@emotion/styled";
import theme from "~/libs/mui/theme";

const dashboardMenuItems: TabItems = [
  { label: "総資産", value: 0 },
  { label: "マスター管理", value: 1 },
];

export const Dashboard = () => {
  const [value, setValue] = useState<TabItems[number]["value"]>(0);

  const handleChange = (
    _e: React.SyntheticEvent,
    newValue: TabItems[number]["value"]
  ) => setValue(newValue);

  return (
    <>
      <Tab
        tabItems={dashboardMenuItems}
        currentValue={value}
        handleChange={handleChange}
      />
      <ContentContainer theme={theme}>
        {value === 1 && <Master />}
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
}));
