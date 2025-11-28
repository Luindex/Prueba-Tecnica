import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "../api/client";

export type Task = {
    id: number;
    title: string;
    completed: boolean;
};

type PendingAction = {
    type: "create" | "update" | "delete";
    payload: any;
    tempId?: number;
};

type State = {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    pending: PendingAction[];
    fetchTasks: () => Promise<void>;
    addTask: (title: string) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    processQueue: () => Promise<void>;
    clearError: () => void;
};

let syncingQueue = false;

export const useTaskStore = create<State>()(
    persist(
        (set, get) => ({
            tasks: [],
            loading: false,
            error: null,
            pending: [],
            clearError: () => set({ error: null }),
            fetchTasks: async () => {
                set({ loading: true });
                try {
                    const res = await api.get("/tasks");
                    set({ tasks: res.data, loading: false });
                } catch (err) {
                    set({ error: "Error cargando tareas", loading: false });
                }
            },
            addTask: async (title: string) => {
                const tempId = Date.now();
                const newTask = { id: tempId, title, completed: false };
                set({ tasks: [...get().tasks, newTask] });

                try {
                    const res = await api.post("/tasks", { title, completed: false });
                    set({
                        tasks: get().tasks.map(t => (t.id === tempId ? res.data : t)),
                    });
                } catch {
                    set({
                        pending: [...get().pending, { type: "create", payload: { title }, tempId }],
                    });
                }
            },
            deleteTask: async (id: number) => {
                const originalTasks = get().tasks;
                set({ tasks: originalTasks.filter(t => t.id !== id) });

                try {
                    await api.delete(`/tasks/${id}`);
                } catch {
                    set({
                        tasks: originalTasks,
                        pending: [...get().pending, { type: "delete", payload: { id } }],
                    });
                }
            },
            updateTask: async (task: Task) => {
                const originalTasks = get().tasks;
                set({
                    tasks: originalTasks.map(t => (t.id === task.id ? task : t)),
                });

                try {
                    await api.put(`/tasks/${task.id}`, task);
                } catch {
                    set({
                        tasks: originalTasks,
                        pending: [...get().pending, { type: "update", payload: task }],
                    });
                }
            },
            processQueue: async () => {
                if (syncingQueue) return;
                syncingQueue = true;

                const queue = [...get().pending];
                if (!queue.length) {
                    syncingQueue = false;
                    return;
                }

                for (const action of queue) {
                    try {
                        if (action.type === "create") {
                            const res = await api.post("/tasks", action.payload);
                            set({
                                tasks: get().tasks.map(t => (t.id === action.tempId ? res.data : t)),
                            });
                        }
                        if (action.type === "update") {
                            await api.put(`/tasks/${action.payload.id}`, action.payload);
                        }
                        if (action.type === "delete") {
                            await api.delete(`/tasks/${action.payload.id}`);
                        }
                    } catch {
                        syncingQueue = false;
                        return;
                    }
                }

                set({ pending: [] });
                syncingQueue = false;
            },
        }),
        {
            name: "tasks-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: state => ({ tasks: state.tasks, pending: state.pending }),
        }
    )
);
