import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

import MasonryList from '@react-native-seoul/masonry-list';



export default function App() {
  const data = [
    { uri: 'https://picsum.photos/id/1000/5626/3635' },
    { uri: 'https://picsum.photos/id/1001/5616/3744' },
    { uri: 'https://picsum.photos/id/1002/4312/2868' },
    { uri: 'https://picsum.photos/id/1003/1181/1772' },
    { uri: 'https://picsum.photos/id/1004/5616/3744' },
    { uri: 'https://picsum.photos/id/1005/5760/3840' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MasonryList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ margin: 5 }}>
            <Image
              source={{ uri: item.uri }}
              style={{ height: 200, borderRadius: 10 }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
