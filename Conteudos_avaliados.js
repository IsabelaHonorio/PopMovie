import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const filmes = [
  { id: '1', titulo: 'Whiplash', imagem: 'https://image.tmdb.org/t/p/w200/7fn624j5lj3xTme2SgiLCeuedmO.jpg' },
  { id: '2', titulo: 'Oppenheimer', imagem: 'https://image.tmdb.org/t/p/w200/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg' },
  { id: '3', titulo: 'Duna', imagem: 'https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: '4', titulo: 'Interestelar', imagem: 'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: '5', titulo: 'Toy Story', imagem: 'https://image.tmdb.org/t/p/w200/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg' },
  { id: '6', titulo: 'Parasita', imagem: 'https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
];

export default function ConteudosAvaliadosScreen({ navigation, route }) {
  const { apelido, senha } = route.params || {};
  const [search, setSearch] = useState('');

  const filmesFiltrados = filmes.filter((filme) =>
    filme.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.voltar}
        onPress={() => navigation.navigate('Principal', { apelido, senha })}
        activeOpacity={0.7}
      >
        <Text style={styles.voltarTexto}>{'<'}</Text>
      </TouchableOpacity>

      <Image
        source={require('./assets/PopMovielogo.png')}
        style={styles.imagem_inicial}
      />
      <Image
        source={require('./assets/avaliados.png')}
        style={styles.minha_lista}
      />
      <Text style={styles.text}>Conteúdos que você avaliou.</Text>
      <Text style={styles.text}>Veja seu histórico de filmes.</Text>

      <View>
        <TextInput
          style={styles.barrinha}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar filmes"
          placeholderTextColor="#666"
        />
        <Image
          source={require('./assets/Icon.png')}
          style={styles.lupa}
        />
      </View>

      <FlatList
        data={filmesFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listaFilmes}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum filme encontrado.</Text>
        }
        renderItem={({ item }) => (
          <Image source={{ uri: item.imagem }} style={styles.poster} />
        )}
      />

      <View style={styles.barraNavegacao}>
        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Principal', { apelido, senha })}
        >
          <Ionicons name="home-outline" size={24} color="#953CFD" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MinhaLista', { apelido, senha })}
        >
          <Ionicons name="list-outline" size={24} color="#953CFD" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ConteudosAvaliados', { apelido, senha })}
        >
          <Feather name="check" size={24} color="#953CFD" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Perfil', { apelido, senha })}
        >
          <Ionicons name="person-outline" size={24} color="#953CFD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 40,
  },

  voltar: {
    position: 'absolute',
    top: 45,
    left: 25,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  voltarTexto: {
    color: '#953CFD',
    fontSize: 35,
  },

  lupa: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: 12,
    marginTop: 32,
  },

  imagem_inicial: {
    width: 180,
    height: 140,
    resizeMode: 'contain',
    marginTop: -30,
  },

  minha_lista: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    top: 120,
    left: 9,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: -5,
    alignSelf: 'flex-start',
    marginLeft: 90,
  },

  barrinha: {
    width: 280,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#000000',
    marginBottom: 25,
    marginTop: 25,
  },

  listaFilmes: {
    paddingHorizontal: 8,
    paddingBottom: 80,
    paddingTop: 6,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingHorizontal: 4,
  },

  poster: {
    width: 96,
    height: 146,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  emptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0a0a0c',
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  itemNav: {
    padding: 10,
  },
});
