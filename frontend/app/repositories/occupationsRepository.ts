import useSWR from "swr";
import type { Occupation } from "~/features/setting/types";
import { fetcher } from "~/libs/api/fetcher";
import path from "~/libs/api/path";

export const fetchOccupations = () => {
  const { data, isLoading } = useSWR<Array<Occupation>>(
    path.occupations.fetch,
    fetcher
  );
  return {
    occupations: data ?? [],
    isLoading,
  };
};
