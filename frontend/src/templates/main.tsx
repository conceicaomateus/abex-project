import { Home, Package2, PanelsTopLeft, Settings, Users } from 'lucide-react';

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { NavItem } from './components/nav-item';

export function MainTemplate() {
  const [highlight, setHighlight] = useState('Dashboard');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <NavItem href="/" icon={Home} name="Dashboard" onClick={setHighlight} highlight={highlight} />
          <NavItem href="/projects" icon={PanelsTopLeft} name="Projects" onClick={setHighlight} highlight={highlight} />
          <NavItem href="/users" icon={Users} name="Users" onClick={setHighlight} highlight={highlight} />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <NavItem href="/settings" icon={Settings} name="Settings" onClick={setHighlight} highlight={highlight} />
        </nav>
      </aside>

      {/* Content */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Outlet />
      </div>
    </div>
  );
}
