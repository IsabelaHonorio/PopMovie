import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

import { commonStyles, useTheme } from './theme';

export default function TelaLogin({ navigation }) {
  const { background, primary, text, textSoft } = useTheme();

  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const [erroApelido, setErroApelido] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const entrar = () => {
    let formularioValido = true;

    setErroApelido('');
    setErroSenha('');

    // Verifica se o apelido foi preenchido
    if (apelido.trim().length < 1) {
      setErroApelido('Digite pelo menos um caractere no apelido.');
      formularioValido = false;
    }

    // Verifica o tamanho da senha
    if (senha.length < 6) {
      setErroSenha(
        'A senha deve ter pelo menos 6 caracteres e um caractere especial.'
      );
      formularioValido = false;
    } else {
      // Verifica se existe pelo menos um caractere especial
      const possuiEspecial = /[^a-zA-Z0-9]/.test(senha);

      if (!possuiEspecial) {
        setErroSenha(
          'A senha deve ter pelo menos 6 caracteres e um caractere especial.'
        );
        formularioValido = false;
      }
    }

    // Só navega se os dois campos estiverem válidos
    if (formularioValido) {
      navigation.navigate('Principal', {
        apelido,
        senha,
      });
    }
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: background }]}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backArrow, { color: primary }]}>‹</Text>
      </Pressable>

      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/Logo.png')}
          style={commonStyles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={[commonStyles.title, { color: text }]}>Login</Text>

      <View style={styles.form}>
        <Text style={[commonStyles.label, { color: text }]}>
          APELIDO
        </Text>

        <TextInput
          style={commonStyles.input}
          value={apelido}
          onChangeText={(valor) => {
            setApelido(valor);
            setErroApelido('');
          }}
          autoCapitalize="none"
        />

        {erroApelido !== '' && (
          <Text style={styles.mensagemErro}>{erroApelido}</Text>
        )}

        <Text style={[commonStyles.label, { color: text }]}>
          SENHA
        </Text>

        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={senha}
          onChangeText={(valor) => {
            setSenha(valor);
            setErroSenha('');
          }}
        />

        {erroSenha !== '' && (
          <Text style={styles.mensagemErro}>{erroSenha}</Text>
        )}
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

  esqueceuSenha: {
    fontSize: 12,
    alignSelf: 'center',
    marginTop: -8,
    marginBottom: 24,
  },

  form: {
    width: '100%',
    maxWidth: 360,
    marginBottom: 20,
  },

  mensagemErro: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 14,
  },
});
