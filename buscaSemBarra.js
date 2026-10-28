import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './theme';
import {
  getFavoriteMovies,
  toggleFavoriteMovie,
} from './favoriteMoviesStore';

const API_KEY = '0d335050c2cc3308096c03300829a424';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

export default function BuscaSemBarra({ navigation, route }) {
  const {
    background,
    border,
    primary,
    surface,
    text,
    textSoft,
  } = useTheme();

  const { slotIndex } = route?.params || {};
  const [busca, setBusca] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);
  const solicitacaoRef = useRef(0);

  useEffect(() => {
    const consulta = busca.trim();
    const solicitacao = solicitacaoRef.current + 1;
    solicitacaoRef.current = solicitacao;

    if (consulta.length < 2) {
      setFilmes([]);
      setErro('');
      setCarregando(false);
      return undefined;
    }

    setCarregando(true);
    setErro('');

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          api_key: API_KEY,
          language: 'pt-BR',
          query: consulta,
          include_adult: 'false',
          page: '1',
        });

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?${params.toString()}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message || 'Não foi possível buscar filmes.'
          );
        }

        if (solicitacao === solicitacaoRef.current) {
          setFilmes(data.results || []);
        }
      } catch (error) {
        if (
          error.name !== 'AbortError' &&
          solicitacao === solicitacaoRef.current
        ) {
          console.error(error);
          setErro(
            error.message || 'Não foi possível buscar filmes. Tente novamente.'
          );
          setFilmes([]);
        }
      } finally {
        if (solicitacao === solicitacaoRef.current) {
          setCarregando(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [busca, tentativa]);

  const selecionarFilme = (filme) => {
    const filmeFavorito = {
      id: filme.id,
      title: filme.title || filme.original_title,
      poster: filme.poster_path
        ? `${IMAGE_BASE_URL}${filme.poster_path}`
        : null,
      year: filme.release_date ? filme.release_date.slice(0, 4) : 'Ano não informado',
      rating: filme.vote_average ? filme.vote_average.toFixed(1) : 'Sem nota',
    };

    const jaFavorito = getFavoriteMovies().some(
      (item) => String(item.id) === String(filme.id)
    );

    if (!jaFavorito) {
      toggleFavoriteMovie(filmeFavorito);
    }

    navigation.navigate('CadastroFavoritos', {
      selectedMovie: filmeFavorito,
      slotIndex,
      ...(route?.params || {}),
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]}>
      <StatusBar
        barStyle={background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={background}
      />

      <View style={[styles.screen, { backgroundColor: background }]}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons name="chevron-back" size={30} color={primary} />
          </Pressable>

          <Image
            source={require('./assets/PopMovielogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.heading, { color: text }]}>Buscar filmes</Text>

        <View
          style={[
            styles.searchBar,
            { borderColor: primary, backgroundColor: surface },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color={primary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: text }]}
            placeholder="Digite o nome de um filme"
            placeholderTextColor={textSoft}
            value={busca}
            onChangeText={setBusca}
            selectionColor={primary}
            returnKeyType="search"
            autoCorrect={false}
            accessibilityLabel="Buscar filmes"
          />
          {busca.length > 0 && (
            <Pressable
              onPress={() => setBusca('')}
              accessibilityRole="button"
              accessibilityLabel="Limpar busca"
              hitSlop={8}
            >
              <Ionicons name="close-circle" size={21} color={textSoft} />
            </Pressable>
          )}
        </View>

        <ScrollView
          style={styles.movieScroll}
          contentContainerStyle={styles.movieList}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {busca.trim().length < 2 ? (
            <View style={styles.feedback}>
              <Ionicons name="film-outline" size={40} color={primary} />
              <Text style={[styles.feedbackText, { color: textSoft }]}>
                Digite pelo menos 2 caracteres para buscar.
              </Text>
            </View>
          ) : carregando ? (
            <View style={styles.feedback}>
              <ActivityIndicator size="large" color={primary} />
              <Text style={[styles.feedbackText, { color: textSoft }]}>
                Buscando filmes...
              </Text>
            </View>
          ) : erro ? (
            <View style={styles.feedback}>
              <Text style={[styles.feedbackText, { color: textSoft }]}>
                {erro}
              </Text>
              <Pressable
                style={[styles.retryButton, { backgroundColor: primary }]}
                onPress={() => setTentativa((valor) => valor + 1)}
              >
                <Text style={styles.retryText}>Tentar novamente</Text>
              </Pressable>
            </View>
          ) : filmes.length === 0 ? (
            <View style={styles.feedback}>
              <Text style={[styles.feedbackText, { color: textSoft }]}>
                Nenhum filme encontrado para “{busca.trim()}”.
              </Text>
            </View>
          ) : (
            filmes.map((filme) => {
              const poster = filme.poster_path
                ? `${IMAGE_BASE_URL}${filme.poster_path}`
                : null;
              const ano = filme.release_date
                ? filme.release_date.slice(0, 4)
                : 'Ano não informado';

              return (
                <Pressable
                  key={filme.id}
                  style={[
                    styles.movieCard,
                    { borderColor: primary, backgroundColor: surface },
                  ]}
                  onPress={() => selecionarFilme(filme)}
                  accessibilityRole="button"
                  accessibilityLabel={`Selecionar ${filme.title || filme.original_title}`}
                >
                  {poster ? (
                    <Image
                      source={{ uri: poster }}
                      style={styles.poster}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.posterFallback}>
                      <Ionicons name="film-outline" size={32} color={primary} />
                    </View>
                  )}

                  <View style={styles.movieInfo}>
                    <Text
                      style={[styles.movieTitle, { color: text }]}
                      numberOfLines={2}
                    >
                      {filme.title || filme.original_title}
                    </Text>
                    <Text style={[styles.movieYear, { color: textSoft }]}>{ano}</Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={17} color="#FFD400" />
                      <Text style={[styles.ratingText, { color: text }]}>
                        {filme.vote_average
                          ? filme.vote_average.toFixed(1)
                          : 'Sem nota'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
    paddingTop: 8,
  },

  header: {
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 1,
    padding: 4,
  },

  logo: {
    width: 180,
    height: 75,
  },

  heading: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 18,
  },

  searchBar: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 14,
  },

  searchIcon: {
    marginRight: 11,
  },

  searchInput: {
    flex: 1,
    minWidth: 0,
    height: 52,
    fontSize: 16,
    paddingHorizontal: 0,
  },

  movieScroll: {
    flex: 1,
  },

  movieList: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 30,
    gap: 13,
  },

  feedback: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 36,
    gap: 12,
  },

  feedbackText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21,
  },

  retryButton: {
    minHeight: 42,
    borderRadius: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  movieCard: {
    minHeight: 126,
    borderWidth: 1,
    borderRadius: 17,
    backgroundColor: '#121215',
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  poster: {
    width: 75,
    height: 108,
    borderRadius: 10,
    backgroundColor: '#242424',
  },

  posterFallback: {
    width: 75,
    height: 108,
    borderRadius: 10,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },

  movieInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    marginLeft: 13,
    marginRight: 5,
  },

  movieTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  movieYear: {
    fontSize: 14,
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  ratingText: {
    fontSize: 14,
  },
});
