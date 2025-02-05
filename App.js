import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [cidade, setCidade] = useState('');
  const [resultado, setResultado] = useState('');
  const [msgAtt, setMsgatt] = useState('');
  const [vento, setVento] = useState('');
  const [pressao, setPressao] = useState('');
  const [umidade, setUmidade] = useState('');

  async function enviar() {
    if (!cidade) {
      alert('digite uma cidade');
      return;
    }
    setMsgatt('buscando temperatura');
    try {
      const url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=c19b7aa4924e8a413f70e35c14bab9e0&units=metric`
      );
      const dados = await url.json();
      if (dados.cod === 200) {
        setResultado(`${parseInt(dados.main.temp)}°C`);
        setMsgatt('dados atualizados com sucesso!');
        setVento(dados.wind.speed);
        setPressao(dados.main.pressure);
        setUmidade(dados.main.humidity);
        setCidade(dados.name);
      } else {
        alert('Cidade não encontrada');
      }
    } catch {
      alert('nao foi possivel fazer a consulta');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <View style={styles.pesquisa}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma Cidade"
            onChangeText={setCidade}
            value={cidade}
          />
          <TouchableOpacity onPress={enviar} style={styles.button}>
            <Text style={styles.textoBotao}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Previsão do Tempo</Text>

        <View style={styles.viewResultado}>
          <Text style={styles.subTitulo} onChange={cidade} value={cidade}>
            {cidade}
          </Text>
          <Text style={styles.msgAtt} value={msgAtt} onChange={msgAtt}>
            {msgAtt}
          </Text>
          <Text style={styles.resultado} value={resultado}>
            {resultado}
          </Text>

          <View style={styles.dadosTemp}>
            <View style={styles.viewDadosText}>
            <Image style= {styles.icon} source={require('./assets/vento.png')}/>
              <Text style={styles.dadosText} onChange={vento} value={vento}>
                {vento}
              </Text>
            </View>

            <View style={styles.viewDadosText}>
            <Image style= {styles.icon} source={require('./assets/gota.png')}/>
              <Text style={styles.dadosText} onChange={umidade} value={umidade}>
                {umidade}
              </Text>
            </View>
            <View style={styles.viewDadosText}>
            <Image style= {styles.icon} source={require('./assets/pressao.png')}/>
              <Text style={styles.dadosText} onChange={pressao} value={pressao}>
                {pressao}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79AAF9',
    padding: 8,
  },
  view: {
    padding: 15,
  },
  viewResultado: {
    backgroundColor: '#ffffff1f',
    display: 'flex',
    gap: 10,
    paddingVertical: 15,
    borderRadius: 20,
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 500,
    color: 'white',
    marginBottom: 20,
  },
  subTitulo: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  msgAtt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 300,
    fontSize: 13,
  },
  pesquisa: {
    backgroundColor: '#ffffff3f',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: 'white',
    height: 35,
    marginBottom: 20,
    marginTop: 10,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: '#ffffff3f',
    borderTopStartRadius: 50,
    borderBottomStartRadius: 50,
    width: '80%',
    height: '100%',
    padding: 8,
  },
  button: {
    height: '100%',
    padding: 5,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 600,
  },
  resultado: {
    textAlign: 'center',
    fontSize: 55,
    fontWeight: 200,
    color: 'white',
  },
  dadosTemp: {
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  viewDadosText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff11',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5
  },
  dadosText: {
    color: 'white',
    fontWeight: 400,
  },
  icon: {
    width: 20,
    height: 20
  }
});
