
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
import { supabase } from './lib/supabase';

export default function RedefinirSenha({ navigation }) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);

  async function salvarNovaSenha() {
    setMensagem('');
    setSucesso(false);

    if (!novaSenha || !confirmarSenha) {
      setMensagem('Preencha os dois campos de senha.');
      return;
    }

    if (novaSenha.length < 6) {
      setMensagem('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem('As senhas não são iguais.');
      return;
    }

    try {
      setCarregando(true);

      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) {
        throw error;
      }

      setSucesso(true);
      setMensagem('Sua senha foi alterada com sucesso!');

      setNovaSenha('');
      setConfirmarSenha('');

    } catch (erro) {
      setMensagem(
        erro.message || 'Não foi possível alterar sua senha.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={estilos.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      {/* BOTÃO VOLTAR */}
      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color="#a855f7"
        />
      </TouchableOpacity>

      <View style={estilos.cabecalho}>
        <Ionicons
          name="lock-closed-outline"
          size={42}
          color="#a855f7"
        />

        <Text style={estilos.titulo}>
          Redefinir senha
        </Text>
      </View>

      <Text style={estilos.descricao}>
        Digite sua nova senha e confirme para concluir a alteração.
      </Text>

      <TextInput
        style={estilos.input}
        placeholder="Nova senha"
        placeholderTextColor="#777777"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={estilos.input}
        placeholder="Confirme a nova senha"
        placeholderTextColor="#777777"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[
          estilos.botao,
          carregando && { opacity: 0.6 },
        ]}
        onPress={salvarNovaSenha}
        disabled={carregando}
        activeOpacity={0.8}
      >
        <Text style={estilos.textoBotao}>
          {carregando ? 'Salvando...' : 'Salvar nova senha'}
        </Text>
      </TouchableOpacity>

      {mensagem !== '' && (
        <View
          style={[
            estilos.caixaMensagem,
            sucesso
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
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  botaoVoltar: {
    position: 'absolute',
    top: 45,
    left: 20,
    width: 44,
    height: 44,
    backgroundColor: '#121215',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222226',
    zIndex: 10,
  },

  cabecalho: {
    alignItems: 'center',
    marginBottom: 25,
  },

  titulo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },

  descricao: {
    color: '#cccccc',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 30,
  },

  input: {
    height: 52,
    backgroundColor: '#121215',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#ffffff',
    marginBottom: 16,
  },

  botao: {
    height: 54,
    backgroundColor: '#9333ea',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  caixaMensagem: {
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
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
});
