import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.conteudo}>
        <Image
          style={styles.image}
          source={require('./assets/PopMovie_escrito.png')}
          resizeMode="contain"
        />

        <View style={styles.containerPoster}>
          <Image
            style={styles.poster}
            source={require('./assets/thor-ragnarok-poster0.jpg')}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Thor: Ragnarok</Text>

        <Pressable style={styles.botaoSortear}>
          <Ionicons name="refresh" size={22} color="white" />
          <Text style={styles.textoBotao}>Sortear novamente</Text>
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

  conteudo: {
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: 200,
    height: 100,
  },

  containerPoster: {
    width: 300,
    height: 450,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  poster: {
    width: '100%',
    height: '60%',
  },

  title: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    marginTop: -160,
  },

  botaoSortear: {
    backgroundColor: '#983BFF',
    width: '90%',
    padding: 12,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 30,
  },

  textoBotao: {
    color: 'white',
    fontSize: 18,
  },
});
