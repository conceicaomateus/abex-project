import { useAuthContext } from '@/contexts/AuthContext';
import { Role } from '@/types/role';
import { LogOut, PanelsTopLeft, UserCog, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavItem } from './components/nav-item';

export function MainTemplate() {
  const { logout, user } = useAuthContext();
  const [highlight, setHighlight] = useState('Dashboard');

  useEffect(() => {
    const url = window.location.pathname;
    const path = url.split('/')[1];

    setHighlight(path === '' ? 'dashboard' : path);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <NavItem href="/projetos" icon={PanelsTopLeft} name="Projetos" onClick={setHighlight} highlight={highlight} />
          {user.role === Role.Admin && (
            <>
              <NavItem href="/estudantes" icon={Users} name="Estudantes" onClick={setHighlight} highlight={highlight} />
              <NavItem
                href="/gerente-projetos"
                icon={UserCog}
                name="Gerente de Projetos"
                onClick={setHighlight}
                highlight={highlight}
              />
            </>
          )}
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <LogOut
            className="w-full h-5 text-muted-foreground transition-colors hover:text-foreground"
            onClick={logout}
          />
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Outlet />
      </div>
    </div>
  );
}
