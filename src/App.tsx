import { MainLayout } from "@/components";
import { Router } from "@/routes";
import "./index.scss";

export const App = () => {
  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
};

export default App;
