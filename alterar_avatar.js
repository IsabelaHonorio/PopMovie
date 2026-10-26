import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Avatares salvos na pasta assets
  const avatares = [
    { id: '10', imagem: require('./assets/avatar/10.png') },
    { id: '11', imagem: require('./assets/avatar/11.png') },
    { id: '18', imagem: require('./assets/avatar/18.png') },
    { id: '19', imagem: require('./assets/avatar/19.png') },
    { id: '3', imagem: require('./assets/avatar/3.png') },
    { id: '30', imagem: require('./assets/avatar/30.png') },
    { id: '5', imagem: require('./assets/avatar/5.png') },
    { id: '6', imagem: require('./assets/avatar/6.png') },
    { id: '13', imagem: require('./assets/avatar/15.png') },
  ];

  // Começa com o primeiro avatar selecionado
  const [avatarSelecionado, setAvatarSelecionado] = useState(0);

  return (
    <View style={estilos.conteiner}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      {/* Cabeçalho */}
      <View style={estilos.cabecalho}>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          activeOpacity={0.7}
          onPress={() => Alert.alert('Voltar', 'Botão voltar pressionado!')}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#a855f7"
          />
        </TouchableOpacity>

        <Image
          style={estilos.logo}
          source={require('./assets/PopMovielogo.png')}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estilos.conteudoRolagem}
      >
        {/* Título */}
        <Text style={estilos.tituloTela}>
          Alterar foto de perfil
        </Text>

        <Text style={estilos.descricao}>
          Escolha o avatar que mais combina com você!
        </Text>

        {/* Avatar selecionado */}
        <View style={estilos.secaoAvatarAtual}>
          <View style={estilos.molduraAvatarAtual}>
            <Image
              source={avatares[avatarSelecionado].imagem}
              style={estilos.fotoAvatarAtual}
              resizeMode="cover"
            />
          </View>

          <Text style={estilos.etiquetaAtual}>
            AVATAR SELECIONADO
          </Text>
        </View>

        <View style={estilos.divisor} />

        {/* Opções */}
        <Text style={estilos.subtituloOpcoes}>
          Escolha seu novo avatar:
        </Text>

        {/* Grade de avatares redondos */}
        <View style={estilos.gradeAvatares}>
          {avatares.map((avatar, indice) => (
            <TouchableOpacity
              key={avatar.id}
              style={[
                estilos.itemAvatar,
                avatarSelecionado === indice &&
                  estilos.avatarSelecionadoContainer,
              ]}
              onPress={() => setAvatarSelecionado(indice)}
              activeOpacity={0.75}
            >
              <Image
                source={avatar.imagem}
                style={estilos.fotoAvatarOpcao}
                resizeMode="cover"
              />

              {avatarSelecionado === indice && (
                <View style={estilos.marcaSelecao}>
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#ffffff"
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirmar */}
        <TouchableOpacity
          style={estilos.botaoConfirmar}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Sucesso!',
              'Seu avatar foi selecionado!'
            )
          }
        >
          <Text style={estilos.textoBotaoConfirmar}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 10,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  botaoVoltar: {
    width: 38,
    height: 38,
    backgroundColor: '#121215',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222226',
    marginRight: 16,
  },

  logo: {
    width: 180,
    height: 75,
  },

  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },

  tituloTela: {
    color: '#a855f7',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  descricao: {
    color: '#9ca3af',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
  },

  secaoAvatarAtual: {
    alignItems: 'center',
    marginBottom: 16,
  },

  molduraAvatarAtual: {
    width: 125,
    height: 125,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#a855f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    marginBottom: 10,
    backgroundColor: '#121215',
    overflow: 'hidden',
  },

  fotoAvatarAtual: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },

  etiquetaAtual: {
    color: '#a855f7',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#1f1f23',
    marginVertical: 20,
  },

  subtituloOpcoes: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  gradeAvatares: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },

  itemAvatar: {
    width: '22%',
    aspectRatio: 1,
    marginBottom: 18,
    marginRight: '4%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121215',
    borderWidth: 2,
    borderColor: '#29252f',
    padding: 3,
    position: 'relative',
  },

  // Remove a margem direita do quarto item de cada linha
  fotoAvatarOpcao: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },

  avatarSelecionadoContainer: {
    borderWidth: 3,
    borderColor: '#a855f7',
    backgroundColor: '#1e1b2e',
  },

  marcaSelecao: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#9333ea',
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoConfirmar: {
    backgroundColor: '#9333ea',
    height: 52,
    width: '85%',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotaoConfirmar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
