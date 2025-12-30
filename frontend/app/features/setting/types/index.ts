export type SexType = "man" | "woman";

export type UserFormValues = {
  name: string;
  birthday: string;
  sex: SexType;
  occupationId: number;
};
