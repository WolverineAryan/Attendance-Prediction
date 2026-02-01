import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [csvData, setCsvData] = useState([]);

  return (
    <DataContext.Provider value={{ csvData, setCsvData }}>
      {children}
    </DataContext.Provider>
  );
}
