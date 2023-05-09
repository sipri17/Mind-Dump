import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { apiKey } from '@env'



export default function SearchGif() {
    const [gifs, setGifs] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')


    const getGifs = async () => {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}&limit=20&offset=${offset}&rating=g&lang=en`
        );

        return response.json();
    };

    const fetchGifs = async (input) => {
        try {
            setLoading(true)
            const response = await getGifs(input);
            setGifs(response.data); // Set new gifs as a new list
            console.log(apiKey, '<<<apikey');

        } catch (error) {
            console.log(error, '<<error');
        } finally {
            setLoading(false)
        }

    };


    const refetchGifs = async () => {
        try {
            setLoading(true)
            const response = await getGifs(offset + 40);
            setGifs([...gifs, ...response.data]); // Append the new gifs to the existing list     
        } catch (error) {
            console.log(error, '<<error');
        } finally {
            setLoading(false)
            if (loading) setOffset(offset => offset + 40); // Increment the page number for the next fetch
        }
    };








    return (


        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                backgroundColor: "#ECE4DB",
                borderRadius: 15,
                marginVertical: 2,

            }}>

                <TextInput value={input} onChangeText={setInput} placeholder='Search gif'
                    style={{
                        marginHorizontal: 5,
                        marginTop: 2,


                    }} />

                <Button title="Search" onPress={fetchGifs}

                />
            </View>


            <MasonryList
                data={gifs}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 2 }}>

                            <Image
                                source={{ uri: item.images.preview_gif.url }}
                                style={{ height: 200, borderRadius: 10 }}
                            />
                            <Text style={{

                            }}>
                                {item.title}

                            </Text>


                        </View>
                    )
                }}
                loading={loading}
                onRefresh={fetchGifs}
                onEndReachedThreshold={0.1}
                onEndReached={() => refetchGifs()}
                showsVerticalScrollIndicator={false}

            />
            {loading && <Text>Loading...</Text>}
        </SafeAreaView>
    );
}


