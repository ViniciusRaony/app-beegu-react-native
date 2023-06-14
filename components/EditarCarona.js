import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React from 'react'

const EditarCarona = () => {
    const [horario, setaHorario] = React.useState('');
    const [vagas, setaVagas] = React.useState('');
    const [enderecoInicial, setaEnderecoInicial] = React.useState('');
    const [enderecoFinal, setaEnderecoFinal] = React.useState('');

    const endpoint = 'https://github-sq75eata2q-uc.a.run.app/api/v1/carona';

    let carona = {
        horario: horario,
        vagas: vagas,
        enderecoInicial: enderecoInicial,
        enderecoFinal: enderecoFinal,
        updatedAt: new Date().toISOString(),
    }

    const listarCaronaById = (id) => {
        fetch(`${endpoint}/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    const atualizarCaronaById = (id) => {
        fetch(`${endpoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(carona),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }

    return (
        <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.rideTitle}>Editar carona</Text>
      </View>

      <ImageBackground source={require('../assets/images/logo.png')} style={styles.rideDetails} imageStyle={styles.image}>
        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 150 }}>
          <Text style={styles.rideDetailsTitle}>Detalhes da carona</Text>
          <View style={styles.mapaWrapper}>
            <MapView
              provider={MapView.PROVIDER_GOOGLE}
              style={styles.mapa}
              region={{
                latitude: -8.052313156323136,
                longitude: -34.88511714332138,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: -8.052313156323136,
                  longitude: -34.88511714332138,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02
                }}
                pinColor={'#4C2F47'}
                title={"Você está aqui!"}
              />
            </MapView>
          </View>

          <Text style={styles.label}>Ponto de partida</Text>
          <TextInput style={styles.caixaTexto} value={enderecoInicial} onChangeText={setaEnderecoInicial} />

          <Text style={styles.label}>Destino</Text>
          <TextInput style={styles.caixaTexto} value={enderecoFinal} onChangeText={setaEnderecoFinal} />

          <View style={styles.opcoes}>
            <View>
              <Text style={styles.label}>Horário da partida</Text>
              <TextInput style={styles.caixaTexto} value={horario} onChangeText={setaHorario} />
            </View>

            <View>
              <Text style={styles.label}>Número de lugares</Text>
              <TextInput style={styles.caixaTexto} value={vagas} onChangeText={setaVagas} keyboardType='numeric' />
            </View>
          </View>

          <TouchableHighlight style={styles.botao} underlayColor="#674461" onPress={adicionarCarona}>
            <Text style={styles.txtBotao}>Criar carona</Text>
          </TouchableHighlight>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      topBar: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEDF00',
      },
    
      rideTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4C2F47',
        paddingTop: 120,
      },
    
      rideDetails: {
        alignItems: 'center',
      },
    
      image: {
        flex: 1,
        opacity: 0.1,
        resizeMode: 'contain',
        position: 'absolute',
        width: 600,
        height: 1000,
        top: -75,
        left: 75,
      },
    
      rideDetailsTitle: {
        marginBottom: 30,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4C2F47',
      },
    
      scroll: {
        width: '100%',
        paddingTop: 30,
        paddingRight: 40,
        paddingBottom: 30,
        paddingLeft: 40,
      },
    
      mapaWrapper: {
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4C2F47',
        overflow: 'hidden',
        marginBottom: 10,
      },
    
      mapa: {
        flex: 1,
        width: 300,
        height: 300,
      },
    
      label: {
        color: '#4C2F47',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
      },
    
      caixaTexto: {
        height: 35,
        backgroundColor: '#FFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4C2F47',
        marginBottom: 10,
        padding: 10,
      },
    
      opcoes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
      },
    
      botao: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4C2F47',
        borderRadius: 10,
        padding: 8,
      },
    
      txtBotao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
      },
})

export default EditarCarona