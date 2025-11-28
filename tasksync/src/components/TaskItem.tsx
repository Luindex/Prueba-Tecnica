import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { Task, useTaskStore } from "../store/useTasksStore";

export default function TaskItem({ task }: { task: Task }) {
    const updateTask = useTaskStore(s => s.updateTask);
    const deleteTask = useTaskStore(s => s.deleteTask);
    const navigation: any = useNavigation();

    const toggle = useCallback(() => {
        updateTask({ ...task, completed: !task.completed });
    }, [task, updateTask]);

    const goToEdit = useCallback(() => {
        navigation.navigate("EditTask", { task });
    }, [navigation, task]);

    return (
        <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee", flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity onPress={toggle} style={{ flex: 1 }}>
                <Text style={{ textDecorationLine: task.completed ? "line-through" : "none" }}>{task.title}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 8 }}>
                <Button title="Edit" onPress={goToEdit} />
                <Button title="Delete" onPress={() => deleteTask(task.id)} />
            </View>
        </View>
    );
}
