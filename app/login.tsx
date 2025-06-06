import MyButton from "@/components/MyButton";
import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default function Login() {
    const router = useRouter()
    
        const onLogin = () => {
            router.navigate('/signup')
        }
    
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Welcome to Login Page</Text>
          <TextInput placeholder="Enter email" style={styles.inputText}></TextInput>
          <TextInput placeholder="Enter password" style={styles.inputText}></TextInput>
          <MyButton title="Login" onPress={onLogin}/>
          <Link href="/signup" style={{ color: '#023e8a', fontSize: 16 }}>
            Don't have an account? Sign Up
          </Link>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },

  text: {
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#023e8a',
    textAlign: 'center',
  },

  inputText: {
    width: '100%',
    padding: 10,
    borderWidth:1,
    borderRadius: 10,
    borderColor: '#023e8a',
  }
});