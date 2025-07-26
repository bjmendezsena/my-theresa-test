import { MainLayout } from '@/components';
import { Router } from '@/routes';
import { RootProvider } from '@/provider';
import './index.scss';

export const App = () => {
  return (
    <RootProvider>
      <MainLayout>
        <Router />
      </MainLayout>
    </RootProvider>
  );
};

export default App;
