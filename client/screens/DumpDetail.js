import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import { useState, useEffect, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation, useFocusEffect } from '@react-navigation/native';





export default function DumpDetail({ route }) {
    const { url, text, title, date } = route.params

    console.log(text, '<<text');




    return (
        <SafeAreaView style={{ flex: 1 }}>


            <View style={{
                flex: 3,
                marginTop: 5,
                flexDirection: "row",
                backgroundColor: "white"
            }}>
                <Image source={{ uri: url }} style={{ flex: 5, marginVertical: 2 }} resizeMode='contain' />

            </View>

            <View style={{
                flex: 2,
                backgroundColor: '#FAEDCD',
                borderRadius: 5,
                marginHorizontal: 5,
                fontWeight: 'bold',
                fontSize: 25,
                marginTop: 5,
                padding: 5

            }} >


                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    padding : 3
                }}>
                    {title}
                </Text>

                <Text
                    style={{
                        padding : 5,
                        fontSize : 15
                    }}
                >
                    
                    {date}

                </Text>
            </View>

            <Text
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
            >
                {text}
            </Text>



        </SafeAreaView>


    );
};

