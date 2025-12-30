import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import type { User } from "~/features/setting/types";

import { fetcher, postRequest } from "~/libs/api/fetcher";
import path from "~/libs/api/path";

export const fetchUsers = () => {
  const { data, isLoading } = useSWR<Array<User>>(path.users.fetch, fetcher);

  return { users: data ?? [], isLoading };
};

export const postUsers = () => {
  const { trigger, isMutating } = useSWRMutation(path.users.add, postRequest, {
    onSuccess: () => {
      mutate(path.users.fetch);
    },
  });

  return { trigger, isMutating };
};
