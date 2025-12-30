import { useCallback, useState } from "react";

export const useSetting = () => {
  // データImportダイアログの管理
  const [isOpenImportDialog, setIsOpenImportDialog] = useState<boolean>(false);
  const handleOpenImportDialog = useCallback(
    () => setIsOpenImportDialog(true),
    [setIsOpenImportDialog]
  );
  const handleCloseImportDialog = useCallback(
    () => setIsOpenImportDialog(false),
    [setIsOpenImportDialog]
  );

  // ユーザー追加ダイアログの管理
  const [isOpenAddUserDialog, setIsOpenAddUserDialog] =
    useState<boolean>(false);
  const handleOpenAddDialog = useCallback(
    () => setIsOpenAddUserDialog(true),
    [setIsOpenAddUserDialog]
  );
  const handleCloseAddUserDialog = useCallback(
    () => setIsOpenAddUserDialog(false),
    [setIsOpenAddUserDialog]
  );

  return {
    isOpenImportDialog,
    handleOpenImportDialog,
    handleCloseImportDialog,
    isOpenAddUserDialog,
    handleOpenAddDialog,
    handleCloseAddUserDialog,
  };
};
