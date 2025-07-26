import { PropsWithChildren } from "react";
import { Footer, Header } from "@/components";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='app'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
