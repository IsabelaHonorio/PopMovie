import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { COLORS, commonStyles, useTheme } from './theme';

export default function TelaLogin({ navigation }) {
  const { background, primary, text, textSoft } = useTheme();
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = () => {
    navigation.navigate('Principal', {
      apelido,
      senha,
    });
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: background }]}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={[styles.backArrow, { color: primary }]}>‹</Text>
      </Pressable>

      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/Logo.png')}
          style={commonStyles.logo}
        />
      </View>

      <Text style={[commonStyles.title, { color: text }]}>Login</Text>
      
      <View style={styles.form}>
        <Text style={[commonStyles.label, { color: text }]}>APELIDO</Text>
        <TextInput
          style={commonStyles.input}
          value={apelido}
          onChangeText={setApelido}
          autoCapitalize="none"
        />

        <Text style={[commonStyles.label, { color: text }]}>SENHA</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <Text style={[styles.esqueceuSenha, { color: textSoft }]}>
        Esqueceu a senha?
      </Text>

      <Pressable
        style={[
          commonStyles.primaryButton,
          { backgroundColor: primary, shadowColor: primary },
        ]}
        onPress={entrar}
      >
        <Text style={commonStyles.primaryButtonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 27,
    left: 40,
    zIndex: 1,
    width: 32,
    height: 35,
    justifyContent: 'center',
  },

  backArrow: {
    color: '#963BFF',
    fontSize: 48,
    lineHeight: 48,
    marginTop: -7,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    height: 91,
  },

  logo: {
    width: 260,
    height: 91,
    resizeMode: 'contain',
  },

  login: {
    color: COLORS.text,
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 22,
  },

  esqueceuSenha: {
    color: COLORS.textSoft,
    fontSize: 12,
    alignSelf: 'center',
    marginTop: -8,
    marginBottom: 24,
  },
  form:{
    width: '100%',
    maxWidth: 360,
    marginBottom: 20,
  },
});
