import { StyleSheet, Text, View, Image, Pressable, TextInput, Button } from 'react-native';
import { useState, useEffect, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

import { useNavigation, useFocusEffect } from '@react-navigation/native';





export default function DumpDetail({ route }) {
    const { url, text, title, date } = route.params




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
                    padding: 3
                }}>
                    {title}
                </Text>

                <Text
                    style={{
                        padding: 5,
                        fontSize: 15
                    }}
                >

                    {date}

                </Text>
            </View>

            <View style={{
                flex: 15
            }}>
                <WebView
                    textAlignVertical="top"
                    textAlign="left"
                    source={{
                        html: `
                        <html lang="en"><link type="text/css" rel="stylesheet" id="dark-mode-custom-link"><link type="text/css" rel="stylesheet" id="dark-mode-general-link"><style lang="en" type="text/css" id="dark-mode-custom-style"></style><style lang="en" type="text/css" id="dark-mode-native-style"></style><style lang="en" type="text/css" id="dark-mode-native-sheet"></style><head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
                        <title>Rich Editor</title>
                        <link href="main.css" type="text/css" rel="stylesheet">
                        </head>
                        <body>${text}</body><auto-scroll></auto-scroll></html>`
                    }}
                    style={{
                        flex: 15,
                        backgroundColor: '#FEFAE0',
                        borderRadius: 15,
                        marginHorizontal: 5,
                        marginVertical: 7,
                        padding: 5,
                        fontSize: 20
                    }}
                />
            </View>




        </SafeAreaView>


    );
};

