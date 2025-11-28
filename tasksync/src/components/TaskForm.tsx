import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function TaskForm({ onSubmit, onCancel }: { onSubmit: (title: string) => void; onCancel: () => void; }) {
    const [title, setTitle] = useState("");
    return (
        <View style={{ padding: 12, backgroundColor: "#fff", borderTopWidth: 1 }}>
            <TextInput value={title} onChangeText={setTitle} placeholder="Título" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
            <Button title="Guardar" onPress={() => onSubmit(title)} />
            <Button title="Cancelar" onPress={onCancel} />
        </View>
    );
}