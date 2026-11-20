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
import { supabase } from './lib/supabase';

export default function TelaLogin({ navigation }) {
  const { background, primary, text, textSoft } = useTheme();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async () => {
    let formularioValido = true;

    setErroEmail('');
    setErroSenha('');
    setErroLogin('');

    // Validação do e-mail
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErroEmail('Digite um e-mail válido.');
      formularioValido = false;
    }

    // Verifica o tamanho da senha
    if (senha.length < 6) {
      setErroSenha('Digite uma senha com pelo menos 6 caracteres.');
      formularioValido = false;
    }

    if (!formularioValido) return;

    setCarregando(true);

    // Tenta fazer login com o Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    if (error) {
      setCarregando(false);

      if (
        error.code === 'invalid_credentials' ||
        error.message?.toLowerCase().includes('invalid login')
      ) {
        setErroLogin('E-mail ou senha incorretos.');
      } else {
        setErroLogin('Não foi possível entrar. Tente novamente.');
      }

      console.log('Erro ao fazer login:', error);
      return;
    }

    const usuario = data.user;

    // Obtém o apelido do usuário
    const apelido =
      usuario?.user_metadata?.apelido ||
      usuario?.user_metadata?.nomeUsuario ||
      email.trim().split('@')[0];

    if (usuario) {
      // Atualiza ou cria o perfil do usuário na tabela 'usuario'
      const { error: erroPerfil } = await supabase
        .from('usuario')
        .upsert(
          {
            id_usuario: usuario.id,
            apelido,
          },
          { onConflict: 'id_usuario' }
        );

      if (erroPerfil) {
        console.log('Erro ao carregar/criar perfil:', erroPerfil);
      }

      global.currentUserName = apelido;
    }

    setCarregando(false);

    // Navega para a tela principal
    navigation.navigate('Principal', {
      apelido,
      email: email.trim(),
      senha,
    });
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
          E-MAIL
        </Text>

        <TextInput
          style={commonStyles.input}
          value={email}
          onChangeText={(valor) => {
            setEmail(valor);
            setErroEmail('');
          }}
          autoCapitalize="none"
        />

        {erroEmail !== '' && (
          <Text style={styles.mensagemErro}>{erroEmail}</Text>
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

        {erroLogin !== '' && (
          <Text style={styles.mensagemErro}>{erroLogin}</Text>
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
        disabled={carregando}
      >
        <Text style={commonStyles.primaryButtonText}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </Text>
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
