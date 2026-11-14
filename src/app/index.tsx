import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const languages = [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'PHP' },
    { id: '3', name: 'Python' },
    { id: '4', name: 'Java' },
    { id: '5', name: 'Dart' },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
        <View style={[styles.subContainer, { backgroundColor: '#f5c3f7' }]}>
          <Text style={styles.heading}>Hello World</Text>
          <WellcomeMessage name="Devang" />
          <Button title="Click Me" onPress={() => alert('Heyyy!, You Clicked the Button!')} />
        </View>
        <View style={[styles.subContainer, { backgroundColor: '#beb3eb' }]}>
          <Text style={styles.heading}>Counter : {count}</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Button title="+" onPress={() => setCount(count + 1)} />
            <Button title="reset" onPress={() => setCount(0)} />
            <Button title='-' onPress={() => setCount(count - 1)} />
          </View>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
        <View style={[styles.subContainer, { backgroundColor: '#a9fce0' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Enter Your Name: </Text>
            <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder='Enter Your Name...' />
            <Button title='Say Hello' onPress={() => sayHello()} />
          </View>
          <Text style={styles.helloMessage}>{message}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#f1a8b4', padding: 20, borderRadius: 24 }}>
          <FlatList data={languages} keyExtractor={(item) => item.id} renderItem={({ item }) => { if (Number(item.id) % 2 === 0) { return <Text style={styles.listItem}>{item.name}</Text> } else { return <Text style={[styles.listItem, { backgroundColor: '#f3ff86' }]}>{item.name}</Text> } }} />
        </View>
      </View>
    </View >
  )

  function sayHello() {
    if (name.trim() === '') {
      setMessage(`Plase Enter Your Name`);
    } else {
      setMessage(`Hello ${name}`);
    }
  }
}

function WellcomeMessage({ name }: { name?: string }) {
  return (
    <Text style={styles.wellcomeMessage}>Wellcome {name} To my App.</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    gap: 20,
    backgroundColor: '#89fff9',
  },

  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  clickMeBtn: {
    backgroundColor: '#000',
  },

  wellcomeMessage: {
    fontSize: 20,
    color: '#0f13ff',
  },

  label: {
    fontSize: 20,
    color: '#00000062',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#00000062',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  helloMessage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9987ff',
  },

  listItem: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ed92ff',
    fontSize: 30,
    fontWeight: 'bold',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 5,
  }
});