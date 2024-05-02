import { Toaster } from '@/components/ui/toaster';
import { combineComponents } from './helpers/combine-components';

export const AppMiddlewares = () => <>{combineComponents([Toaster])}</>;
