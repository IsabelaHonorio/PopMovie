import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { supabase } from './lib/supabase';

export default function AlterarSenha({ voltar }) {
  const [emailDigitado, setEmailDigitado] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  async function enviarLink() {
    const email = emailDigitado.trim();

    setMensagem('');

    if (email === '') {
      setTipoMensagem('erro');
      setMensagem('Digite seu e-mail.');
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
      setTipoMensagem('erro');
      setMensagem('Digite um endereço de e-mail válido.');
      return;
    }

    try {
      setCarregando(true);

      const redirectTo = Linking.createURL('redefinir-senha');

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        throw error;
      }

      setTipoMensagem('sucesso');
      setMensagem(
        'Solicitação realizada! Se houver uma conta cadastrada com esse e-mail, você receberá as instruções para redefinir sua senha.'
      );

      setEmailDigitado('');
    } catch (erro) {
      setTipoMensagem('erro');
      setMensagem(
        erro.message || 'Não foi possível solicitar a recuperação da senha.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={estilos.conteiner}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={estilos.cabecalho}>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          activeOpacity={0.7}
          onPress={voltar}
        >
          <Ionicons name="chevron-back" size={20} color="#a855f7" />
        </TouchableOpacity>

        <Text style={estilos.tituloCabecalho}>
          Esqueceu sua Senha
        </Text>
      </View>

      <Text style={estilos.descricao}>
        Digite seu e-mail para receber um link
        {'\n'}
        para criar uma nova senha.
      </Text>

      <View style={estilos.caixaEntrada}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#6b7280"
          style={estilos.icone}
        />

        <TextInput
          style={estilos.campoTexto}
          placeholder="Seu e-mail"
          placeholderTextColor="#6b7280"
          value={emailDigitado}
          onChangeText={(texto) => {
            setEmailDigitado(texto);
            setMensagem('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        style={[
          estilos.botaoEnviar,
          carregando && { opacity: 0.6 },
        ]}
        activeOpacity={0.8}
        onPress={enviarLink}
        disabled={carregando}
      >
        <Text style={estilos.textoBotao}>
          {carregando ? 'Enviando...' : 'Enviar link'}
        </Text>
      </TouchableOpacity>

      {mensagem !== '' && (
        <View
          style={[
            estilos.caixaMensagem,
            tipoMensagem === 'sucesso'
              ? estilos.mensagemSucesso
              : estilos.mensagemErro,
          ]}
        >
          <Text style={estilos.textoMensagem}>
            {mensagem}
          </Text>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 32,
  },

  botaoVoltar: {
    width: 44,
    height: 44,
    backgroundColor: '#121215',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#222226',
  },

  tituloCabecalho: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },

  descricao: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'serif',
    fontWeight: '600',
    marginBottom: 28,
    textAlign: 'center',
  },

  caixaEntrada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121215',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222226',
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 32,
    width: '80%',
    alignSelf: 'center',
  },

  icone: {
    marginRight: 12,
  },

  campoTexto: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },

  botaoEnviar: {
    backgroundColor: '#9333ea',
    height: 54,
    width: '80%',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  caixaMensagem: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 22,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },

  mensagemSucesso: {
    backgroundColor: '#102719',
    borderColor: '#22c55e',
  },

  mensagemErro: {
    backgroundColor: '#2b1414',
    borderColor: '#ef4444',
  },

  textoMensagem: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});