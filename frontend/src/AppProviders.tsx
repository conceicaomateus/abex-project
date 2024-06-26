import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip';
import { AuthProvider } from './contexts/AuthContext';
import { combineProviders } from './helpers/combine-providers';

const queryClient = new QueryClient();

export const AppProviders = combineProviders([
  [QueryClientProvider, { client: queryClient }],
  [TooltipProvider],
  [AuthProvider],
]);
