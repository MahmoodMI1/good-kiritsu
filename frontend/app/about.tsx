import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen() {
  // HTML ELEMENTS Visualized in React Native
  return (
    // JSX SYNTAX
    <View style={styles.container}> 
      <Text style={styles.text}>About Us</Text>

    </View>
  );

}

// STYLESHEET
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    
  }
  ,
  text: {
    padding: 12,
    fontSize: 24,
    fontWeight: 'bold',

  }
});

