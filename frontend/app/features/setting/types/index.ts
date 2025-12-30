export type SexType = "man" | "woman";

export type UserFormValues = {
  name: string;
  birthday: string;
  sex: SexType;
  occupationId: number | null;
};

export type Occupation = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  age: number;
  sex: SexType;
  occupation: Occupation["name"];
};
