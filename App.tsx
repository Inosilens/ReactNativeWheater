import {Button, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {wheater} from "./services";


interface IWheater {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface IMain {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
}

interface IWheaterData {
    main: IMain,
    weather: IWheater[]
}

export default function App() {
    const [name, changeName] = React.useState("");
    const [show, setShow] = useState(false);
    const [wheaterData, setWheaterData] = useState<IWheaterData>({
        main: {
            feels_like: 0,
            humidity: 0,
            pressure: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
        },
        weather: [
            {id: 0, main: "", description: "", icon: ""}
        ]

    })

    useEffect(() => {
        wheater.then(response => setWheaterData(response.data.list[0]))
    }, [])
    if (!show) {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={changeName}
                    value={name}
                    placeholder={'Введите имя'}
                />
                <View
                    style={styles.button}>
                    <Button
                        title="Жмякни на меня"
                        color="#f194ff"
                        onPress={() => setShow(true)}
                    />
                </View>
            </SafeAreaView>
        )
    } else {
        return (

            <ImageBackground source={require('./saint.jpg')} resizeMode={"contain"}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.wheaterContainer}>
                    <Text style={styles.text1}>
                        {`Hello , ${name}`}
                    </Text>
                    <Text style={styles.text2}>
                        {`Температура воздуха - ${wheaterData.main.temp}`}
                    </Text>
                    <Text style={styles.text3}>
                        {`Ощущеается как - ${wheaterData.main.feels_like}`}
                    </Text>
                    <Text style={styles.text4}>
                        {`В целом  - ${wheaterData.weather[0].description}`}
                    </Text>
                    <View style={styles.button}>
                        <Button
                            title="Сменить имя"
                            color="#f194ff"
                            onPress={() => setShow(false)}
                        />
                    </View>
                </View>
            </ImageBackground>

        )
    }
}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    wheaterContainer: {

        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: 200,
        borderStyle: "solid",
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        top: 20
    },
    text1: {
        color: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
        fontWeight: 'bold',
        fontSize: 20
    },
    text2: {
        color: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
    },
    text3: {
        color: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
    },
    text4: {
        color: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
    },

});
