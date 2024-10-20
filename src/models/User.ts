export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  onwerCarIds?: string[];
}

export const mockUser: User[] = [
  {
    id: "1",
    name: "Marek",
    email: "cwioro200@wp.pl",
    password: "1234",
    onwerCarIds: ["1", "2"],
  },
];
