/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage, setStorage } from '@/infra/cache/local-storage-adapter';
import { jwtDecode } from 'jwt-decode';
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContext {
  login: (token: string) => void;
  logout: () => void;
  redirectToLogin: () => void;
  status: 'Authorized' | 'Unauthorized' | 'Authorizing';
  user: { role: number };
}

const authContext = createContext({} as AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<'Authorized' | 'Unauthorized' | 'Authorizing'>('Authorizing');
  const [user, setUser] = useState<{ role: number }>({} as any);
  const navigate = useNavigate();
  const tokenKey = 'token';

  const handleAuthorizationByLocalStorageToken = useCallback(() => {
    const token = getStorage.get(tokenKey) as string;

    if (token) {
      const decoded = jwtDecode<{ role: number }>(token);
      setUser({ role: decoded.role });
      setStatus('Authorized');
    } else {
      setStatus('Unauthorized');
    }
  }, []);

  useEffect(() => {
    handleAuthorizationByLocalStorageToken();
  }, [handleAuthorizationByLocalStorageToken]);

  const redirectToLogin = () => {
    setUser({} as any);
    setStatus('Unauthorized');
    navigate('login');
  };

  const login = (token: string) => {
    if (token) {
      const decoded = jwtDecode<{ role: number }>(token);
      setUser({ role: decoded.role });
      setStorage.set(tokenKey, token);
      navigate('/projetos');
      setStatus('Authorized');
    }
  };

  const logout = () => {
    setUser({} as any);
    setStorage.set(tokenKey);
    redirectToLogin();
  };

  return (
    <authContext.Provider value={{ status, login, logout, redirectToLogin, user }}>{children}</authContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(authContext);
  if (!context) throw new Error('Contexto não encontrado');

  return context;
}

export function AuthGuard({ fallback, entry }: { fallback: JSX.Element; entry: JSX.Element }) {
  const { status } = useAuthContext();

  if (status === 'Authorizing') return <div>Authorizing...</div>;

  if (status === 'Unauthorized') return fallback;

  return entry;
}

export function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);

  return null;
}
