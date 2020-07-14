import { createContext } from 'react';

interface UserInterface {
  email: string
}

interface UserContextInterface {
  loading: boolean,
  user: UserInterface | null;
  startSignIn: () => void;
  successSignIn: (user: UserInterface, authorization: string) => void;
  failSignIn: () => void;
  signOut: () => void;
}

export const UserContext = createContext({} as UserContextInterface);
