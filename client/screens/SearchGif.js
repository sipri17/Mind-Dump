import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { setInputState,fetchGifs, fetchNewGifs } from '../store/actions/actionCreator'
import { useDispatch, useSelector } from "react-redux"


import { apiKey } from '@env'



export default function SearchGif({ route }) {
    const {gifs} = useSelector(state=>state.gifs)
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const navigation = useNavigation();
    const dispatch = useDispatch()

    function useDebounce(value , delay) {
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

    const fetchMore = () => {
        if(!loading){
            setLoading(true)
            setTimeout(()=>{
                setOffset(offset => offset + 20);
            },500)
        }
        
    }



    useEffect(()=>{
         dispatch(fetchNewGifs(search,offset,setLoading))
    },[offset])

    useEffect(() => {
        if (debouncedSearch && search ) {
            dispatch(fetchGifs(search))            
        }
        
    }, [debouncedSearch])




    return (


        <SafeAreaView style={{ flex: 1 }}>
            <View style={{marginVertical: 5}}>
                <TextInput value={search} onChangeText={setSearch} placeholder='Search gif'
                     style={styles.textInputSearch} />
            </View>

            <MasonryList
                data={gifs}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 2 }}>

                            <Pressable
                                style={({ pressed }) => (styles.pressableNavigate)}
                                title={item.title}
                                onPress={
                                    () => {
                                        dispatch(setInputState({ url: item.images.preview_gif.url }))
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
                onEndReached={fetchMore}
                showsVerticalScrollIndicator={false}

            />
            {loading && <Text>Loading...</Text>}
        </SafeAreaView>
    );
}

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
    }
})


