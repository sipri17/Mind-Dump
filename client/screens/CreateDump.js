import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from "react-redux"
import { setInputState } from '../store/actions/actionCreator'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation, useFocusEffect } from '@react-navigation/native';





export default function CreateDump({ route }) {
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch()
    let { inputState } = useSelector(state => state.inputState)
    const [url, setUrl] = useState(inputState.url);


    const handleDelete = () => {
        setUrl('');
        dispatch(setInputState({ url: "", title, text }))
        console.log(inputState.url, 'triggered delete');

    };





    // Load the items from local storage when the component mounts
    useEffect(() => {
        async function loadItems() {
            const storedItems = await AsyncStorage.getItem('items');
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            }
        }
        loadItems();
    }, []);

    useFocusEffect(
        useCallback(() => {
            console.log(inputState, 'triggered in usefocuseffect');
            setUrl(inputState.url)
        }, [inputState.url])
    )



    // Save the items to local storage whenever they are updated
    useEffect(() => {
        async function saveItems() {
            await AsyncStorage.setItem('items', JSON.stringify(items));
        }
        saveItems();
    }, [items]);

    function getCurrentDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        let suffix = 'th';
      
        if (day === 1 || day === 21 || day === 31) {
          suffix = 'st';
        } else if (day === 2 || day === 22) {
          suffix = 'nd';
        } else if (day === 3 || day === 23) {
          suffix = 'rd';
        }
      
        return `${month} ${day}${suffix}, ${date.getFullYear()}`;
      }
      

    const handleAddItem = () => {
        const newItem = {
            url,
            title,
            date: getCurrentDate(),
            text
        };
        setItems([...items, newItem]);
        setUrl('');
        setText('');
        setTitle('');
        navigation.goBack();

    };

    // console.log(items, '<<<ITEMS');

    const navigateToSearchGif = () => {
        dispatch(setInputState({ title, text }))
        navigation.navigate('SearchGif');
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>

            {url ? (
                <View style={{
                    flex: 3,
                    marginTop: 5,
                    flexDirection: "row",
                    backgroundColor: "#ccd5ae"
                }}>
                    <Image source={{ uri: url }} style={{ flex: 5, marginVertical: 2 }} resizeMode='contain' />
                    <Pressable onPress={handleDelete}
                        style={{
                            flex: 2,
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{
                            flexDirection: "row",
                            backgroundColor: "#fb5607",
                            color: "white",
                            borderRadius: 5,
                            padding: 4
                        }}>Delete Image</Text>
                    </Pressable>
                </View>
            ) : (
                <Pressable onPress={navigateToSearchGif}
                    style={{
                        flex: 3,
                        alignItems: "center",
                        flexDirection: 'row',
                        justifyContent: "space-around",
                        backgroundColor: "#ccd5ae"
                    }}
                >
                    <Text
                        style={{
                            backgroundColor: "#fefae0",
                            borderRadius: 5,
                            padding: 4
                        }}
                    >
                        Choose Image
                    </Text>
                </Pressable>
            )}
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter Title"
                style={{
                    flex: 2,
                    backgroundColor: '#FAEDCD',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    marginTop: 5,
                    fontWeight: 'bold',
                    fontSize: 25,
                    padding: 3
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
                    flex: 15,
                    backgroundColor: '#FEFAE0',
                    borderRadius: 15,
                    marginHorizontal: 5,
                    marginVertical: 7,
                    padding: 5,
                    fontSize : 20
                }}
            />
            <Button title="Save Dump" onPress={handleAddItem}
                style={{
                    flex: 3,
                    backgroundColor: 'green',
                }}
            />


        </SafeAreaView>


    );
};

