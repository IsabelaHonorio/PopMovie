import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { getFavorites, setFavoriteAt } from './favoritesStore';
import {
  getFavoriteMovies,
  isMovieFavorite,
  toggleFavoriteMovie as toggleGlobalFavoriteMovie,
} from './favoriteMoviesStore';
import { useTheme, definirTelaPublicaAtiva } from './theme';
import { supabase, salvarFuncionalidadesFilme } from './lib/supabase';

export default function CadastroFavoritos({ navigation, route }) {
  const { background, primary, primaryDark, text } = useTheme();

  const [favorites, setFavorites] = useState(getFavorites());
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (
      route?.params?.selectedMovie &&
      route.params.slotIndex !== undefined
    ) {
      const { selectedMovie, slotIndex } = route.params;
      const previousFavorite = favorites[slotIndex];
      const selectedId = String(selectedMovie.id);
      const previousId = previousFavorite ? String(previousFavorite.id) : null;

      if (previousId && previousId !== selectedId) {
        toggleGlobalFavoriteMovie(previousFavorite);
      }

      if (!isMovieFavorite(selectedId)) {
        toggleGlobalFavoriteMovie(selectedMovie);
      }

      const nextFavorites = setFavoriteAt(slotIndex, selectedMovie);

      setFavorites(nextFavorites);
      setErro('');

      navigation.setParams((prevParams) => ({
        ...prevParams,
        selectedMovie: undefined,
        slotIndex: undefined,
        currentFavorite: undefined,
      }));
    }
  }, [route?.params?.selectedMovie, route?.params.slotIndex]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddFavorite = (index) => {
    navigation.navigate('BuscaSemBarra', {
      slotIndex: index,
      currentFavorite: favorites[index] || null,
      apelido: route?.params?.apelido || route?.params?.nomeUsuario,
      nomeUsuario: route?.params?.nomeUsuario || route?.params?.apelido,
      email: route?.params?.email,
      senha: route?.params?.senha,
    });
  };

  const handleRegister = async () => {
    const quantidadeFavoritos = favorites.filter(
      (favorite) => favorite !== null && favorite !== undefined
    ).length;

    if (quantidadeFavoritos < 3) {
      setErro('Você precisa escolher pelo menos 3 filmes para continuar.');
      return;
    }

    setErro('');
    setCarregando(true);

    const nomeUsuario =
      route?.params?.apelido || route?.params?.nomeUsuario || 'Fulano';
    const email = route?.params?.email;
    const senha = route?.params?.senha;

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          apelido: nomeUsuario,
        },
      },
    });

    setCarregando(false);

    if (error) {
      console.log('Erro ao cadastrar usuário:', error);

      const mensagemErro = error.message.toLowerCase();

      if (
        error.code === 'user_already_exists' ||
        mensagemErro.includes('already registered') ||
        mensagemErro.includes('already been registered')
      ) {
        setErro('Esse e-mail já está cadastrado.');
      } else if (
        mensagemErro.includes('usuario_apelido_unique') ||
        mensagemErro.includes('database error saving new user') ||
        mensagemErro.includes('database_error')
      ) {
        setErro('Esse nome de usuário já está sendo utilizado.');
      } else {
        setErro('Não foi possível concluir o cadastro. Tente novamente.');
      }

      return;
    }

    global.currentUserName = nomeUsuario;

    for (const filmeFavorito of getFavoriteMovies()) {
      salvarFuncionalidadesFilme(filmeFavorito.id, {
        favoritos: true,
      }).catch((erro) => {
        console.log('Erro ao salvar favorito no banco:', erro);
      });
    }

    definirTelaPublicaAtiva(false);

    navigation.navigate('Principal', {
      apelido: nomeUsuario,
      nomeUsuario,
    });
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: background }]}
    >
      <StatusBar
        barStyle={background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={background}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.container, { backgroundColor: background }]}
        >
          {/* Botão voltar */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={[styles.backArrow, { color: primary }]}>
              ‹
            </Text>
          </TouchableOpacity>

          {/* Logo PopMovie */}
          <View style={styles.logoContainer}>
            <Image
              source={require('./assets/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Instrução */}
          <Text style={[styles.instrucao, { color: text }]}>
            Escolha pelo menos 3 filmes para continuar!
          </Text>

          {/* Mensagem de erro */}
          {erro !== '' && (
            <Text style={styles.mensagemErro}>
              {erro}
            </Text>
          )}

          {/* Conteúdos favoritos */}
          <View style={styles.favoritesSection}>
            <Text style={[styles.heading, { color: text }]}>
              Conteúdos favoritos:
            </Text>

            <View style={styles.favoritesGrid}>
              {favorites.map((favorite, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.favoriteSlot,
                    {
                      shadowColor: primary,
                      borderColor: primary,
                      backgroundColor: background,
                    },
                  ]}
                  onPress={() => handleAddFavorite(index)}
                  activeOpacity={0.75}
                  accessibilityLabel={`Adicionar favorito ${index + 1}`}
                >
                  {favorite ? (
                    <Image
                      source={{ uri: favorite.poster }}
                      style={styles.favoritePoster}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.plusContainer}>
                      <View style={styles.plusVertical} />
                      <View style={styles.plusHorizontal} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Botão cadastrar */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                {
                  backgroundColor: primary,
                  shadowColor: primaryDark,
                },
              ]}
              onPress={handleRegister}
              activeOpacity={0.8}
              disabled={carregando}
            >
              <Text style={styles.registerButtonText}>
                {carregando ? 'Aguarde...' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    minHeight: "100%",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  backButton: {
    position: "absolute",
    top: 28,
    left: 38,
    zIndex: 2,
    width: 34,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backArrow: {
    fontSize: 46,
    lineHeight: 46,
    fontWeight: "300",
    marginTop: -5,
  },

  logoContainer: {
    height: 145,
    width: 190,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },

  logo: {
    width: 260,
    height: 91,
    resizeMode: "contain",
  },

  instrucao: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 12,
  },

  mensagemErro: {
    color: "#FF5252",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },

  favoritesSection: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },

  heading: {
    width: "100%",
    fontSize: 32,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: -0.7,
  },

  favoritesGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 53,
    rowGap: 34,
  },

  favoriteSlot: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },

  favoritePoster: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  plusContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  plusVertical: {
    position: "absolute",
    width: 3.5,
    height: 27,
    backgroundColor: "#242424",
    borderRadius: 2,
  },

  plusHorizontal: {
    position: "absolute",
    width: 27,
    height: 3.5,
    backgroundColor: "#242424",
    borderRadius: 2,
  },

  registerButton: {
    width: 248,
    height: 64,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 37,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 7,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    includeFontPadding: false,
  },
});
