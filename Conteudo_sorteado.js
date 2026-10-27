import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from './theme';
import { getBlockedMovies } from './blockedStore';

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

  const { height } = useWindowDimensions();

  const filtros = route.params?.filtros || {};
  const apelido = route.params?.apelido;
  const senha = route.params?.senha;
  const filtrosKey = JSON.stringify(filtros);

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const solicitacaoRef = useRef(0);
  const sorteioRef = useRef({
    filtrosKey: '',
    filmesJaMostrados: new Set(),
    paginasVisitadas: new Set(),
    totalPaginas: 0,
    primeiraPagina: null,
  });

  const voltar = () => navigation.goBack();

  const navegar = (tela) => {
    navigation.navigate(tela, { apelido, senha });
  };

  useEffect(() => {
    sorteioRef.current = {
      filtrosKey,
      filmesJaMostrados: new Set(),
      paginasVisitadas: new Set(),
      totalPaginas: 0,
      primeiraPagina: null,
    };
    setFilme(null);
    setErro('');
  }, [filtrosKey]);

  const buscarFilmeAleatorio = async () => {
    const solicitacao = solicitacaoRef.current + 1;
    solicitacaoRef.current = solicitacao;

    try {
      setCarregando(true);
      setErro('');

      let sorteio = sorteioRef.current;
      if (sorteio.filtrosKey !== filtrosKey) {
        sorteio = {
          filtrosKey,
          filmesJaMostrados: new Set(),
          paginasVisitadas: new Set(),
          totalPaginas: 0,
          primeiraPagina: null,
        };
        sorteioRef.current = sorteio;
      }

      const carregarPagina = async (pagina) => {
        const params = new URLSearchParams({
          api_key: API_KEY,
          language: 'pt-BR',
          sort_by: 'popularity.desc',
          page: String(pagina),
        });

        if (filtros.generos && filtros.generos.length > 0) {
          params.append(
            'with_genres',
            filtros.generos.map(g => mapaGeneros[g]).join('|')
          );
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

          if (regra?.min) {
            params.append('with_runtime.gte', String(regra.min));
          }

          if (regra?.max) {
            params.append('with_runtime.lte', String(regra.max));
          }
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Não foi possível buscar filmes com esses filtros.');
        }

        return data;
      };

      if (!sorteio.totalPaginas) {
        const data = await carregarPagina(1);
        sorteio.totalPaginas = Math.min(data.total_pages || 1, 500);
        sorteio.primeiraPagina = data;
      }

      const bloqueados = new Set(
        getBlockedMovies().map((item) => String(item.id))
      );
      const repetidosDisponiveis = [];
      let filmeAleatorio = null;
      const maxTentativas = Math.min(sorteio.totalPaginas, 10);

      for (let tentativa = 0; tentativa < maxTentativas; tentativa += 1) {
        let paginasDisponiveis = Array.from(
          { length: sorteio.totalPaginas },
          (_, index) => index + 1
        ).filter((pagina) => !sorteio.paginasVisitadas.has(pagina));

        if (paginasDisponiveis.length === 0) {
          sorteio.paginasVisitadas.clear();
          paginasDisponiveis = Array.from(
            { length: sorteio.totalPaginas },
            (_, index) => index + 1
          );
        }

        const indicePagina = Math.floor(Math.random() * paginasDisponiveis.length);
        const pagina = paginasDisponiveis[indicePagina];
        sorteio.paginasVisitadas.add(pagina);

        const data = pagina === 1 && sorteio.primeiraPagina
          ? sorteio.primeiraPagina
          : await carregarPagina(pagina);
        const candidatos = (data.results || []).filter(
          (item) => item.id && !bloqueados.has(String(item.id))
        );

        repetidosDisponiveis.push(
          ...candidatos.filter((item) =>
            sorteio.filmesJaMostrados.has(String(item.id))
          )
        );

        const filmesNovos = candidatos.filter(
          (item) => !sorteio.filmesJaMostrados.has(String(item.id))
        );

        if (filmesNovos.length > 0) {
          filmeAleatorio =
            filmesNovos[Math.floor(Math.random() * filmesNovos.length)];
          break;
        }
      }

      if (!filmeAleatorio && repetidosDisponiveis.length > 0) {
        sorteio.filmesJaMostrados.clear();
        filmeAleatorio =
          repetidosDisponiveis[
            Math.floor(Math.random() * repetidosDisponiveis.length)
          ];
      }

      if (!filmeAleatorio) {
        throw new Error(
          'Não encontramos filmes disponíveis com esses filtros. Tente novamente ou ajuste os filtros.'
        );
      }

      const detalhesResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${filmeAleatorio.id}?api_key=${API_KEY}&language=pt-BR`
      );

      const detalhes = await detalhesResponse.json();

      if (!detalhesResponse.ok) {
        throw new Error('Não foi possível carregar os detalhes do filme.');
      }

      if (solicitacao !== solicitacaoRef.current) {
        return;
      }

      setFilme(detalhes);
      sorteio.filmesJaMostrados.add(String(filmeAleatorio.id));
    } catch (error) {
      if (solicitacao !== solicitacaoRef.current) {
        return;
      }

      console.error(error);

      setErro(
        error.message ||
          'Não foi possível carregar um filme com esses filtros. Tente novamente.'
      );
    } finally {
      if (solicitacao === solicitacaoRef.current) {
        setCarregando(false);
      }
    }
  };

  useEffect(() => {
    buscarFilmeAleatorio();
  }, [filtrosKey]);

  const poster = filme?.poster_path
    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
    : null;

  const alturaPoster = Math.min(Math.max(height * 0.4, 220), 380);

  return (
    <View style={styles.container}>

      {/* Seta de voltar */}
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

      {/* Logo no topo */}
      <Image
        style={styles.logo}
        source={require('./assets/PopMovielogo.png')}
        resizeMode="contain"
      />

      {/* Conteúdo do filme */}
      <View style={styles.conteudo}>
        {carregando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
            />

            <Text style={styles.loadingText}>
              Sorteando filme...
            </Text>
          </View>
        ) : erro ? (
          <View style={styles.loadingBox}>
            <Text style={styles.erroText}>
              {erro}
            </Text>

            <Pressable
              style={styles.botaoTentar}
              onPress={buscarFilmeAleatorio}
            >
              <Text style={styles.textoBotaoTentar}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            style={styles.filmeRolagem}
            contentContainerStyle={styles.filmeRolagemConteudo}
            showsVerticalScrollIndicator={false}
          >
            <Pressable
              style={styles.filmeClicavel}
              onPress={() => {
                navigation.navigate('DetalhesFilme', {
                  filme: filme,
                  idFilme: filme.id,
                  apelido: apelido,
                  senha: senha,
                });
              }}
            >
              <View
                style={[
                  styles.containerPoster,
                  { height: alturaPoster },
                ]}
              >
                {poster ? (
                  <Image
                    style={styles.poster}
                    source={{ uri: poster }}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.posterFallback}>
                    <Ionicons
                      name="film-outline"
                      size={55}
                      color={COLORS.primary}
                    />

                    <Text style={styles.posterFallbackText}>
                      Sem pôster disponível
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.title}>
                {filme.title || filme.original_title}
              </Text>
            </Pressable>
          </ScrollView>
        )}

        {/* Botão de sortear novamente */}
        {!erro && (
          <Pressable
            style={styles.botaoSortear}
            onPress={buscarFilmeAleatorio}
            disabled={carregando}
          >
            <Ionicons
              name="refresh"
              size={30}
              color="white"
            />

            <Text style={styles.textoBotao}>
              Sortear novamente
            </Text>
          </Pressable>
        )}
      </View>

      {/* Barra inferior igual à tela Minha Lista */}
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
          onPress={() => navegar('Buscar')}
        >
          <Ionicons
            name="search-outline"
            size={29}
            color={COLORS.primary}
          />
        </Pressable>

        <Pressable
          style={styles.itemNav}
          onPress={() => navegar('MinhaLista')}
        >
          <Ionicons
            name="list-outline"
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
            size={29}
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
    alignItems: 'center',
  },

  botaoVoltar: {
    position: 'absolute',
    top: 55,
    left: 28,
    zIndex: 2,
    padding: 3,
  },

  logo: {
    width: 250,
    height: 105,
    marginTop: 10,
    marginBottom: 8,
    flexShrink: 0,
    alignSelf: 'center',
  },

  conteudo: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 75,
  },

  filmeRolagem: {
    flex: 1,
    width: '100%',
  },

  filmeRolagemConteudo: {
    alignItems: 'center',
    paddingBottom: 12,
  },

  filmeClicavel: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 4,
  },

  containerPoster: {
    width: '92%',
    borderRadius: 23,
    overflow: 'hidden',
    backgroundColor: '#1b1b1b',
  },

  poster: {
    width: '100%',
    height: '100%',
  },

  posterFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  posterFallbackText: {
    color: COLORS.text,
    fontSize: 16,
  },

  title: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '400',
    paddingHorizontal: 5,
  },

  botaoSortear: {
    backgroundColor: COLORS.primary,
    width: '100%',
    minHeight: 65,
    paddingVertical: 12,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    elevation: 8,
    marginTop: 10,
    marginBottom: 12,
    flexShrink: 0,
  },

  textoBotao: {
    color: 'white',
    fontSize: 21,
    fontWeight: '600',
  },

  botaoTentar: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
  },

  textoBotaoTentar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  loadingBox: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  loadingText: {
    color: COLORS.text,
    marginTop: 15,
    fontSize: 17,
  },

  erroText: {
    color: '#ffb4b4',
    fontSize: 16,
    textAlign: 'center',
  },

  // Mesmas configurações da barra inferior de MinhaLista.
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