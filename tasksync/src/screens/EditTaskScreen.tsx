import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTaskStore } from "../store/useTasksStore";

export default function EditTaskScreen({ route, navigation }: any) {
    const { task } = route.params;
    const updateTask = useTaskStore(s => s.updateTask);

    const [title, setTitle] = useState(task.title);

    const save = async () => {
        await updateTask({ ...task, title });
        navigation.goBack();
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 12 }}>Editar tarea</Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Nuevo título"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 20
                }}
            />

            <Button title="Guardar cambios" onPress={save} />
        </View>
    );
}
