import React, { createContext, useContext, useState } from 'react';
import { AppContext } from '../app';

interface ProjectContextType {
  selectedProject: any;
  setSelectedProject: (project: any) => void;
  AppState: any
  AppDispatch: any
}

interface ProjectProviderProps {
    children: React.ReactNode;
  }

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject, AppState, AppDispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
