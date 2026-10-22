
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

const MOVIES = [
  {
    id: "1",
    title: "Whiplash",
    year: "2014",
    rating: "8.5",
    poster:
      "https://image.tmdb.org/t/p/w200/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
  },
  {
    id: "2",
    title: "Parasita",
    year: "2019",
    rating: "8.5",
    poster:
      "https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    id: "3",
    title: "Toy Story",
    year: "1995",
    rating: "8.7",
    poster:
      "https://image.tmdb.org/t/p/w200/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
  },
  {
    id: "4",
    title: "Interestelar",
    year: "2014",
    rating: "8.7",
    poster:
      "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState("3");
  const [activeTab, setActiveTab] = useState("search");

  const filteredMovies = MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    // A navegação entre telas será implementada depois.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <View style={styles.screen}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Voltar"
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('./assets/Logo.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <Text style={styles.heading}>Buscar filmes</Text>

        {/* Campo de busca */}
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#953CFD"
            style={styles.searchIcon}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar filmes"
            placeholderTextColor="#D1CCD4"
            value={search}
            onChangeText={setSearch}
            selectionColor="#B12AFF"
            returnKeyType="search"
          />
        </View>

        {/* Lista de filmes */}
        <ScrollView
          style={styles.movieScroll}
          contentContainerStyle={styles.movieList}
          showsVerticalScrollIndicator={false}
        >
          {filteredMovies.map((movie) => {
            const isFavorite = favorites.includes(movie.id);
            const isFeatured = featuredMovie === movie.id;

            return (
              <View key={movie.id} style={styles.movieCard}>
                <Image
                  source={{ uri: movie.poster }}
                  style={styles.poster}
                  resizeMode="cover"
                />

                <View style={styles.movieInfo}>
                  <Text
                    style={styles.movieTitle}
                    numberOfLines={1}
                  >
                    {movie.title}
                  </Text>

                  <Text style={styles.movieYear}>
                    ({movie.year})
                  </Text>

                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingStar}>★</Text>
                    <Text style={styles.ratingText}>
                      {movie.rating}
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[
                      styles.featureButton,
                      !isFeatured && styles.featureButtonHidden,
                    ]}
                    onPress={() =>
                      setFeaturedMovie(
                        isFeatured ? null : movie.id
                      )
                    }
                    activeOpacity={0.7}
                    accessibilityLabel="Destacar filme"
                  >
                    {isFeatured && (
                      <Text style={styles.featureStar}>☆</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => toggleFavorite(movie.id)}
                    activeOpacity={0.7}
                    accessibilityLabel={
                      isFavorite
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <Ionicons
                      name={isFavorite ? "heart" : "heart-outline"}
                      size={34}
                      color="#953CFD"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {filteredMovies.length === 0 && (
            <Text style={styles.emptyMessage}>
              Nenhum filme encontrado.
            </Text>
          )}
        </ScrollView>

        {/* Barra de navegação inferior */}
        <View style={styles.barraNavegacao}>
          <TouchableOpacity
            style={styles.itemNav}
            activeOpacity={0.7}
            onPress={() => handleNavigation("home")}
            accessibilityLabel="Início"
          >
            <Ionicons
              name="home-outline"
              size={24}
              color="#953CFD"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemNav}
            activeOpacity={0.7}
            onPress={() => handleNavigation("search")}
            accessibilityLabel="Buscar filmes"
          >
            <Ionicons
              name="list-outline"
              size={24}
              color="#953CFD"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemNav}
            activeOpacity={0.7}
            onPress={() => handleNavigation("watched")}
            accessibilityLabel="Filmes assistidos"
          >
            <Feather
              name="check"
              size={24}
              color="#953CFD"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemNav}
            activeOpacity={0.7}
            onPress={() => handleNavigation("profile")}
            accessibilityLabel="Perfil"
          >
            <Ionicons
              name="person-outline"
              size={24}
              color="#953CFD"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },

  screen: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 8,
  },

  header: {
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 39,
    top: 3,
    width: 34,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  backArrow: {
    color: "#953CFD",
    fontSize: 47,
    fontWeight: "300",
    lineHeight: 48,
    marginTop: -5,
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontSize: 53,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -3.5,
    textAlign: "center",
    textShadowColor: "#6723AD",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },

  logoPop: {
    color: "#FFCB24",
  },

  logoMovie: {
    color: "#FFFFFF",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 24,
  },

  searchBar: {
    height: 56,
    borderWidth: 1,
    borderColor: "#C51AFF",
    borderRadius: 19,
    backgroundColor: "#09000D",
    marginHorizontal: 23,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 19,
  },

  searchIcon: {
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 0,
  },

  movieScroll: {
    flex: 1,
  },

  movieList: {
    paddingHorizontal: 23,
    paddingBottom: 80,
    gap: 19,
  },

  movieCard: {
    minHeight: 144,
    borderWidth: 1,
    borderColor: "#C51AFF",
    borderRadius: 21,
    backgroundColor: "#09000D",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  poster: {
    width: 88,
    height: 128,
    borderRadius: 11,
    backgroundColor: "#21142B",
    marginLeft: 7,
  },

  movieInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
    marginLeft: 16,
  },

  movieTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 3,
  },

  movieYear: {
    color: "#D0C9D3",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  ratingStar: {
    color: "#FFD400",
    fontSize: 25,
    lineHeight: 28,
  },

  ratingText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },

  actions: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    marginRight: 1,
    gap: 4,
  },

  featureButton: {
    width: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  featureButtonHidden: {
    width: 0,
    overflow: "hidden",
  },

  featureStar: {
    color: "#A32CFF",
    fontSize: 49,
    lineHeight: 54,
    fontWeight: "400",
  },

  heartButton: {
    width: 38,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyMessage: {
    color: "#D0C9D3",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },

  barraNavegacao: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0A0A0C",
    borderTopWidth: 1,
    borderTopColor: "#1F1F23",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  itemNav: {
    flex: 1,
    height: 60,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
