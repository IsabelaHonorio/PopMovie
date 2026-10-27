import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from './theme';
import { isInWatchlist, toggleWatchlist } from './watchlistStore';
import { getMovieRating, setMovieRating } from './evaluatedStore';
import { isMovieBlocked, toggleMovieBlocked } from './blockedStore';
import { isMovieFavorite, toggleFavoriteMovie } from './favoriteMoviesStore';

const API_KEY = '0d335050c2cc3308096c03300829a424';

export default function DetalhesFilme() {
  const navigation = useNavigation();
  const route = useRoute();

  const filmeRecebido = route.params?.filme;
  const idFilme = route.params?.idFilme || filmeRecebido?.id;

  const [filme, setFilme] = useState(filmeRecebido || null);
  const [carregando, setCarregando] = useState(!filmeRecebido);
  const [notaUsuario, setNotaUsuario] = useState(getMovieRating(idFilme));
  const [favoritado, setFavoritado] = useState(isMovieFavorite(idFilme));
  const [naLista, setNaLista] = useState(false);
  const [bloqueado, setBloqueado] = useState(isMovieBlocked(idFilme));

  useEffect(() => {
    setNaLista(isInWatchlist(filme?.id || idFilme));
  }, [filme?.id, idFilme]);

  useEffect(() => {
    setNotaUsuario(getMovieRating(filme?.id || idFilme));
  }, [filme?.id, idFilme]);

  useEffect(() => {
    setBloqueado(isMovieBlocked(filme?.id || idFilme));
  }, [filme?.id, idFilme]);

  useEffect(() => {
    setFavoritado(isMovieFavorite(filme?.id || idFilme));
  }, [filme?.id, idFilme]);

  useEffect(() => {
    const buscarDetalhes = async () => {
      if (!idFilme) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const resposta = await fetch(
          `https://api.themoviedb.org/3/movie/${idFilme}?api_key=${API_KEY}&language=pt-BR`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar o filme.');
        }

        setFilme(dados);
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Erro',
          'Não foi possível carregar os detalhes do filme.'
        );
      } finally {
        setCarregando(false);
      }
    };

    if (idFilme) {
      buscarDetalhes();
    } else {
      setCarregando(false);
    }
  }, [idFilme]);

  const voltar = () => navigation.goBack();

  const navegar = (tela) => {
    navigation.navigate(tela, {
      apelido: route.params?.apelido,
      senha: route.params?.senha,
    });
  };

  const poster = filme?.poster_path
    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
    : null;

  const imagemFundo = filme?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${filme.backdrop_path}`
    : poster;

  const generos = filme?.genres || [];

  const ano = filme?.release_date
    ? filme.release_date.slice(0, 4)
    : '';

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.textoCarregando}>
          Carregando filme...
        </Text>
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={styles.carregando}>
        <Text style={styles.erro}>
          Não foi possível encontrar esse filme.
        </Text>

        <Pressable style={styles.botaoVoltarErro} onPress={voltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* Imagem grande e seta de voltar */}
        <View style={styles.containerImagem}>
          {imagemFundo ? (
            <Image
              source={{ uri: imagemFundo }}
              style={styles.imagemFundo}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.semImagem}>
              <Ionicons
                name="film-outline"
                size={60}
                color={COLORS.primary}
              />
            </View>
          )}

          <Pressable
            style={styles.botaoVoltar}
            onPress={voltar}
          >
            <Ionicons
              name="chevron-back"
              size={42}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        {/* Título e nota */}
        <View style={styles.linhaTitulo}>
          <Text style={styles.titulo}>
            {filme.title || filme.original_title}
          </Text>

          <View style={styles.nota}>
            <Ionicons name="star" size={27} color="#FFD500" />

            <Text style={styles.textoNota}>
              {filme.vote_average
                ? filme.vote_average.toFixed(1)
                : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Estrelas para avaliar */}
        <View style={styles.avaliacoes}>
          {[1, 2, 3, 4, 5].map((estrela) => (
            <Pressable
              key={estrela}
              onPress={() => {
                setMovieRating(filme, estrela);
                setNotaUsuario(estrela);
              }}
            >
              <Ionicons
                name={
                  estrela <= notaUsuario
                    ? 'star'
                    : 'star-outline'
                }
                size={48}
                color={COLORS.primary}
              />
            </Pressable>
          ))}
        </View>

        {/* Gêneros */}
        <View style={styles.generos}>
          <View style={styles.etiqueta}>
            <Text style={styles.textoEtiqueta}>Filme</Text>
          </View>

          {generos.map((genero) => (
            <View key={genero.id} style={styles.etiqueta}>
              <Text style={styles.textoEtiqueta}>
                {genero.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Ano e duração */}
        <Text style={styles.informacoes}>
          {ano}
          {filme.runtime ? `  ·  ${filme.runtime} min` : ''}
        </Text>

        {/* Sinopse */}
        <Text style={styles.sinopse}>
          {filme.overview ||
            'Descrição indisponível para este filme.'}
        </Text>

        {/* Botões de ação */}
        <View style={styles.acoes}>
          <Pressable
            style={styles.botaoAcao}
            onPress={() => {
              const adicionou = toggleWatchlist(filme);
              setNaLista(adicionou);
              Alert.alert(
                'Minha lista',
                adicionou
                  ? 'Filme adicionado à sua lista.'
                  : 'Filme removido da sua lista.'
              );
            }}
          >
            <Ionicons
              name="list"
              size={37}
              color="white"
            />

            <Text style={styles.textoAcao}>
              {naLista ? 'Na lista' : 'Minha lista'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoAcao}
            onPress={() => {
              const ficouBloqueado = toggleMovieBlocked(filme);
              setBloqueado(ficouBloqueado);
              Alert.alert(
                'Bloquear',
                ficouBloqueado
                  ? 'Filme adicionado aos conteúdos bloqueados.'
                  : 'Filme removido dos conteúdos bloqueados.'
              );
            }}
          >
            <Ionicons
              name={bloqueado ? 'lock-open' : 'lock-closed'}
              size={37}
              color="white"
            />

            <Text style={styles.textoAcao}>
              {bloqueado ? 'Desbloquear' : 'Bloquear'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoAcao}
            onPress={() => {
              const ficouFavoritado = toggleFavoriteMovie(filme);
              setFavoritado(ficouFavoritado);
              Alert.alert(
                'Favoritos',
                ficouFavoritado
                  ? 'Filme adicionado aos favoritos.'
                  : 'Filme removido dos favoritos.'
              );
            }}
          >
            <Ionicons
              name={favoritado ? 'heart' : 'heart-outline'}
              size={37}
              color="white"
            />

            <Text style={styles.textoAcao}>
              {favoritado ? 'Favoritado' : 'Favoritar'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Menu inferior */}
      <View style={styles.barraNavegacao}>
        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('Principal')}
        >
          <Ionicons
            name="home-outline"
            size={29}
            color={COLORS.primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('MinhaLista')}
        >
          <Ionicons
            name="list"
            size={29}
            color={COLORS.primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('ConteudosAvaliados')}
        >
          <Feather
            name="check"
            size={32}
            color={COLORS.primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('Perfil')}
        >
          <Ionicons
            name="person-outline"
            size={29}
            color={COLORS.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingBottom: 25,
  },

  containerImagem: {
    width: '100%',
    height: 400,
    backgroundColor: '#171717',
  },

  imagemFundo: {
    width: '100%',
    height: '100%',
  },

  semImagem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoVoltar: {
    position: 'absolute',
    top: 65,
    left: 18,
    zIndex: 2,
  },

  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
  },

  titulo: {
    color: 'white',
    fontSize: 29,
    flex: 1,
    marginRight: 8,
  },

  nota: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  textoNota: {
    color: 'white',
    fontSize: 23,
  },

  avaliacoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 40,
    paddingHorizontal: 15,
  },

  generos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 30,
    gap: 12,
    marginBottom: 15,
  },

  etiqueta: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 18,
  },

  textoEtiqueta: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },

  informacoes: {
    color: '#bdbdbd',
    fontSize: 16,
    marginHorizontal: 30,
    marginTop: 5,
  },

  sinopse: {
    color: 'white',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'justify',
    marginHorizontal: 30,
    marginTop: 30,
  },

  acoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 55,
    marginBottom: 25,
    gap: 12,
  },

  botaoAcao: {
    flex: 1,
    minHeight: 105,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },

  textoAcao: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },

  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#202020',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#292929',
  },

  itemNav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  carregando: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoCarregando: {
    color: 'white',
    marginTop: 12,
    fontSize: 16,
  },

  erro: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 25,
  },

  botaoVoltarErro: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },

  textoBotaoVoltar: {
    color: 'white',
    fontSize: 16,
  },
});