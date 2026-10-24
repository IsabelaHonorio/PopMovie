import React, { useState } from 'react';
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

import AlterarSenha from './alterar_senha';
import Bloqueados from './bloqueados';
import AlterarAvatar from './alterar_avatar';
import AlterarTema from './Alterar_tema';

const favoritosIniciais = [
  { id: '1', imagem: 'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: '2', imagem: 'https://image.tmdb.org/t/p/w200/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg' },
  { id: '3', imagem: 'https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
  { id: '4', imagem: 'https://image.tmdb.org/t/p/w200/7fn624j5lj3xTme2SgiLCeuedmO.jpg' },
];

export default function PerfilScreen({ navigation, route }) {
  const { apelido, senha } = route.params || {};
  const [telaAtual, setTelaAtual] = useState('Perfil');

  const [filmesFavoritos, setFilmesFavoritos] = useState(favoritosIniciais);

  const [fotoPerfil, setFotoPerfil] = useState(
    require('./assets/avatar/6.png')
  );

  function desfavoritar(id) {
    setFilmesFavoritos((anteriores) =>
      anteriores.filter((filme) => filme.id !== id)
    );
  }

  // CONEXÃO COM AS OUTRAS TELAS
  if (telaAtual === 'AlterarSenha') {
    return (
      <AlterarSenha
        voltar={() => setTelaAtual('Perfil')}
      />
    );
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

  // TELA DE PERFIL
  return (
    <View style={estilos.conteiner}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      {/* CABEÇALHO */}
      <View style={estilos.cabecalho}>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Principal', { apelido, senha })}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#a855f7"
          />
        </TouchableOpacity>

        <Image
          source={require('./assets/PopMovielogo.png')}
          style={estilos.imagem}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estilos.conteudoRolagem}
      >
        {/* PERFIL DO PEDRO */}
        <View style={estilos.secaoPerfil}>
          <Image
            source={fotoPerfil}
            style={estilos.fotoPerfil}
          />

          <View style={estilos.infoPerfil}>
            <Text style={estilos.saudacao}>
              Olá, {apelido || 'Pedro'}!
            </Text>

            {/* LÁPIS PARA ALTERAR AVATAR */}
            <TouchableOpacity
              onPress={() => setTelaAtual('AlterarAvatar')}
              activeOpacity={0.7}
              style={estilos.iconeMargem}
            >
              <Feather
                name="edit-2"
                size={18}
                color="#a855f7"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* OPÇÕES DE CONFIGURAÇÃO */}
        <View style={estilos.listaOpcoes}>

          {/* ALTERAR SENHA */}
          <TouchableOpacity
            style={estilos.itemOpcao}
            activeOpacity={0.7}
            onPress={() => setTelaAtual('AlterarSenha')}
          >
            <Text style={estilos.textoOpcao}>
              Alterar senha
            </Text>

            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
            />
          </TouchableOpacity>

          {/* ALTERAR TEMA */}
          <TouchableOpacity
            style={estilos.itemOpcao}
            activeOpacity={0.7}
            onPress={() => setTelaAtual('AlterarTema')}
          >
            <Text style={estilos.textoOpcao}>
              Alterar tema
            </Text>

            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
            />
          </TouchableOpacity>

          {/* CONTEÚDOS BLOQUEADOS */}
          <TouchableOpacity
            style={estilos.itemOpcao}
            activeOpacity={0.7}
            onPress={() => setTelaAtual('Bloqueados')}
          >
            <Text style={estilos.textoOpcao}>
              Conteúdos bloqueados
            </Text>

            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
            />
          </TouchableOpacity>

        </View>

        {/* FAVORITOS */}
        <Text style={estilos.tituloSecao}>
          Favoritos
        </Text>

        <FlatList
          data={filmesFavoritos}
          keyExtractor={(item) => item.id}
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
              <Image
                source={{ uri: item.imagem }}
                style={estilos.posterFilme}
              />

              <TouchableOpacity
                style={estilos.botaoFavorito}
                onPress={() => desfavoritar(item.id)}
                activeOpacity={0.7}
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

      {/* BARRA INFERIOR */}
      <View style={estilos.barraNavegacao}>
        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Principal', { apelido, senha })}
        >
          <Ionicons
            name="home-outline"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MinhaLista', { apelido, senha })}
        >
          <Ionicons
            name="list-outline"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ConteudosAvaliados', { apelido, senha })}
        >
          <Feather
            name="check"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNav}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Perfil', { apelido, senha })}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 10,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  botaoVoltar: {
    width: 38,
    height: 38,
    backgroundColor: '#121215',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222226',
    marginRight: 16,
  },

  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  secaoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  fotoPerfil: {
    width: 65,
    height: 65,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#a855f7',
    marginRight: 16,
  },

  infoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  saudacao: {
    color: '#a855f7',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },

  iconeMargem: {
    marginLeft: 4,
    padding: 5,
  },

  listaOpcoes: {
    marginBottom: 28,
  },

  itemOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  textoOpcao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },

  tituloSecao: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  listaFilmes: {
    paddingBottom: 10,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  cartaoFilme: {
    width: '31%',
    marginBottom: 8,
  },

  posterFilme: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
  },

  botaoFavorito: {
    backgroundColor: '#a855f7',
    borderRadius: 8,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemVazia: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },

  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0a0a0c',
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
    height: 60,
  },

  itemNav: {
    padding: 10,
  },

  imagem: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginTop: -10,
  },
});
