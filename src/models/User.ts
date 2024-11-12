export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const mockUser: User[] = [
  {
    id: "1",
    name: "Marek",
    email: "cwioro200@wp.pl",
    password: "1234",
  },
];
