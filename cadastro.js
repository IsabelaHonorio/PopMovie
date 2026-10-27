import React, { useState } from 'react';
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

import { commonStyles, useTheme } from './theme';

export default function CadastroScreen({ navigation }) {
  const { background, primary, text } = useTheme();

  const [apelido, setApelido] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erroApelido, setErroApelido] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');

  const cadastrar = () => {
    setErroApelido('');
    setErroEmail('');
    setErroSenha('');
    setErroConfirmarSenha('');

    let formularioValido = true;

    // Validação do apelido
    if (apelido.trim().length < 1) {
      setErroApelido('Digite pelo menos um caractere no apelido.');
      formularioValido = false;
    }

    // Validação do e-mail
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email.trim())) {
      setErroEmail('Digite um e-mail válido. Exemplo: usuario@gmail.com');
      formularioValido = false;
    }

    // Validação da senha
    const possuiEspecial = /[^a-zA-Z0-9]/.test(senha);

    if (senha.length < 6 || !possuiEspecial) {
      setErroSenha(
        'A senha deve ter pelo menos 6 caracteres e um caractere especial.'
      );
      formularioValido = false;
    }

    // Validação da confirmação da senha
    if (senha !== confirmarSenha) {
      setErroConfirmarSenha('As senhas não são iguais.');
      formularioValido = false;
    }

    // Se tudo estiver correto, vai para os favoritos
    if (formularioValido) {
      navigation.navigate('CadastroFavoritos', {
        apelido: apelido.trim(),
        email: email.trim(),
        senha,
      });
    }
  };

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
            resizeMode="contain"
          />
        </View>

        <Text style={[commonStyles.title, { color: text }]}>
          Cadastro
        </Text>

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
            E-MAIL
          </Text>

          <TextInput
            style={commonStyles.input}
            value={email}
            onChangeText={(valor) => {
              setEmail(valor);
              setErroEmail('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {erroEmail !== '' && (
            <Text style={styles.mensagemErro}>{erroEmail}</Text>
          )}

          <Text style={[commonStyles.label, { color: text }]}>
            SENHA
          </Text>

          <TextInput
            style={commonStyles.input}
            value={senha}
            onChangeText={(valor) => {
              setSenha(valor);
              setErroSenha('');
              setErroConfirmarSenha('');
            }}
            secureTextEntry
          />

          {erroSenha !== '' && (
            <Text style={styles.mensagemErro}>{erroSenha}</Text>
          )}

          <Text style={[commonStyles.label, { color: text }]}>
            CONFIRMAR SENHA
          </Text>

          <TextInput
            style={commonStyles.input}
            value={confirmarSenha}
            onChangeText={(valor) => {
              setConfirmarSenha(valor);
              setErroConfirmarSenha('');
            }}
            secureTextEntry
          />

          {erroConfirmarSenha !== '' && (
            <Text style={styles.mensagemErro}>
              {erroConfirmarSenha}
            </Text>
          )}
        </View>

        <Pressable
          style={[
            commonStyles.primaryButton,
            { backgroundColor: primary, shadowColor: primary },
          ]}
          onPress={cadastrar}
        >
          <Text style={commonStyles.primaryButtonText}>
            Adicionar favoritos
          </Text>
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
