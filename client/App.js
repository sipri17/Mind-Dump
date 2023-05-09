import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import SearchGif from './screens/SearchGif';
import CreateDump from './screens/CreateDump';
import Home from './screens/Home';


export default function App() {


  return (
    <View style={{ flex: 1 }}>
      <Home/>
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
