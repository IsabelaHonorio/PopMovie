import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from './theme';

const API_KEY = '0d335050c2cc3308096c03300829a424';

const mapaGeneros = {
  'Ação': 28,
  'Aventura': 12,
  'Animação': 16,
  'Comédia': 35,
  'Drama': 18,
  Terror: 27,
  Suspense: 53,
  Fantasia: 14,
  'Ficção Científica': 878,
  Romance: 10749,
  Crime: 80,
  Documentário: 99,
};

export default function ConteudoSorteado() {
  const navigation = useNavigation();
  const route = useRoute();
  const filtros = route.params?.filtros || {};
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filmesJaMostrados, setFilmesJaMostrados] = useState([]);

  const voltar = () => navigation.goBack();

  useEffect(() => {
    setFilmesJaMostrados([]);
    setFilme(null);
    setErro('');
  }, [route.params?.filtros]);

  const buscarFilmeAleatorio = async () => {
    try {
      setCarregando(true);
      setErro('');

      const params = new URLSearchParams({
        api_key: API_KEY,
        language: 'pt-BR',
        sort_by: 'popularity.desc',
      });

      if (filtros.generos && filtros.generos.length > 0) {
        params.append('with_genres', filtros.generos.map(g => mapaGeneros[g]).join('|'));
      }

      if (filtros.ano && filtros.ano !== 'Todos') {
        if (filtros.ano === 'Antes de 2000') {
          params.append('primary_release_date.lte', '1999-12-31');
        } else if (filtros.ano === '2025+') {
          params.append('primary_release_date.gte', '2025-01-01');
        } else {
          const [inicio, fim] = filtros.ano.split(' - ');
          if (inicio && fim) {
            params.append('primary_release_date.gte', `${inicio}-01-01`);
            params.append('primary_release_date.lte', `${fim}-12-31`);
          }
        }
      }

      if (filtros.duracao && filtros.duracao !== 'Qualquer duração') {
        const regras = {
          'Até 1h': { max: 60 },
          '1h - 1h30': { min: 60, max: 90 },
          '1h30 - 2h': { min: 90, max: 120 },
          '2h - 2h30': { min: 120, max: 150 },
          '2h30+': { min: 150 },
        };

        const regra = regras[filtros.duracao];
        if (regra?.min) params.append('with_runtime.gte', String(regra.min));
        if (regra?.max) params.append('with_runtime.lte', String(regra.max));
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
      );

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error('Nenhum filme encontrado com esses filtros.');
      }

      const filmesDisponiveis = data.results.filter(
        item => !filmesJaMostrados.includes(item.id)
      );

      if (filmesDisponiveis.length === 0) {
        throw new Error('Não há mais filmes novos para esses filtros nesta sessão.');
      }

      const filmeAleatorio = filmesDisponiveis[Math.floor(Math.random() * filmesDisponiveis.length)];

      const detalhesResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${filmeAleatorio.id}?api_key=${API_KEY}&language=pt-BR`
      );

      const detalhes = await detalhesResponse.json();
      setFilme(detalhes);
      setFilmesJaMostrados(prev => [...prev, filmeAleatorio.id]);
    } catch (error) {
      console.error(error);
      setErro('Não foi possível carregar um filme com esses filtros. Tente outra combinação.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarFilmeAleatorio();
  }, [route.params?.filtros]);

  const poster = filme?.poster_path
    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
    : null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoVoltar} onPress={voltar}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </Pressable>

      <View style={styles.conteudo}>
        <Image
          style={styles.image}
          source={require('./assets/PopMovielogo.png')}
          resizeMode="contain"
        />

        {carregando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Sorteando filme...</Text>
          </View>
        ) : erro ? (
          <View style={styles.loadingBox}>
            <Text style={styles.erroText}>{erro}</Text>
          </View>
        ) : (
          <>
            <View style={styles.containerPoster}>
              {poster ? (
                <Image
                  style={styles.poster}
                  source={{ uri: poster }}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.posterFallback}>
                  <Text style={styles.posterFallbackText}>Sem poster</Text>
                </View>
              )}
            </View>

            <Text style={styles.title}>{filme.title}</Text>
            <Text style={styles.subtitle}>
              {filme.release_date ? filme.release_date.slice(0, 4) : 'Sem ano'}
              {' · '}
              {filme.runtime ? `${filme.runtime} min` : 'Sem duração'}
            </Text>

            <Text style={styles.overview} numberOfLines={5}>
              {filme.overview || 'Descrição indisponível para este filme.'}
            </Text>

            <Text style={styles.meta}>
              Nota: {filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'}
            </Text>
          </>
        )}

        <Pressable style={styles.botaoSortear} onPress={buscarFilmeAleatorio}>
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
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },

  botaoVoltar: {
    position: 'absolute',
    top: 28,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },

  textoVoltar: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },

  conteudo: {
    alignItems: 'center',
    width: '100%',
    marginTop: 32,
  },

  image: {
    width: 200,
    height: 100,
  },

  containerPoster: {
    width: 280,
    height: 380,
    borderRadius: 22,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: '#1b1b1b',
  },

  poster: {
    width: '100%',
    height: '100%',
  },

  posterFallback: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    justifyContent: 'center',
    alignItems: 'center',
  },

  posterFallbackText: {
    color: COLORS.text,
    fontSize: 18,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '700',
  },

  subtitle: {
    color: '#d3d3d3',
    fontSize: 14,
    marginTop: 4,
  },

  overview: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 8,
  },

  meta: {
    color: '#f0dfff',
    fontSize: 15,
    marginTop: 10,
    fontWeight: '600',
  },

  botaoSortear: {
    backgroundColor: COLORS.primary,
    width: '90%',
    padding: 12,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 26,
  },

  textoBotao: {
    color: 'white',
    fontSize: 18,
  },

  loadingBox: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },

  loadingText: {
    color: COLORS.text,
    marginTop: 12,
    fontSize: 16,
  },

  erroText: {
    color: '#ffb4b4',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
