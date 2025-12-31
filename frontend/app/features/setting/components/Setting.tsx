import { useState, type FC } from "react";
import { Tab, type TabItems } from "~/components/tab/Tab";
import { UserSetting } from "./UserSetting";
import { AssetImportSetting } from "./AssetImportSetting";

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

  return (
    <>
      <Tab
        tabItems={settingMenuItems}
        currentValue={value}
        handleChange={handleChange}
      />
      {value === 0 && <UserSetting />}
      {value === 1 && <AssetImportSetting />}
    </>
  );
};
