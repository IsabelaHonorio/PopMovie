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

export default function App({ navigation, route }) {
  const [favorites, setFavorites] = useState(getFavorites());

  useEffect(() => {
    if (route?.params?.selectedMovie && route.params.slotIndex !== undefined) {
      const { selectedMovie, slotIndex } = route.params;

      const nextFavorites = setFavoriteAt(slotIndex, selectedMovie);
      setFavorites(nextFavorites);

      navigation.setParams({ selectedMovie: undefined, slotIndex: undefined });
    }
  }, [route?.params?.selectedMovie, route?.params?.slotIndex]);

  const handleBack = () => {
    navigation.navigate('Cadastro');
  };

  const handleAddFavorite = (index) => {
    navigation.navigate('BuscaSemBarra', { slotIndex: index });
  };

  const handleRegister = () => {
    navigation.navigate('Principal', {
      apelido: 'Pedro',
      senha: '123456',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Botão voltar */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          {/* Logo PopMovie */}
          <View style={styles.logoContainer}>
            <Image
              source={require('./assets/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Conteúdos favoritos */}
          <View style={styles.favoritesSection}>
            <Text style={styles.heading}>
              Conteúdos favoritos:
            </Text>

            <View style={styles.favoritesGrid}>
              {favorites.map((favorite, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.favoriteSlot}
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
              style={styles.registerButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>
                Cadastrar
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
    color: "#9638FF",
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

  favoritesSection: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },

  heading: {
    width: "100%",
    color: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    shadowColor: "#9B7BFF",
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
    backgroundColor: "#9638FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 37,

    shadowColor: "#9638FF",
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
