import { Text, View } from 'react-native';

export default function WellcomeMessage({ name }: { name?: string }, { style }: { style?: any }) {
    return (
        <View style={style}>
            <Text>Welcome {name || 'User'} to our app!</Text>
        </View>
    );
}