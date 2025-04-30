import { createContext } from 'react';

export interface AuthContextProps {
  setUser: (user: { email: string }) => void
  user: {
    email: string
  },
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined!,
  setUser: () => {}
});
