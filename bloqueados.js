import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';

import { COLORS, commonStyles, useTheme } from './theme';

import {
  getBlockedMovies,
  subscribeToBlockedMovies,
  toggleMovieBlocked,
} from './blockedStore';

export default function BloqueadosScreen({ navigation, route, voltar }) {
  const {
    background,
    border,
    primary,
    surfaceElevated,
    text,
    textSoft,
  } = useTheme();
  const { apelido, senha } = route?.params || {};

  const voltarParaPerfil = () => {
    if (typeof voltar === 'function') {
      voltar();
      return;
    }

    if (navigation) {
      navigation.navigate('Perfil', { apelido, senha });
    }
  };

  const [filmes, setFilmes] = useState(getBlockedMovies());

  useEffect(() => subscribeToBlockedMovies(setFilmes), []);

  const navegar = (tela) =>
    navigation?.navigate(tela, { apelido, senha });

  return (
    <View style={[commonStyles.container, { backgroundColor: background }]}>
      {/* Cabeçalho alinhado ao padrão de Minha Lista */}
      <View style={estilos.areaSuperior}>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          activeOpacity={0.7}
          onPress={voltarParaPerfil}
          accessibilityLabel="Voltar ao perfil"
        >
          <Ionicons
            name="chevron-back"
            size={29}
            color={primary}
          />
        </TouchableOpacity>

        <Image
          source={require('./assets/PopMovielogo.png')}
          style={estilos.imagem_inicial}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={[commonStyles.title, { color: text }]}>
        Conteúdos Bloqueados
      </Text>

      {/* Desenho e descrição abaixo do título */}
      <View style={estilos.secaoAviso}>
        <Image
          style={estilos.iconePipoca}
          source={require('./assets/pbl.png')}
          resizeMode="contain"
        />

        <View style={estilos.frases}>
          <Text style={[estilos.textoAviso, { color: text }]}>
            Estes itens estão bloqueados.
          </Text>

          <Text style={[estilos.textoAviso, { color: text }]}>
            Desbloqueie-os para sorteá-los.
          </Text>
        </View>
      </View>

      {/* Lista de filmes bloqueados */}
      <FlatList
        style={estilos.flatList}
        data={filmes}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        columnWrapperStyle={estilos.columnWrapper}
        contentContainerStyle={estilos.listaFilmes}
        showsVerticalScrollIndicator={false}
        indicatorStyle="white"
        ListEmptyComponent={
          <Text style={[estilos.mensagemVazia, { color: textSoft }]}>
            Nenhum filme bloqueado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={estilos.cartaoFilme}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation?.navigate('DetalhesFilme', {
                  filme: item,
                  idFilme: item.id,
                  apelido,
                  senha,
                })
              }
              accessibilityLabel={`Abrir detalhes de ${
                item.title ||
                item.original_title ||
                item.nome ||
                'filme'
              }`}
            >
              <View style={estilos.containerPoster}>
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : item.imagem,
                  }}
                  style={estilos.posterFilme}
                  resizeMode="cover"
                />

                <View style={estilos.sobreposicaoBloqueio}>
                  <Ionicons
                    name="lock-closed"
                    size={26}
                    color={primary}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoAcao}
              activeOpacity={0.8}
              onPress={() => toggleMovieBlocked(item)}
              accessibilityLabel={`Desbloquear ${
                item.title || item.original_title || item.nome || 'filme'
              }`}
            >
              <Ionicons
                name="lock-open-outline"
                size={18}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Rodapé igual ao da tela Minha Lista: cinco ícones */}
      <View
        style={[
          estilos.barraNavegacao,
          { backgroundColor: surfaceElevated, borderTopColor: border },
        ]}
      >
        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navegar('Principal')}
        >
          <Ionicons
            name="home-outline"
            size={29}
            color={primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navegar('Buscar')}
        >
          <Ionicons
            name="search-outline"
            size={29}
            color={primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navegar('MinhaLista')}
        >
          <Ionicons
            name="list-outline"
            size={29}
            color={primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navegar('ConteudosAvaliados')}
        >
          <Feather
            name="check"
            size={29}
            color={primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navegar('Perfil')}
        >
          <Ionicons
            name="person-outline"
            size={29}
            color={primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  areaSuperior: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 0,
    position: 'relative',
  },

  imagem_inicial: {
    width: 250,
    height: 105,
    marginTop: 0,
  },

  secaoAviso: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  iconePipoca: {
    width: 85,
    height: 85,
  },

  frases: {
    flex: 1,
    marginLeft: 5,
  },

  textoAviso: {
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

  cartaoFilme: {
    width: 96,
  },

  containerPoster: {
    position: 'relative',
    width: 96,
    height: 146,
    borderRadius: 10,
    overflow: 'hidden',
  },

  posterFilme: {
    width: 96,
    height: 146,
    borderRadius: 10,
  },

  sobreposicaoBloqueio: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoAcao: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    width: 30,
    height: 28,
    marginTop: 6,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemVazia: {
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

  botaoVoltar: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});