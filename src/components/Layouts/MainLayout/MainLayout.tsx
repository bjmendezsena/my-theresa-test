import { PropsWithChildren } from 'react';
import { Header } from '@/components';
import './MainLayout.scss';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app">
      <Header />
      <div className="app__content">{children}</div>
    </div>
  );
};
