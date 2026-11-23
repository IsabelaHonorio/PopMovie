import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.conteudo}>
        <Image
          style={styles.image}
          source={require('./assets/logo.png')}
          resizeMode="contain"
        />

        <Text
            style={styles.title}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
            >
            Não sabe o que assistir?{"\n"}
            Deixe o <Text style={styles.destaque}>PopMovie</Text> decidir!
        </Text>
      </View>

      <View style={styles.botoes}>
        
        <Pressable
          style={styles.botao}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.conteudoBotao}>
            <Ionicons name="person-outline" size={22} color="white" />
            <Text style={styles.textoBotao}>Login</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.botao}
          onPress={() => console.log('Abrir tela de Cadastro')}
        >
          <Text style={styles.textoBotao}>Realizar cadastro</Text>
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
    justifyContent: 'space-around',
    padding: 20,
  },

  conteudo: {
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: 300,
    height: 200,
  },

  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
    flexShrink: 1,
  },

  destaque: {
    color: '#983BFF',
  },

  botoes: {
    width: '90%',
    gap: 25,
  },

  botao: {
    backgroundColor: '#983BFF',
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: 'white',
    fontSize: 20,
  },

  conteudoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
