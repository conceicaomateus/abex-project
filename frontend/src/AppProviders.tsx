import { combineProviders } from './helpers/combine-providers';
import { TooltipProvider } from './components/ui/tooltip';

export const AppProviders = combineProviders([[TooltipProvider]]);
