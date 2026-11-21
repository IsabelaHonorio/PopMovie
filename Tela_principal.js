import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS, commonStyles, useTheme } from './theme';

export default function TelaPrincipal({ navigation, route }) {
  const {
    background,
    primary,
    text,
    textSoft,
    surfaceElevated,
    border,
  } = useTheme();

  const { apelido, email, senha, nomeUsuario } = route.params || {};

  const nomeExibido =
    apelido || nomeUsuario || global.currentUserName || 'Fulano';

  const irParaMinhaLista = () =>
    navigation.navigate('MinhaLista', {
      apelido: nomeExibido,
      email,
      senha,
    });

  const irParaConteudosAvaliados = () =>
    navigation.navigate('ConteudosAvaliados', {
      apelido: nomeExibido,
      email,
      senha,
    });

  const irParaPerfil = () =>
    navigation.navigate('Perfil', {
      apelido: nomeExibido,
      email,
      senha,
    });

  const irParaFiltros = () =>
    navigation.navigate('Filtros', { apelido: nomeExibido, email, senha });

  const irParaSorteio = () =>
    navigation.navigate('ConteudoSorteado', {
      apelido: nomeExibido,
      email,
      senha,
      sorteioId: Date.now(),
    });

  return (
    <View style={[commonStyles.container, { backgroundColor: background }]}>
      {/* Logo na parte superior */}
      <View style={styles.areaSuperior}>
        <Image
          source={require('./assets/PopMovielogo.png')}
          style={styles.imagem_inicial}
          resizeMode="contain"
        />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.centralArea}>
        <Text style={[styles.title, { color: text }]}>
          Olá, {nomeExibido}!
        </Text>

        <Text style={[styles.text, { color: textSoft }]}>
          O que vamos assistir hoje?
        </Text>

        <Image
          source={require('./assets/tela_inicial.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={[
            commonStyles.primaryButton,
            styles.botaoSortear,
            { backgroundColor: primary, shadowColor: primary },
          ]}
          activeOpacity={0.8}
          onPress={irParaSorteio}
        >
          <Text style={commonStyles.primaryButtonText}>
            Sortear
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao_filtros}
          activeOpacity={0.8}
          onPress={irParaFiltros}
        >
          <Image
            source={require('./assets/figura_botaoFiltros.png')}
            style={styles.imagem_filtros}
            resizeMode="contain"
          />

          <Text style={styles.botaoTexto_filtros}>
            Usar filtros
          </Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegação inferior */}
      <View
        style={[
          styles.barraNavegacao,
          {
            backgroundColor: surfaceElevated,
            borderTopColor: border,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('Principal', { apelido, email, senha })
          }
        >
          <Ionicons name="home-outline" size={29} color={primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('Buscar', { apelido, email, senha })
          }
        >
          <Ionicons name="search-outline" size={29} color={primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={irParaMinhaLista}
        >
          <Ionicons name="list-outline" size={29} color={primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={irParaConteudosAvaliados}
        >
          <Feather name="check" size={29} color={primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          activeOpacity={0.7}
          onPress={irParaPerfil}
        >
          <Ionicons name="person-outline" size={29} color={primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areaSuperior: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 0,
  },

  imagem_inicial: {
    width: 250,
    height: 105,
    marginTop: 0,
  },

  centralArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 75,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    alignSelf: 'center',
    marginTop: 0,
    fontWeight: '700',
    textAlign: 'center',
  },

  text: {
    color: COLORS.textSoft,
    fontSize: 16,
    marginTop: 4,
    alignSelf: 'center',
    textAlign: 'center',
  },

  image: {
    width: 230,
    height: 220,
    marginTop: 5,
    marginBottom: 5,
  },

  botaoSortear: {
    width: '85%',
    minHeight: 48,
    paddingHorizontal: 18,
    marginTop: 3,
  },

  botao_filtros: {
    backgroundColor: COLORS.white,
    width: '85%',
    height: 46,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },

  botaoTexto_filtros: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  imagem_filtros: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 15,
    transform: [{ rotate: '90deg' }],
  },

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
