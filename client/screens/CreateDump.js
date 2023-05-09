import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage';






export default function CreateDump({ route }) {
    const [items, setItems] = useState([]);
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');










    // Load the items from local storage when the component mounts
    async function loadItems() {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }


    useEffect(() => {

        loadItems();
    }, []);


    async function saveItems() {
        await AsyncStorage.setItem('items', JSON.stringify(items));
    }


    // Save the items to local storage whenever they are updated
    useEffect(() => {
     
        saveItems();
    }, [items]);

    const handleAddItem = () => {
        const newItem = {
            url,
            title,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            text
        };
        setItems(['']);
        setUrl('');
        setText('');
        setTitle('');
        loadItems()

    };

    console.log(items, '<<<ITEMS');



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TextInput
                value={url}
                onChangeText={setUrl}
                placeholder="Enter Url"
                style={{

                    backgroundColor: '#FAEDCD',
                    borderRadius: 5,
                    marginHorizontal: 5,

                }}
            />

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter Title"
                style={{

                    backgroundColor: '#FAEDCD',
                    borderRadius: 5,
                    marginHorizontal: 5,

                }}
            />
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Enter text"
                multiline={true}
                textAlignVertical="top"
                textAlign="left"
                style={{

                    backgroundColor: '#FEFAE0',
                    borderRadius: 15,
                    marginHorizontal: 5,
                    marginVertical: 7,
                    paddingTop: 5
                }}
            />
            <Button title="Add item" onPress={handleAddItem}

            />
            <MasonryList
                data={items}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 2 }}>

                            {item.url? <Image
                                source={{ uri: item.url }}
                                style={{ height: 200, borderRadius: 10 }}
                            />: ""}
                            <Text style={{

                            }}>
                                {item.title}

                            </Text>
                            <Text style={{

                            }}>
                                {item.date}

                            </Text>



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

