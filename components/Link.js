import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Link({ screenName, linkText }) {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate(screenName);
    };
    
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.linkText}>{linkText}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    linkText: {
        marginTop: 10,
        color: 'gray',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
});