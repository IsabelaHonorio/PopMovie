import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS, commonStyles } from './theme';

export default function TelaPrincipal({ navigation, route }) {
  const { apelido, senha } = route.params || {};

  const irParaMinhaLista = () => navigation.navigate('MinhaLista', { apelido, senha });
  const irParaConteudosAvaliados = () => navigation.navigate('ConteudosAvaliados', { apelido, senha });
  const irParaPerfil = () => navigation.navigate('Perfil', { apelido, senha });
  const irParaFiltros = () => navigation.navigate('Filtros', { apelido, senha });
  const irParaSorteio = () => navigation.navigate('ConteudoSorteado');

  return (
    <View style={commonStyles.container}>
        <View style={styles.areaSuperior}>
        <Image
          source={require('./assets/PopMovielogo.png')}
          style={styles.imagem_inicial}
        />
        </View>
      <View style={styles.centralArea}>
        

        <Text style={styles.title}>Olá {apelido || 'Pedro'}!</Text>
        <Text style={styles.text}>O que vamos assistir hoje?</Text>

        <Image
          source={require('./assets/tela_inicial.png')}
          style={styles.image}
        />

        <TouchableOpacity style={[commonStyles.primaryButton, styles.botaoSortear]} activeOpacity={0.8} onPress={irParaSorteio}>
          <Text style={commonStyles.primaryButtonText}>Sortear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao_filtros} activeOpacity={0.8} onPress={irParaFiltros}>
          <Image
            source={require('./assets/figura_botaoFiltros.png')}
            style={styles.imagem_filtros}
          />
          <Text style={styles.botaoTexto_filtros}>Usar filtros</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.barraNavegacao}>
        <TouchableOpacity style={styles.itemNav} activeOpacity={0.7} onPress={() => navigation.navigate('Principal', { apelido, senha })}>
          <Ionicons name="home-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} activeOpacity={0.7} onPress={irParaMinhaLista}>
          <Ionicons name="list-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} activeOpacity={0.7} onPress={irParaConteudosAvaliados}>
          <Feather name="check" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} activeOpacity={0.7} onPress={irParaPerfil}>
          <Ionicons name="person-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centralArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 40,
  },

  imagem_inicial: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginTop: 8,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    alignSelf: 'center',
    marginTop: 12,
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
    width: 250,
    height: 220,
    resizeMode: 'contain',
    marginTop: 12,
    marginBottom: 12,
  },

  botao_filtros: {
    backgroundColor: COLORS.white,
    width: 230,
    height: 44,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
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
    resizeMode: 'contain',
    position: 'absolute',
    left: 12,
    transform: [{ rotate: '90deg' }],
  },

  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0a0a0c',
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

  botaoSortear: {
    width: 150,
    minHeight: 44,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  areaSuperior: {
    alignItems: 'center',
  },
});
