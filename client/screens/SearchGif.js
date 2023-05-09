import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { setInputState } from '../store/actions/actionCreator'
import { useDispatch, useSelector } from "react-redux"


import { apiKey } from '@env'



export default function SearchGif({ route }) {
    const [gifs, setGifs] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const navigation = useNavigation();
    const dispatch = useDispatch()


    const getGifs = async () => {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=20&offset=${offset}&rating=g&lang=en`
        );
        return response.json();
    };

    const fetchGifs = async () => {
        try {
            setLoading(true)
            const response = await getGifs();
            setGifs(response.data); // Set new gifs as a new list
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

                <TextInput value={search} onChangeText={setSearch} placeholder='Search gif'
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

                            <Pressable
                                style={({ pressed }) => ({
                                    backgroundColor: '#ccd5ae',
                                    borderRadius: 3,
                                    width: "100%",
                                    padding: 1
                                })}
                                title={item.title}
                                onPress={
                                    () => {
                                        dispatch(setInputState({ url: item.images.preview_gif.url }))
                                        console.log({ url: item.images.preview_gif.url }, '<<triggered in searchGif');
                                        navigation.navigate({
                                            name: 'CreateDump',
                                        })
                                    }

                                }
                            >
                                <Image
                                    source={{ uri: item.images.preview_gif.url }}
                                    style={{ height: 200, borderRadius: 10 }}
                                />
                                <Text style={{
                                    paddingHorizontal: 2,
                                    fontSize: 13
                                }}>
                                    {item.title}

                                </Text>
                            </Pressable>

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


