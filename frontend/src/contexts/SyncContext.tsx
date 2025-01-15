import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface SyncContextType {
    syncStatus: string;
    sync: () => Promise<void>;
}

export const SyncContext = createContext<SyncContextType>({
    syncStatus: "Synced",
    sync: async () => {},
});

interface SyncProviderProps {
    children: ReactNode;
}

export const SyncProvider: React.FC<SyncProviderProps> = ({ children }) => {
    const [syncStatus, setSyncStatus] = useState("Synced");

    const sync = async () => {
        setSyncStatus("Syncing...");
        try {
            await axios.post("http://localhost:3000/api/sync");
            setSyncStatus("Synced");
        } catch (error) {
            console.error("Sync failed:", error);
            setSyncStatus("Failed to sync");
        }
    };

    return (
        <SyncContext.Provider value={{ syncStatus, sync }}>
            {children}
        </SyncContext.Provider>
    );
};
