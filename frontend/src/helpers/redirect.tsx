import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;

    if (path === '/') navigate('/projetos');
  }, []);

  return null;
}
