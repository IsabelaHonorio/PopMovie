import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS, commonStyles } from './theme';

import AlterarSenha from './alterar_senha';
import Bloqueados from './bloqueados';
import AlterarAvatar from './alterar_avatar';
import AlterarTema from './Alterar_tema';
import {
  getFavoriteMovies,
  subscribeToFavoriteMovies,
  toggleFavoriteMovie,
} from './favoriteMoviesStore';

export default function PerfilScreen({ navigation, route }) {
  const { apelido, senha } = route.params || {};

  const [telaAtual, setTelaAtual] = useState('Perfil');
  const [filmesFavoritos, setFilmesFavoritos] = useState(getFavoriteMovies());

  useEffect(() => subscribeToFavoriteMovies(setFilmesFavoritos), []);

  const [fotoPerfil, setFotoPerfil] = useState(
    require('./assets/avatar/6.png')
  );

  // CONEXÃO COM AS OUTRAS TELAS
  if (telaAtual === 'AlterarSenha') {
    return <AlterarSenha voltar={() => setTelaAtual('Perfil')} />;
  }

  if (telaAtual === 'Bloqueados') {
    return (
      <Bloqueados
        navigation={navigation}
        route={route}
        voltar={() => setTelaAtual('Perfil')}
      />
    );
  }

  if (telaAtual === 'AlterarAvatar') {
    return (
      <AlterarAvatar
        voltar={() => setTelaAtual('Perfil')}
        fotoPerfil={fotoPerfil}
        setFotoPerfil={setFotoPerfil}
      />
    );
  }

  if (telaAtual === 'AlterarTema') {
    return (
      <AlterarTema
        navigation={navigation}
        route={route}
        voltar={() => setTelaAtual('Perfil')}
      />
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      {/* LOGO PADRONIZADA */}
      <View style={estilos.areaSuperior}>
        <Image
          source={require('./assets/PopMovielogo.png')}
          style={estilos.imagem_inicial}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estilos.conteudoRolagem}
      >
        {/* PERFIL */}
        <View style={estilos.secaoPerfil}>
          <Image
            source={fotoPerfil}
            style={estilos.fotoPerfil}
          />

          <View style={estilos.infoPerfil}>
            <Text style={estilos.saudacao}>
              Olá, {apelido || 'Fulano'}!
            </Text>

            <TouchableOpacity
              onPress={() => setTelaAtual('AlterarAvatar')}
              activeOpacity={0.7}
              style={estilos.botaoEditar}
              accessibilityLabel="Alterar avatar"
            >
              <Feather
                name="edit-2"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* OPÇÕES DE CONFIGURAÇÃO */}
        <View style={estilos.listaOpcoes}>
          <TouchableOpacity
            style={estilos.itemOpcao}
            activeOpacity={0.7}
            onPress={() => setTelaAtual('AlterarSenha')}
          >
            <Text style={estilos.textoOpcao}>Alterar senha</Text>

            <View style={estilos.acaoOpcao}>
              <Feather
                name="edit-2"
                size={15}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.itemOpcao}
            activeOpacity={0.7}
            onPress={() => setTelaAtual('AlterarTema')}
          >
            <Text style={estilos.textoOpcao}>Alterar tema</Text>

            <View style={estilos.acaoOpcao}>
              <Feather
                name="edit-2"
                size={15}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.itemOpcao}
            activeOpacity={0.7}
            onPress={() => setTelaAtual('Bloqueados')}
          >
            <Text style={estilos.textoOpcao}>
              Conteúdos bloqueados
            </Text>

            <View style={estilos.acaoOpcao}>
              <Feather
                name="edit-2"
                size={15}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* FILMES FAVORITOS */}
        <Text style={estilos.tituloSecao}>Favoritos</Text>

        <FlatList
          data={filmesFavoritos}
          keyExtractor={(item) => String(item.id)}
          numColumns={3}
          columnWrapperStyle={estilos.columnWrapper}
          contentContainerStyle={estilos.listaFilmes}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={estilos.mensagemVazia}>
              Você ainda não tem filmes favoritos.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={estilos.cartaoFilme}>
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
                accessibilityLabel={`Abrir detalhes de ${item.title || item.original_title || item.nome || 'filme'}`}
              >
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : item.imagem,
                  }}
                  style={estilos.posterFilme}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.botaoFavorito}
                onPress={() => toggleFavoriteMovie(item)}
                activeOpacity={0.7}
                accessibilityLabel={`Remover ${item.title || item.original_title || item.nome || 'filme'} dos favoritos`}
              >
                <Ionicons
                  name="heart"
                  size={18}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO INFERIOR */}
      <View style={estilos.barraNavegacao}>
        <TouchableOpacity
          style={estilos.itemNav}
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
          style={estilos.itemNav}
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
          style={estilos.itemNav}
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
          style={estilos.itemNav}
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
          style={estilos.itemNav}
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

const estilos = StyleSheet.create({
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

  conteudoRolagem: {
    paddingHorizontal: 15,
    paddingBottom: 85,
  },

  secaoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 28,
    padding: 16,
  },

  fotoPerfil: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 16,
  },

  infoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },

  saudacao: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 0,
  },

  botaoEditar: {
    marginLeft: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#21172e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listaOpcoes: {
    marginBottom: 30,
    gap: 10,
  },

  itemOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingVertical: 13,
    paddingHorizontal: 15,
    minHeight: 50,
  },

  textoOpcao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  acaoOpcao: {
    marginLeft: 10,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#21172e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tituloSecao: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 2,
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
    height: 146,
    position: 'relative',
    marginBottom: 0,
  },

  posterFilme: {
    width: 96,
    height: 146,
    borderRadius: 10,
  },

  botaoFavorito: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemVazia: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
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