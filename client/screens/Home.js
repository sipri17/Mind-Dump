import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const [items, setItems] = useState([]);
    const [filteredArr, setFilteredArr] = useState(items)
    const [search, setSearch] = useState('')

    // Load the items from local storage when the component mounts
    async function loadItems() {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
            const parsedItems = (JSON.parse(storedItems))
            parsedItems.reverse() //sort from the newest
            setItems(parsedItems);
            setFilteredArr(parsedItems)
        }
    }

    useEffect(() => {
        loadItems()
    }, [])


    function filterDump() {
        if (search === '') {
            setFilteredArr(items);
        } else {
            const newArr = items.filter(item => item.title.includes(search))
            setFilteredArr(newArr)
        }
    }
    console.log(items,'<<<items');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                backgroundColor: "#ECE4DB",
                borderRadius: 15,
                marginVertical: 2,

            }}>

                <TextInput value={search} onChangeText={setSearch} placeholder='Search gif'
                    style={{
                        marginHorizontal: 5,
                        marginTop: 2,
                    }} />

                <Button title="Search" onPress={filterDump}
                />
            </View>
            <MasonryList
                data={filteredArr}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 2 }}>

                            <Pressable
                                style={({ pressed }) => ({
                                    backgroundColor: '#ccd5ae',
                                    borderRadius: 3,
                                    width: "100%",
                                    padding: 1
                                })}
                               
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    style={{
                                        height: 200,
                                        borderRadius: 10
                                    }}
                                />
                                <Text style={{
                                    fontWeight: "bold",
                                    padding: 2,
                                    fontSize: 18
                                }}>
                                    {item.title}
                                </Text>
                                <Text style={{
                                    paddingHorizontal: 2,
                                    fontSize: 13
                                }}>
                                    {item.date}
                                </Text>
                            </Pressable>

                        </View>
                    )
                }}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                onRefresh={loadItems}

            />
        </SafeAreaView>


    );
};

