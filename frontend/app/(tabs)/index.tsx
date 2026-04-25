import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io(process.env.EXPO_PUBLIC_API_URL);

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("User connected:", socket.id);
    });

    socket.on("getUsers", (userList) => {
      console.log("Users:", userList);
      setUsers(userList);
    });

    return () => {
      socket.off("connect");
      socket.off("getUsers");
    };
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) return;

    socket.emit("addUser", { name });
    setName(""); 
  };

  return (
    <View style={styles.background}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        style={styles.input}
      />

      <Button
        title="Submit"
        onPress={handleSubmit}
      />

      <View style={styles.containerName}>
        {users.map((user, i) => (
          <Text key={i} style={styles.text}>
            {user}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },

  containerName: {
    marginTop: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});