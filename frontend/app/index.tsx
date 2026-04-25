import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Good Kiritsu</Text>
      <Link href="/about">Go to About</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347'
  }
});
