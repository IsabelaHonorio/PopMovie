import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './theme';

export default function AlterarAvatar({
  voltar,
  fotoPerfil,
  setFotoPerfil,
  navigation,
}) {
  const {
    background,
    border,
    primary,
    primaryDark,
    surface,
    text,
    textSoft,
  } = useTheme();
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

  const indiceAvatarAtual = avatares.findIndex(
    (avatar) => avatar.imagem === fotoPerfil
  );
  const [avatarSelecionado, setAvatarSelecionado] = useState(
    indiceAvatarAtual >= 0 ? indiceAvatarAtual : 0
  );

  const voltarParaPerfil = () => {
    if (voltar) {
      voltar();
      return;
    }

    navigation?.goBack();
  };

  const confirmarAvatar = () => {
    setFotoPerfil?.(avatares[avatarSelecionado].imagem);
    voltarParaPerfil();
  };

  return (
    <View style={[estilos.conteiner, { backgroundColor: background }]}>
      <StatusBar
        barStyle={background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={background}
      />

      {/* Cabeçalho */}
      <View style={estilos.cabecalho}>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          activeOpacity={0.7}
          onPress={voltarParaPerfil}
          accessibilityLabel="Voltar ao perfil"
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={primary}
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
        <Text style={[estilos.tituloTela, { color: primary }]}>
          Alterar foto de perfil
        </Text>

        <Text style={[estilos.descricao, { color: textSoft }]}>
          Escolha o avatar que mais combina com você!
        </Text>

        {/* Avatar selecionado */}
        <View style={estilos.secaoAvatarAtual}>
          <View
            style={[
              estilos.molduraAvatarAtual,
              { borderColor: primary, backgroundColor: surface },
            ]}
          >
            <Image
              source={avatares[avatarSelecionado].imagem}
              style={estilos.fotoAvatarAtual}
              resizeMode="cover"
            />
          </View>

          <Text style={[estilos.etiquetaAtual, { color: primary }]}>
            AVATAR SELECIONADO
          </Text>
        </View>

        <View style={estilos.divisor} />

        {/* Opções */}
        <Text style={[estilos.subtituloOpcoes, { color: text }]}>
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
                avatarSelecionado === indice && {
                  borderColor: primary,
                  backgroundColor: primaryDark,
                },
                { backgroundColor: surface, borderColor: border },
                avatarSelecionado === indice && { borderColor: primary, backgroundColor: primaryDark },
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
                <View
                  style={[
                    estilos.marcaSelecao,
                    { backgroundColor: primary },
                  ]}
                >
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
          style={[
            estilos.botaoConfirmar,
            { backgroundColor: primary },
          ]}
          activeOpacity={0.8}
          onPress={confirmarAvatar}
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
    paddingTop: 10,
  },

  cabecalho: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    position: 'relative',
  },

  botaoVoltar: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    zIndex: 1,
  },

  logo: {
    width: 180,
    height: 75,
  },

  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },

  secaoAvatarAtual: {
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 17,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },

  gradeAvatares: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },

  itemAvatar: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: 3,
    position: 'relative',
  },

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
    width: '100%',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotaoConfirmar: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
