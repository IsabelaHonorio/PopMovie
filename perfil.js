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

import { Ionicons, Feather } from '@expo/vector-icons';

export default function App() {
  const [filmesFavoritos, setFilmesFavoritos] = useState([
    { id: '1', imagem: require('./assets/filme01.png') },
    { id: '2', imagem: require('./assets/filme02.png') },
    { id: '3', imagem: require('./assets/filme03.png') },
    { id: '4', imagem: require('./assets/filme04.png') },
  ]);

  // Remove o filme selecionado dos favoritos
  function desfavoritar(id) {
    setFilmesFavoritos((anteriores) =>
      anteriores.filter((filme) => filme.id !== id)
    );
  }

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
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#a855f7"
          />
        </TouchableOpacity>

        <Image
          source={require('./assets/PopMovielogo.png')}
          style={estilos.imagem}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estilos.conteudoRolagem}
      >
        {/* Seção do Perfil */}
        <View style={estilos.secaoPerfil}>
          <Image
            source={require('./assets/6.png')}
            style={estilos.fotoPerfil}
          />

          <View style={estilos.infoPerfil}>
            <Text style={estilos.saudacao}>
              Olá, Pedro!
            </Text>

            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
              style={estilos.iconeMargem}
            />
          </View>
        </View>

        {/* Opções de configuração */}
        <View style={estilos.listaOpcoes}>
          <TouchableOpacity style={estilos.itemOpcao}>
            <Text style={estilos.textoOpcao}>
              Alterar senha
            </Text>
            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
            />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemOpcao}>
            <Text style={estilos.textoOpcao}>
              Alterar tema
            </Text>
            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
            />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemOpcao}>
            <Text style={estilos.textoOpcao}>
              Conteúdos bloqueados
            </Text>
            <Feather
              name="edit-2"
              size={16}
              color="#a855f7"
            />
          </TouchableOpacity>
        </View>

        {/* Título Favoritos */}
        <Text style={estilos.tituloSecao}>
          Favoritos
        </Text>

        {/* Grade de filmes favoritos */}
        <View style={estilos.gradeFilmes}>
          {filmesFavoritos.map((filme) => (
            <View
              key={filme.id}
              style={estilos.cartaoFilme}
            >
             
              
                <Image
                  source={filme.imagem}
                  style={estilos.posterFilme}
                />
         

              {/* Clicar no coração também remove */}
              <TouchableOpacity
                style={estilos.botaoFavorito}
                onPress={() => desfavoritar(filme.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="heart"
                  size={18}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Mensagem quando não houver favoritos */}
        {filmesFavoritos.length === 0 && (
          <Text style={estilos.mensagemVazia}>
            Você ainda não tem filmes favoritos.
          </Text>
        )}
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={estilos.barraNavegacao}>
        <TouchableOpacity style={estilos.itemNav}>
          <Ionicons
            name="home-outline"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemNav}>
          <Ionicons
            name="list-outline"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemNav}>
          <Feather
            name="check"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemNav}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#a855f7"
          />
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
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

  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  secaoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  fotoPerfil: {
    width: 65,
    height: 65,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#a855f7',
    marginRight: 16,
  },

  infoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  saudacao: {
    color: '#a855f7',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },

  iconeMargem: {
    marginLeft: 4,
  },

  listaOpcoes: {
    marginBottom: 28,
  },

  itemOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  textoOpcao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },

  tituloSecao: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  gradeFilmes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  cartaoFilme: {
    width: '31%',
    marginBottom: 16,
  },

  posterFilme: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
  },

  botaoFavorito: {
    backgroundColor: '#a855f7',
    borderRadius: 8,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemVazia: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },

  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0a0a0c',
    borderTopWidth: 1,
    borderTopColor: '#1f1f23',
    height: 60,
  },

  itemNav: {
    padding: 10,
  },

  imagem: {
    width: 180,
    height: 140,
    resizeMode: 'contain',
    marginTop: -30,
  },
});
