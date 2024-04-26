/* eslint-disable import/named */
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  href: string;
  name: string;
  icon: LucideIcon;
  highlight?: string;
  onClick?: (_name: string) => void;
};

export function NavItem({ href, icon: Icon, name, highlight, onClick }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={
            'flex h-9 w-9 items-center justify-center  rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8' +
            (highlight === name ? ' bg-accent' : '')
          }
          onClick={() => onClick?.(name)}
        >
          {Icon && <Icon className="h-5 w-5" />}
          <span className="sr-only">{name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{name}</TooltipContent>
    </Tooltip>
  );
}
