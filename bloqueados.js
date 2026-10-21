import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function App() {
  const [pesquisa, setPesquisa] = useState('');

  return (
    <SafeAreaView style={estilos.conteiner}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
     
      <View style={estilos.cabecalho}>
        <TouchableOpacity style={estilos.botaoVoltar} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#a855f7" />
        </TouchableOpacity>
        <Text style={estilos.logoTexto}>Pop<Text style={estilos.logoDestaque}>Movie</Text></Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.conteudoRolagem}>
        
        
        <View style={estilos.secaoAviso}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1585647347385-251f45695a78?w=150' }} 
            style={estilos.iconePipoca} 
          />
          <Text style={estilos.textoAviso}>
            Estes itens estão bloqueados.{'\n'}Desbloqueie-os para sorteá-los.
          </Text>
        </View>

        {/* Barra de Pesquisa */}
        <View style={estilos.caixaPesquisa}>
          <TextInput
            style={estilos.campoPesquisa}
            placeholder=""
            placeholderTextColor="#6b7280"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          <Ionicons name="search" size={20} color="#a855f7" />
        </View>

        {/* Grade de Filmes Bloqueados */}
        <View style={estilos.gradeFilmes}>
          
          {/* Filme 1 */}
          <View style={estilos.cartaoFilme}>
            <View style={estilos.containerPoster}>
              <Image 
                source={{ uri: 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg' }} 
                style={estilos.posterFilme} 
              />
              <View style={estilos.sobreposicaoBloqueio}>
                <Ionicons name="lock-closed" size={26} color="#a855f7" />
              </View>
            </View>
            <TouchableOpacity style={estilos.botaoAcao}>
              <Ionicons name="lock-open-outline" size={18} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Filme 2 */}
          <View style={estilos.cartaoFilme}>
            <View style={estilos.containerPoster}>
              <Image 
                source={{ uri: 'https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg' }} 
                style={estilos.posterFilme} 
              />
              <View style={estilos.sobreposicaoBloqueio}>
                <Ionicons name="lock-closed" size={26} color="#a855f7" />
              </View>
            </View>
            <TouchableOpacity style={estilos.botaoAcao}>
              <Ionicons name="lock-open-outline" size={18} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Filme 3 */}
          <View style={estilos.cartaoFilme}>
            <View style={estilos.containerPoster}>
              <Image 
                source={{ uri: 'https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg' }} 
                style={estilos.posterFilme} 
              />
              <View style={estilos.sobreposicaoBloqueio}>
                <Ionicons name="lock-closed" size={26} color="#a855f7" />
              </View>
            </View>
            <TouchableOpacity style={estilos.botaoAcao}>
              <Ionicons name="lock-open-outline" size={18} color="#000000" />
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <View style={estilos.barraNavegacao}>
        <TouchableOpacity style={estilos.itemNav}>
          <Ionicons name="home-outline" size={24} color="#a855f7" />
        </TouchableOpacity>
        <TouchableOpacity style={estilos.itemNav}>
          <Ionicons name="list-outline" size={24} color="#a855f7" />
        </TouchableOpacity>
        <TouchableOpacity style={estilos.itemNav}>
          <Feather name="check" size={24} color="#a855f7" />
        </TouchableOpacity>
        <TouchableOpacity style={estilos.itemNav}>
          <Ionicons name="person-outline" size={24} color="#a855f7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  logoTexto: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoDestaque: {
    color: '#eab308',
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
    marginBottom: 20,
  },
  iconePipoca: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textoAviso: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
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
    backgroundColor: '#a855f7',
    borderRadius: 8,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
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
