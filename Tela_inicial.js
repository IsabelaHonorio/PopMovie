import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles, useTheme } from './theme';

export default function TelaInicial({ navigation }) {
  const { background, primary, text } = useTheme();

  return (
    <View style={[commonStyles.container, { backgroundColor: background }]}>
      <View style={styles.conteudo}>
        <Image
          style={styles.logoGrande}
          source={require('./assets/Logo.png')}
          resizeMode="contain"
        />
        <View style={styles.textoContainer}>
          <Text style={[styles.title, { color: text }]}>
            Não sabe o que assistir?{"\n"}
            Deixe o <Text style={[styles.destaque, { color: primary }]}>PopMovie</Text> decidir!
          </Text>
        </View>
      </View>

      <View style={styles.botoes}>
        <Pressable
          style={[
            commonStyles.primaryButton,
            { backgroundColor: primary, shadowColor: primary },
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.conteudoBotao}>
            <Ionicons name="person-outline" size={22} color="white" />
            <Text style={commonStyles.primaryButtonText}>Login</Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            commonStyles.primaryButton,
            { backgroundColor: primary, shadowColor: primary },
          ]}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={commonStyles.primaryButtonText}>Realizar cadastro</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    alignItems: 'center',
    width: '100%',
    marginTop: 18,
  },

  logoGrande: {
    width: 340,
    height: 210,
    resizeMode: 'contain',
  },

  title: {
    color: COLORS.text,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 34,
  },

  destaque: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  botoes: {
    width: '100%',
    gap: 40,
    marginTop: 'auto',
    marginBottom: 64,
  },

  conteudoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textoContainer: {
    marginTop: 60,
  }
});
