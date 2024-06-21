import { TooltipProvider } from './components/ui/tooltip';
import { AuthProvider } from './contexts/AuthContext';
import { combineProviders } from './helpers/combine-providers';

export const AppProviders = combineProviders([[TooltipProvider], [AuthProvider]]);
