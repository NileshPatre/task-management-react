import React, { createContext, useState, useEffect, useRef } from "react";
import { fetchData as fetchApiData } from "../services/apis";
import { DataPoint } from "../types/global";

interface AppData {
  allStatus: DataPoint[];
}

const AppDataContext = createContext<AppData | null>(null);

interface AppDataProviderProps {
  children: React.ReactNode;
}

const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [appData, setAppData] = useState<AppData | null>(null);
  const isFetched = useRef<boolean>();
  useEffect(() => {
    const fetchData = async () => {
      const allStatus = await fetchApiData<DataPoint[]>({
        method: "GET",
        url: "/task-management/getAllStatus",
      });
      setAppData({
        allStatus,
      });
    };
    if (!isFetched.current) {
      isFetched.current = true;
      fetchData();
    }
  }, []);

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataProvider, AppDataContext };
