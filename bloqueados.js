import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';

export default function App() {
  const [pesquisa, setPesquisa] = useState('');

  const [filmes, setFilmes] = useState([
    {
      id: '1',
      nome: 'Filme 1',
      imagem: require('./assets/filme10.png'),
      bloqueado: true,
    },
    {
      id: '2',
      nome: 'Filme 2',
      imagem: require('./assets/filme11.png'),
      bloqueado: true,
    },
    {
      id: '3',
      nome: 'Filme 3',
      imagem: require('./assets/filme9.png'),
      bloqueado: true,
    },
    {
      id: '4',
      nome: 'Filme 4',
      imagem: require('./assets/filme11.png'),
      bloqueado: true,
    },
    {
      id: '5',
      nome: 'Filme 5',
      imagem: require('./assets/filme10.png'),
      bloqueado: true,
    },
    {
      id: '6',
      nome: 'Filme 6',
      imagem: require('./assets/filme1.png'),
      bloqueado: true,
    },
  ]);

  // Bloquear ou desbloquear um filme
  const alternarBloqueio = (id) => {
    setFilmes((anteriores) =>
      anteriores.map((filme) =>
        filme.id === id
          ? {
              ...filme,
              bloqueado: !filme.bloqueado,
            }
          : filme
      )
    );
  };

  // Filtrar filmes pela pesquisa
  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <View style={estilos.conteiner}>

      {/* CABEÇALHO */}
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
          style={estilos.logoCabecalho}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={estilos.conteudoRolagem}
      >

        {/* AVISO */}
        <View style={estilos.secaoAviso}>
          <Image
            style={estilos.iconePipoca}
            source={require('./assets/pbl.png')}
            resizeMode="cover"
          />

          <Text style={estilos.textoAviso}>
            Estes itens estão bloqueados.
            {'\n'}
            Desbloqueie-os para sorteá-los.
          </Text>
        </View>

        {/* BARRA DE PESQUISA */}
        <View style={estilos.caixaPesquisa}>
          <TextInput
            style={estilos.campoPesquisa}
            placeholder="Pesquisar filmes..."
            placeholderTextColor="#6b7280"
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          <Ionicons
            name="search"
            size={20}
            color="#a855f7"
          />
        </View>

        {/* GRADE DE FILMES */}
        <View style={estilos.gradeFilmes}>
          {filmesFiltrados.map((filme) => (
            <View
              key={filme.id}
              style={estilos.cartaoFilme}
            >

              {/* PÔSTER E CADEADO */}
              <View style={estilos.containerPoster}>
                <Image
                  source={filme.imagem}
                  style={estilos.posterFilme}
                  resizeMode="cover"
                />

                {filme.bloqueado && (
                  <View style={estilos.sobreposicaoBloqueio}>
                    <Ionicons
                      name="lock-closed"
                      size={26}
                      color="#a855f7"
                    />
                  </View>
                )}
              </View>

              {/* BOTÃO DE BLOQUEAR E DESBLOQUEAR */}
              <TouchableOpacity
                style={[
                  estilos.botaoAcao,
                  {
                    backgroundColor: filme.bloqueado
                      ? '#a855f7'
                      : '#22c55e',
                  },
                ]}
                onPress={() => alternarBloqueio(filme.id)}
              >
                <Ionicons
                  name={
                    filme.bloqueado
                      ? 'lock-open-outline'
                      : 'lock-closed-outline'
                  }
                  size={18}
                  color="#000000"
                />

              
        
              </TouchableOpacity>

            </View>
          ))}
        </View>

        {filmesFiltrados.length === 0 && (
          <Text style={estilos.mensagemVazia}>
            Nenhum filme encontrado.
          </Text>
        )}

      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO */}
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

  logoCabecalho: {
    width: 140,
    height: 40,
  },

  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  secaoAviso: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121215',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222226',
    padding: 12,
    marginBottom: 30,
  },

  iconePipoca: {
    width: 100,
    height: 100,
    marginRight: 12,
  },

  textoAviso: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
     alignText: 'center',
  },

  caixaPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 24,
  },

  campoPesquisa: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
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

  containerPoster: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },

  posterFilme: {
    width: '100%',
    height: 150,
  },

  sobreposicaoBloqueio: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoAcao: {
    borderRadius: 8,
    minHeight: 32,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },

  textoBotaoAcao: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },

  mensagemVazia: {
    color: '#ffffff',
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
});

