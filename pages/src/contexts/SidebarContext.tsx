import { FC, useState, createContext } from 'react';
interface SidebarContextI {
  sidebarToggle: any;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<Partial<SidebarContextI>>({});

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
