
import React, { useState } from "react";
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

export default function App() {
  const [favorites, setFavorites] = useState(Array(6).fill(null));

  const handleBack = () => {
    // Navegação será implementada depois.
  };

  const handleAddFavorite = (index) => {
    // Seleção de filmes será implementada depois.
    console.log("Adicionar favorito:", index + 1);
  };

  const handleRegister = () => {
    // Cadastro será implementado depois.
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
                  <View style={styles.plusContainer}>
                    <View style={styles.plusVertical} />
                    <View style={styles.plusHorizontal} />
                  </View>
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

  popcorn: {
    fontSize: 66,
    lineHeight: 76,
    textAlign: "center",
    marginBottom: -4,
  },

  logoTextContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: -2,
  },

  logoPop: {
    color: "#FFC928",
    fontSize: 34,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -2,
    textShadowColor: "#6B2AC5",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 2,
  },

  logoMovie: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -2,
    textShadowColor: "#6B2AC5",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 2,
  },

  logoUnderline: {
    width: 80,
    height: 8,
    borderTopWidth: 4,
    borderColor: "#9638FF",
    borderRadius: 50,
    marginTop: 5,
    transform: [{ rotate: "-7deg" }],
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

    shadowColor: "#9B7BFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
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
