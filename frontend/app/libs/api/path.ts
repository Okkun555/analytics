const path = {
  occupations: {
    fetch: "/occupations",
  },
  // 管理ユーザー
  users: {
    fetch: "/users",
    add: "/users",
  },
  // 資産
  assetBalances: {
    bulkImport: "/asset_balances/bulk_create",
  },
};

export default path;
