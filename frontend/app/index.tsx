import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("authToken").then((token) => {
      setLoggedIn(!!token);
      setReady(true);
    });
  }, []);

  if (!ready) return null;
  return <Redirect href={loggedIn ? "/(home)" : "/(auth)/login"} />;
}