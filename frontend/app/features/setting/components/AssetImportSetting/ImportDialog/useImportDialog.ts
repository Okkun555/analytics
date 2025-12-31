import { useForm } from "react-hook-form";
import type { ImportFormValues } from "~/types";

export const useImportDialog = () => {
  const { control, handleSubmit, reset } = useForm<ImportFormValues>({
    defaultValues: {
      userId: null,
      file: null,
    },
  });

  return { control, handleSubmit, reset };
};
