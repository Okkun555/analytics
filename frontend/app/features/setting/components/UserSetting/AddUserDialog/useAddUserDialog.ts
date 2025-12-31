import { useForm } from "react-hook-form";
import type { UserFormValues } from "../../../../../types";

export const useAddUserDialog = () => {
  const { control, handleSubmit, reset } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      birthday: "1990-01-01",
      sex: "man",
      occupationId: null,
    },
  });

  return { control, handleSubmit, reset };
};
