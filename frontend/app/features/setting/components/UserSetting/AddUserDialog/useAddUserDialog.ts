import { useForm } from "react-hook-form";
import type { UserFormValues } from "../../../types";
import { useCallback } from "react";
import { postUsers } from "~/repositories/usersRepository";

export const useAddUserDialog = () => {
  const { control, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      birthday: "1990-01-01",
      sex: "man",
      occupationId: null,
    },
  });

  const { trigger } = postUsers();
  const onSubmit = useCallback(async (data: UserFormValues) => {
    await trigger({
      user: { ...data },
    });
  }, []);

  return { control, handleSubmit, onSubmit };
};
