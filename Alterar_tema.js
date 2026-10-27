import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function AlterarTemaScreen({ navigation, route, voltar }) {
  const { apelido, senha } = route?.params || {};

  const voltarParaPerfil = () => {
    if (typeof voltar === 'function') {
      voltar();
      return;
    }

    if (navigation && typeof navigation.goBack === 'function' && navigation.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Perfil', { apelido, senha });
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Botão Voltar Quadrado */}
      <Pressable
        style={({ pressed }) => [
          styles.botaoVoltar,
          pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }
        ]}
        onPress={voltarParaPerfil}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      >
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 50,
  },

  botaoVoltar: {
    position: 'absolute',
    top: 45,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 12, // Cantos arredondados estilo quadrado moderno (mude para 0 se quiser quadrado perfeito)
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 99,
  },

  conteudo: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },

  image: {
    width: 200,
    height: 100,
    marginTop: 10,
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
    borderRadius: 30,
    marginTop: 30,
  },

  corAtual: {
    color: 'white',
    marginTop: 5,
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
