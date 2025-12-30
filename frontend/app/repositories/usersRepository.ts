import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { postRequest } from "~/libs/api/fetcher";
import path from "~/libs/api/path";

export const postUsers = () => {
  const { trigger, isMutating } = useSWRMutation(path.users.add, postRequest, {
    onSuccess: () => {
      console.log("成功");
      // mutate(path);
    },
  });

  return { trigger, isMutating };
};
