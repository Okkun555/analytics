import React, { type FC } from "react";

import { Tabs, Tab as MuiTab } from "@mui/material";
import theme from "~/libs/mui/theme";

export type TabItems = Array<{
  label: string;
  value: number;
}>;

type TabProps = {
  tabItems: TabItems;
  currentValue: number;
  handleChange: (e: React.SyntheticEvent, newValue: number) => void;
};

export const Tab: FC<TabProps> = ({ tabItems, currentValue, handleChange }) => (
  <Tabs
    value={currentValue}
    onChange={handleChange}
    indicatorColor="primary"
    sx={{
      color: theme.palette.secondary.contrastText,
      "&.Mui-selected": { color: theme.palette.secondary.contrastText },
      margin: theme.spacing(2, 0),
    }}
  >
    {tabItems.map((item) => (
      <MuiTab label={item.label} />
    ))}
  </Tabs>
);
