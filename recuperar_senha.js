import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Variável de estado para armazenar o e-mail digitado
  const [emailDigitado, setEmailDigitado] = useState('');  

  return (
    <View style={estilos.conteiner}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Cabeçalho com botão de voltar e título */}
      <View style={estilos.cabecalho}>
        <TouchableOpacity style={estilos.botaoVoltar} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#a855f7" />
        </TouchableOpacity>
        <Text style={estilos.tituloCabecalho}>Esqueceu sua Senha</Text>
      </View>

      {/* Texto descritivo */}
      <Text style={estilos.descricao}>
        Digite seu e-mail para receber um link{'\n'}para criar uma nova senha.
      </Text>

      {/* Campo de E-mail */}
      <View style={estilos.caixaEntrada}>
        <Ionicons name="mail-outline" size={20} color="#6b7280" style={estilos.icone} />
        <TextInput
          style={estilos.campoTexto}
          placeholder="Seu e-mail"
          placeholderTextColor="#6b7280"
          value={emailDigitado}
          onChangeText={setEmailDigitado}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Botão Enviar Link */}
      <TouchableOpacity style={estilos.botaoEnviar} activeOpacity={0.8} onPress={() => alert('Link enviado!')}>
        <Text style={estilos.textoBotao}>Enviar link</Text>
      </TouchableOpacity>
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
});
