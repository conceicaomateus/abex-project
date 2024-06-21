import { getStorage, setStorage } from '@/infra/cache/local-storage-adapter';
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContext {
  login: (token: string) => void;
  logout: () => void;
  redirectToLogin: () => void;
  status: 'Authorized' | 'Unauthorized' | 'Authorizing';
}

const authContext = createContext({} as AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const tokenKey = 'token';

  const [status, setStatus] = useState<'Authorized' | 'Unauthorized' | 'Authorizing'>('Authorizing');

  console.log(status);

  const handleAuthorizationByLocalStorageToken = useCallback(() => {
    const token = getStorage.get(tokenKey);

    if (token) {
      setStatus('Authorized');
    } else {
      setStatus('Unauthorized');
    }
  }, []);

  useEffect(() => {
    handleAuthorizationByLocalStorageToken();
  }, [handleAuthorizationByLocalStorageToken]);

  const redirectToLogin = () => {
    setStatus('Unauthorized');
    navigate('login');
  };

  const login = (token: string) => {
    if (token) {
      //const { IsAdmin }: DecodeToken = decode(token);

      //setStorage.set('IsAdmin', IsAdmin);

      setStorage.set(tokenKey, token);
      navigate('/');
      setStatus('Authorized');
    }
  };

  const logout = () => {
    setStorage.set(tokenKey);
    redirectToLogin();
  };

  return <authContext.Provider value={{ status, login, logout, redirectToLogin }}>{children}</authContext.Provider>;
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
