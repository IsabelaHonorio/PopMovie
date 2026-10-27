import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, commonStyles } from './theme';
import { getEvaluatedMovies } from './evaluatedStore';

export default function ConteudosAvaliadosScreen({ navigation, route }) {
  const { apelido, senha } = route.params || {};
  const [filmes, setFilmes] = useState(getEvaluatedMovies());

  useFocusEffect(
    useCallback(() => {
      setFilmes(getEvaluatedMovies());
    }, [])
  );

  return (
    <View style={commonStyles.container}>
      {/* Logo na parte superior */}
      <View style={styles.areaSuperior}>
        <Image
          source={require('./assets/PopMovielogo.png')}
          style={styles.imagem_inicial}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={commonStyles.title}>Conteúdos Avaliados</Text>

      {/* Desenho e frases abaixo do título */}
      <View style={styles.cabecalhoLista}>
        <Image
          source={require('./assets/avaliados.png')}
          style={styles.minhaListaImagem}
          resizeMode="contain"
        />

        <View style={styles.frases}>
          <Text style={styles.text}>
            Conteúdos que você avaliou.
          </Text>

          <Text style={styles.text}>
            Veja seu histórico de filmes.
          </Text>
        </View>
      </View>

      {/* Lista de filmes */}
      <FlatList
        style={styles.flatList}
        data={filmes}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listaFilmes}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum filme encontrado.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('DetalhesFilme', {
                filme: item,
                idFilme: item.id,
                apelido,
                senha,
              })
            }
          >
            <Image
              source={{
                uri: item.poster_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                  : item.imagem,
              }}
              style={styles.poster}
            />
          </TouchableOpacity>
        )}
      />

      {/* Barra de navegação inferior */}
      <View style={styles.barraNavegacao}>
        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('Principal', { apelido, senha })
          }
        >
          <Ionicons
            name="home-outline"
            size={29}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('Buscar', { apelido, senha })
          }
        >
          <Ionicons
            name="search-outline"
            size={29}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('MinhaLista', { apelido, senha })
          }
        >
          <Ionicons
            name="list-outline"
            size={29}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('ConteudosAvaliados', { apelido, senha })
          }
        >
          <Feather
            name="check"
            size={29}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('Perfil', { apelido, senha })
          }
        >
          <Ionicons
            name="person-outline"
            size={29}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areaSuperior: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 0,
  },

  imagem_inicial: {
    width: 250,
    height: 105,
    marginTop: 0,
  },

  cabecalhoLista: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  minhaListaImagem: {
    width: 85,
    height: 85,
  },

  frases: {
    flex: 1,
    marginLeft: 5,
  },

  text: {
    color: COLORS.text,
    fontSize: 15,
    marginVertical: 3,
  },

  flatList: {
    width: '100%',
    flex: 1,
  },

  listaFilmes: {
    paddingHorizontal: 15,
    paddingBottom: 85,
    paddingTop: 6,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  poster: {
    width: 96,
    height: 146,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  emptyText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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