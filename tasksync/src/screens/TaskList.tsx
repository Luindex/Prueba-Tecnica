import * as Notifications from "expo-notifications";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { useTaskStore } from "../store/useTasksStore";

export default function TaskList() {
    const tasks = useTaskStore(s => s.tasks);
    const fetchTasks = useTaskStore(s => s.fetchTasks);
    const loading = useTaskStore(s => s.loading);
    const error = useTaskStore(s => s.error);
    const addTask = useTaskStore(s => s.addTask);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                await fetchTasks();
            } catch (err) {
                console.warn("No se pudieron cargar tareas del servidor", err);
            }
        };
        loadTasks();
    }, [fetchTasks]);

    const onAdd = useCallback(async (title: string) => {
        await addTask(title);
        setShowForm(false);

        await Notifications.scheduleNotificationAsync({
            content: { title: "Tarea creada con éxito", body: title },
            trigger: {
                type: 'timeInterval',
                seconds: 1,
                repeats: false,
            } as Notifications.TimeIntervalTriggerInput,
        });
    }, [addTask]);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                <Text style={{ fontSize: 22 }}>TaskSync</Text>
                <Button title="Nueva tarea" onPress={() => setShowForm(true)} />
            </View>

            {loading && <ActivityIndicator size="large" />}
            {error && <View><Text>Error: {error}</Text><Button title="Reintentar" onPress={fetchTasks} /></View>}
            {!loading && tasks.length === 0 && <Text>No hay tareas. Crea la primera.</Text>}

            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <TaskItem task={item} />}
            />

            {showForm && <TaskForm onSubmit={onAdd} onCancel={() => setShowForm(false)} />}
        </View>
    );
}
