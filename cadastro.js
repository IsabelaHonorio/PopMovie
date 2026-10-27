import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS, commonStyles, useTheme } from './theme';

export default function CadastroScreen({ navigation }) {
  const { background, primary, text } = useTheme();

  return (
    <View style={[commonStyles.container, { backgroundColor: background }]}>
      <StatusBar
        backgroundColor={background}
        barStyle={background === '#FFFFFF' ? 'dark-content' : 'light-content'}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={commonStyles.backButton}
          accessibilityLabel="Voltar"
          onPress={() => navigation.goBack()}
        >
          <Text style={[commonStyles.backArrow, { color: primary }]}>‹</Text>
        </Pressable>

        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/Logo.png')}
            style={commonStyles.logo}
          />
        </View>

        <Text style={[commonStyles.title, { color: text }]}>Cadastro</Text>

        <View style={styles.form}>
          <Text style={[commonStyles.label, { color: text }]}>APELIDO</Text>
          <TextInput style={commonStyles.input} autoCapitalize="none" />

          <Text style={[commonStyles.label, { color: text }]}>E-MAIL</Text>
          <TextInput
            style={commonStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[commonStyles.label, { color: text }]}>SENHA</Text>
          <TextInput style={commonStyles.input} secureTextEntry />

          <Text style={[commonStyles.label, { color: text }]}>
            CONFIRMAR SENHA
          </Text>
          <TextInput style={commonStyles.input} secureTextEntry />
        </View>

        <Pressable
          style={[
            commonStyles.primaryButton,
            { backgroundColor: primary, shadowColor: primary },
          ]}
          onPress={() => navigation.navigate('CadastroFavoritos')}
        >
          <Text style={commonStyles.primaryButtonText}>Adicionar favoritos</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },

  title: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  form: {
    width: '100%',
    maxWidth: 360,
    marginBottom: 20,
  },
});
