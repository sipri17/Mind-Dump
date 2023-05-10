import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
    const [items, setItems] = useState([]);
    const [filteredArr, setFilteredArr] = useState([])
    const navigation = useNavigation();
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(8)
    const [slicedArray, setSlicedArray] = useState([])
    const [loading, setLoading] = useState(false)

    // Load the items from local storage when the component mounts
    async function loadItems() {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
            const parsedItems = (JSON.parse(storedItems))
            parsedItems.reverse() //sort from the newest
            setItems(parsedItems);
            setFilteredArr(parsedItems);
            setSlicedArray(parsedItems.slice(0, limit))
        }
    }

    useFocusEffect(
        useCallback(() => {
            setLimit(10)
            loadItems()
            setSearch('')
        }, [navigation])
    )

    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value)

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            }

        }, [value, delay]

        )
        return debouncedValue
    }

    const debouncedSearch = useDebounce(search, 500)


    function filterDump() {
        if (search === '') {
            setFilteredArr(items);
            setSlicedArray(items.slice(0, limit))

        } else {
            const newArr = items.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            setFilteredArr(newArr)
            setSlicedArray(newArr.slice(0, limit))
        }
    }

    const displayMoreGifs = () => {
        if (!loading && limit<=items.length) {
            setLoading(true)
            setTimeout(() => {
                setLimit(limit => limit + 5);
            }, 500)
        }
    }
    
    useEffect(() => {
        const newArr = filteredArr.slice(0, limit)
        setSlicedArray(newArr)
        setLoading(false)
    }, [limit])


    useEffect(() => {
        filterDump()        
    }, [debouncedSearch])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{marginVertical: 5}}>

                <TextInput value={search} onChangeText={setSearch} placeholder='Search dump'
                    style={styles.textInputSearch} />
            </View>
            <MasonryList
                data={slicedArray}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 2 }}>
                            <Pressable
                                style={({ pressed }) => (styles.pressableNavigate)}
                                onPress={
                                    () =>
                                        navigation.navigate({
                                            name: 'DumpDetail',
                                            params: { ...item }
                                        })
                                }
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.image}
                                />
                                <Text style={{
                                    fontWeight: "bold",
                                    padding: 2,
                                    fontSize: 18
                                }}>
                                    {item.title}
                                </Text>
                                <Text style={styles.textDate}>
                                    {item.date}
                                </Text>
                            </Pressable>

                        </View>
                    )
                }}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                onEndReached={displayMoreGifs}
                onRefresh={loadItems}

            />
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    textInputSearch:{
        borderRadius: 5,
        backgroundColor: "#ECE4DB",
        marginHorizontal: 5,
        marginVertical: 10,
    },
    pressableNavigate:{
        backgroundColor: '#ccd5ae',
        borderRadius: 3,
        width: "100%",
        padding: 1
    },
    image:{
        height: 200,
        borderRadius: 10
    },
    textDate:{
        paddingHorizontal: 2,
        fontSize: 13
    }
})
