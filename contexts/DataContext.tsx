import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextType<T = any> {
  data: T | null;
  setData: (data: T) => void;
  clearData: () => void;
  updateData: (updater: (prev: T | null) => T) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<any>(null);

  const clearData = () => setData(null);

  const updateData = (updater: (prev: any) => any) => {
    setData((prev: any) => updater(prev));
  };

  return (
    <DataContext.Provider value={{ data, setData, clearData, updateData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData<T = any>(): DataContextType<T> {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context as DataContextType<T>;
}