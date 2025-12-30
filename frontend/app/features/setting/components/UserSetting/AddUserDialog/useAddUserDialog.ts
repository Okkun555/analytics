import { useForm } from "react-hook-form";
import type { UserFormValues } from "../../../types";
import { useCallback } from "react";

export const useAddUserDialog = () => {
  const { control, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      birthday: "1990-01-01",
      sex: "man",
    },
  });

  const onSubmit = useCallback((data: UserFormValues) => {
    console.log(data);
  }, []);

  return { fetchOccupations, control, handleSubmit, onSubmit };
};
