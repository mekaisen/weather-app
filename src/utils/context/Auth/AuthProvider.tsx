import { useMemo, useState } from 'react';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode,
  defaultProfile?: {
    email: string
  }
}

const AuthProvider = ({ children, defaultProfile }: AuthProviderProps) => {
  const [user, setUser] = useState<{ email: string }>(defaultProfile!);

  const value = useMemo(() => ({
    user,
    setUser
  }), [user]);

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  );
};
export default AuthProvider;
