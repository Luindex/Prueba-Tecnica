import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTasksStore";


export function useAutoSync() {
    const processQueue = useTaskStore((s) => s.processQueue);
    const [rehydrated, setRehydrated] = useState(false);
    useEffect(() => {
        const unsub = useTaskStore.persist.onFinishHydration(() => {
            setRehydrated(true);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (!rehydrated) return;

        let isMounted = true;
        let syncing = false;

        const handleConnectivityChange = async (state: any) => {
            if (!isMounted) return;
            if (state.isConnected && !syncing) {
                syncing = true;
                try {
                    await processQueue();
                } catch (err) {
                    console.warn("processQueue failed", err);
                }
                syncing = false;
            }
        };

        const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
        NetInfo.fetch().then(handleConnectivityChange);

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, [rehydrated, processQueue]);
}
