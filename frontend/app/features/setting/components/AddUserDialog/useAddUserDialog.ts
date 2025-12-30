import { useForm } from "react-hook-form";
import type { UserFormValues } from "../../types";

export const useAddUserDialog = () => {
  const { control, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      birthday: "",
      sex: "man",
    },
  });

  return { control, handleSubmit };
};
