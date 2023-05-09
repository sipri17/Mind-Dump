import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tab from './screens/Tab'
import SearchGif from './screens/SearchGif'
import CreateDump from './screens/CreateDump';
import store from './store'
import { Provider } from 'react-redux'
import DumpDetail from './screens/DumpDetail';



export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>

      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tab" component={Tab} options={{
              headerShown: false
            }}
            />
            <Stack.Screen name="Home" component={Home} options={{ title: "MindDump" }}/>
            <Stack.Screen name="SearchGif" component={SearchGif} options={{ title: "SearchGif" }} />
            <Stack.Screen name="CreateDump" component={CreateDump} options={{ title: "CreateDump" }} />
            <Stack.Screen name="DumpDetail" component={DumpDetail} options={{ title: "DumpDetail" }} />

          </Stack.Navigator>

        </NavigationContainer>
      </SafeAreaView>
    </Provider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
