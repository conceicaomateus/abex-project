import { Outlet } from 'react-router-dom';

export function combineComponents(componenets: React.ComponentType[]) {
  return (
    <>
      {componenets.map((Component, index) => (
        <Component key={index} />
      ))}
      <Outlet />
    </>
  );
}
