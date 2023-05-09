import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import CreateDump from './CreateDump'
import SearchGif from './SearchGif'
import Home from './Home'

export default function BottomTabNavigator() {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'MindDump') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'SearchGif' ) {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'CreateDump' ) {
                        iconName = focused ? 'create' : 'create-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen name="MindDump" component={Home} options={{
                headerShown: false
                
            }} />
             <Tab.Screen name="SearchGif" component={SearchGif} options={{
                headerShown: false
            }} />
            <Tab.Screen name="CreateDump" component={CreateDump} options={{
                headerShown: false
            }} />

        </Tab.Navigator>
    )
}