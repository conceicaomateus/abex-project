/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import { ReactNode } from 'react';

type Providers<Props> = [React.ComponentType<any>, Props?][];

export function combineProviders<P>(providers: Providers<P>) {
  return providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }: { children: ReactNode }) => (
        <AccumulatedProviders>
          <Provider {...(props as P)}>{children}</Provider>
        </AccumulatedProviders>
      ),
    ({ children }: { children: ReactNode }) => <>{children}</>,
  );
}
