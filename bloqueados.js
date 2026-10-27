import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import {
  getBlockedMovies,
  subscribeToBlockedMovies,
  toggleMovieBlocked,
} from './blockedStore';

export default function BloqueadosScreen({ navigation, route, voltar }) {
  const { apelido, senha } = route?.params || {};
  const voltarParaPerfil = () => {
    if (typeof voltar === 'function') {
      voltar();
      return;
    }

    if (navigation) {
      navigation.navigate('Perfil', { apelido, senha });
      return;
    }
  };

  const irParaPrincipal = () => navigation?.navigate('Principal', { apelido, senha });
  const irParaMinhaLista = () => navigation?.navigate('MinhaLista', { apelido, senha });
  const irParaConteudosAvaliados = () => navigation?.navigate('ConteudosAvaliados', { apelido, senha });
  const irParaPerfil = () => navigation?.navigate('Perfil', { apelido, senha });

  const [pesquisa, setPesquisa] = useState('');
  const [filmes, setFilmes] = useState(getBlockedMovies());

  useEffect(() => subscribeToBlockedMovies(setFilmes), []);

  const filmesFiltrados = filmes.filter((filme) =>
    (filme.title || filme.original_title || filme.nome || '')
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <View style={estilos.conteiner}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          activeOpacity={0.7}
          onPress={voltarParaPerfil}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#a855f7"
          />
        </TouchableOpacity>

        <Image
          source={require('./assets/PopMovielogo.png')}
          style={estilos.logoCabecalho}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={estilos.conteudoRolagem}
      >
        <View style={estilos.secaoAviso}>
          <Image
            style={estilos.iconePipoca}
            source={require('./assets/pbl.png')}
            resizeMode="cover"
          />

          <Text style={estilos.textoAviso}>
            Estes itens estão bloqueados.{'\n'}
            Desbloqueie-os para sorteá-los.
          </Text>
        </View>

        <View style={estilos.caixaPesquisa}>
          <TextInput
            style={estilos.campoPesquisa}
            placeholder="Pesquisar filmes..."
            placeholderTextColor="#6b7280"
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          <Ionicons
            name="search"
            size={20}
            color="#a855f7"
          />
        </View>

        <FlatList
          data={filmesFiltrados}
          keyExtractor={(item) => String(item.id)}
          numColumns={3}
          columnWrapperStyle={estilos.columnWrapper}
          contentContainerStyle={estilos.listaFilmes}
          scrollEnabled={false}
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
                accessibilityLabel={`Abrir detalhes de ${item.title || item.original_title || item.nome || 'filme'}`}
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
                      color="#a855f7"
                    />
                  </View>
                </View>
              </TouchableOpacity>

            <TouchableOpacity
                style={[estilos.botaoAcao, { backgroundColor: '#22c55e' }]}
                onPress={() => toggleMovieBlocked(item)}
              >
                <Ionicons
                  name="lock-open-outline"
                  size={18}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={estilos.mensagemVazia}>Nenhum filme encontrado.</Text>
          }
        />
      </ScrollView>

      <View style={estilos.barraNavegacao}>
        <TouchableOpacity style={estilos.itemNav} onPress={irParaPrincipal}>
          <Ionicons name="home-outline" size={24} color="#a855f7" />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemNav} onPress={irParaMinhaLista}>
          <Ionicons name="list-outline" size={24} color="#a855f7" />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemNav} onPress={irParaConteudosAvaliados}>
          <Feather name="check" size={24} color="#a855f7" />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemNav} onPress={irParaPerfil}>
          <Ionicons name="person-outline" size={24} color="#a855f7" />
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
    marginBottom: 16,
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

  logoCabecalho: {
    width: 140,
    height: 40,
  },

  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  secaoAviso: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121215',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222226',
    padding: 12,
    marginBottom: 30,
  },

  iconePipoca: {
    width: 100,
    height: 100,
    marginRight: 12,
  },

  textoAviso: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
  },

  caixaPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 24,
  },

  campoPesquisa: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
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
    marginBottom: 16,
  },

  containerPoster: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },

  posterFilme: {
    width: '100%',
    height: 150,
  },

  sobreposicaoBloqueio: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoAcao: {
    borderRadius: 8,
    minHeight: 32,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemVazia: {
    color: '#ffffff',
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
});
