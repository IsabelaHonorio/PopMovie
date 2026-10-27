import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlterarTemaScreen({ navigation, route, voltar }) {
  const { apelido, senha } = route?.params || {};

  const voltarParaPerfil = () => {
    if (typeof voltar === 'function') {
      voltar();
      return;
    }

    if (navigation && navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    if (navigation) {
      navigation.navigate('Perfil', { apelido, senha });
    }
  };

  return (
    <View style={styles.container}>

      <Pressable
        style={styles.botaoVoltar}
        onPress={voltarParaPerfil}
      >
        <Text style={styles.voltarTexto}>{'<'}</Text>
      </Pressable>

      <View style={styles.conteudo}>
        <Image
          style={styles.image}
          source={require('./assets/PopMovielogo.png')}
          resizeMode="contain"
        />

        <Text style={styles.title}>Alterar tema</Text>

        <View style={styles.circulo} />

        <Text style={styles.corAtual}>Cor atual</Text>

        <Text style={styles.novoTema}>Escolha um novo tema:</Text>

        <View style={styles.cores}>
          <View style={styles.circuloRoxo} />
          <View style={styles.circuloRosa} />
          <View style={styles.circuloAzul} />
        </View>

        <Pressable style={styles.botaoAplicar} onPress={voltarParaPerfil}>
          <Text style={styles.textoBotao}>Aplicar filtros</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },

  botaoVoltar: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  voltarTexto: {
    color: '#983BFF',
    fontSize: 42,
    lineHeight: 42,
    marginTop: -6,
  },

  conteudo: {
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: 200,
    height: 100,
    marginTop: 20,
  },

  title: {
    color: '#983BFF',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },

  circulo: {
    width: 60,
    height: 60,
    backgroundColor: '#983BFF',
    borderRadius: 100,
    marginTop: 30,
  },

  corAtual: {
    color: 'white',
    marginTop: 2,
  },

  novoTema: {
    color: 'white',
    marginTop: 30,
    fontSize: 20,
    alignSelf: 'flex-start',
  },

  cores: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    width: '100%',
    marginTop: 40,
  },

  circuloRoxo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#953CFD',
  },

  circuloRosa: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF69B4',
  },

  circuloAzul: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00A5CF',
  },

  botaoAplicar: {
    backgroundColor: '#983BFF',
    width: '80%',
    padding: 12,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 55,
  },

  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
