import useSWRMutation from "swr/mutation";
import { postRequestWithFile } from "~/libs/api/fetcher";
import path from "~/libs/api/path";

export const postAssetBalancesBulkImport = () => {
  const { trigger, isMutating } = useSWRMutation(
    path.assetBalances.bulkImport,
    postRequestWithFile
  );

  return { trigger, isMutating };
};
