import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



interface MyButtonProps {
    title: string;
    onPress: () => void;
}

export default function MyButton({ title, onPress }: MyButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 120,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#023e8a',
    },
    text: {
        color: 'white'
    }
})