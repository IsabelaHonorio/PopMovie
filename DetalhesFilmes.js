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
import { COLORS, useTheme } from './theme';
import { isInWatchlist, toggleWatchlist } from './watchlistStore';
import { getMovieRating, setMovieRating } from './evaluatedStore';
import { isMovieBlocked, toggleMovieBlocked } from './blockedStore';
import { isMovieFavorite, toggleFavoriteMovie } from './favoriteMoviesStore';

const API_KEY = '0d335050c2cc3308096c03300829a424';

export default function DetalhesFilme() {
  const {
    background,
    border,
    primary,
    surfaceElevated,
    text,
    textSoft,
  } = useTheme();
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
      <View style={[styles.carregando, { backgroundColor: background }]}>
        <ActivityIndicator size="large" color={primary} />
        <Text style={[styles.textoCarregando, { color: text }]}>
          Carregando filme...
        </Text>
      </View>
    );
  }

  if (!filme) {
    return (
      <View style={[styles.carregando, { backgroundColor: background }]}>
        <Text style={[styles.erro, { color: text }]}>
          Não foi possível encontrar esse filme.
        </Text>

        <Pressable
          style={[styles.botaoVoltarErro, { backgroundColor: primary }]}
          onPress={voltar}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
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
                color={primary}
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
              color={primary}
            />
          </Pressable>
        </View>

        {/* Título e nota */}
        <View style={styles.linhaTitulo}>
          <Text style={[styles.titulo, { color: text }]}>
            {filme.title || filme.original_title}
          </Text>

          <View style={styles.nota}>
            <Ionicons name="star" size={27} color="#FFD500" />

            <Text style={[styles.textoNota, { color: text }]}>
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
              accessibilityRole="button"
              accessibilityLabel={`Avaliar com ${estrela} ${estrela === 1 ? 'estrela' : 'estrelas'}`}
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
                color={primary}
              />
            </Pressable>
          ))}
        </View>
        {notaUsuario > 0 && (
          <Pressable
            style={styles.removerAvaliacao}
            accessibilityRole="button"
            accessibilityLabel="Remover avaliação"
            onPress={() => {
              setMovieRating(filme, 0);
              setNotaUsuario(0);
            }}
          >
            <Text style={[styles.textoRemoverAvaliacao, { color: textSoft }]}>
              Remover avaliação
            </Text>
          </Pressable>
        )}

        {/* Gêneros */}
        <View style={styles.generos}>
          <View style={[styles.etiqueta, { borderColor: primary }]}>
            <Text style={[styles.textoEtiqueta, { color: text }]}>Filme</Text>
          </View>

          {generos.map((genero) => (
            <View
              key={genero.id}
              style={[styles.etiqueta, { borderColor: primary }]}
            >
              <Text style={[styles.textoEtiqueta, { color: text }]}>
                {genero.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Ano e duração */}
        <Text style={[styles.informacoes, { color: textSoft }]}>
          {ano}
          {filme.runtime ? `  ·  ${filme.runtime} min` : ''}
        </Text>

        {/* Sinopse */}
        <Text style={[styles.sinopse, { color: text }]}>
          {filme.overview ||
            'Descrição indisponível para este filme.'}
        </Text>

        {/* Botões de ação */}
        <View style={styles.acoes}>
          <Pressable
            style={[styles.botaoAcao, { borderColor: primary }]}
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
              color={text}
            />

            <Text style={[styles.textoAcao, { color: text }]}>
              {naLista ? 'Na lista' : 'Minha lista'}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.botaoAcao, { borderColor: primary }]}
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
              color={text}
            />

            <Text style={[styles.textoAcao, { color: text }]}>
              {bloqueado ? 'Desbloquear' : 'Bloquear'}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.botaoAcao, { borderColor: primary }]}
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
              color={text}
            />

            <Text style={[styles.textoAcao, { color: text }]}>
              {favoritado ? 'Favoritado' : 'Favoritar'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Menu inferior */}
      <View
        style={[
          styles.barraNavegacao,
          { backgroundColor: surfaceElevated, borderTopColor: border },
        ]}
      >
        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('Principal')}
          accessibilityRole="button"
          accessibilityLabel="Início"
        >
          <Ionicons
            name="home-outline"
            size={29}
            color={primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('Buscar')}
          accessibilityRole="button"
          accessibilityLabel="Buscar"
        >
          <Ionicons
            name="search-outline"
            size={29}
            color={primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('MinhaLista')}
          accessibilityRole="button"
          accessibilityLabel="Minha lista"
        >
          <Ionicons
            name="list"
            size={29}
            color={primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('ConteudosAvaliados')}
          accessibilityRole="button"
          accessibilityLabel="Conteúdos avaliados"
        >
          <Feather
            name="check"
            size={32}
            color={primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('Perfil')}
          accessibilityRole="button"
          accessibilityLabel="Perfil"
        >
          <Ionicons
            name="person-outline"
            size={29}
            color={primary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  removerAvaliacao: {
    alignSelf: 'center',
    marginTop: -28,
    marginBottom: 28,
    padding: 8,
  },

  textoRemoverAvaliacao: {
    fontSize: 14,
    textDecorationLine: 'underline',
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
    height: 65,
    borderTopWidth: 1,
  },

  itemNav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoCarregando: {
    marginTop: 12,
    fontSize: 16,
  },

  erro: {
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
    fontSize: 16,
  },
});