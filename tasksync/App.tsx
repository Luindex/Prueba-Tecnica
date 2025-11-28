import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import EditTaskScreen from "./src/screens/EditTaskScreen";
import TaskList from "./src/screens/TaskList";
import { useAutoSync } from "./src/utlis/sync";

const Stack = createStackNavigator();

export default function App() {
  useAutoSync();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    (async () => {
      await Notifications.requestPermissionsAsync();
    })();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="TaskList" component={TaskList} options={{ title: "Mis tareas" }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: "Editar tarea" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
