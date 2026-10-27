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
import {
  BACKGROUND_OPTIONS,
  THEME_OPTIONS,
  useTheme,
} from './theme';

export default function AlterarTemaScreen({ navigation, route, voltar }) {
  const { apelido, senha } = route?.params || {};
  const {
    background,
    backgroundMode,
    border,
    primary,
    setBackgroundMode,
    setPrimary,
    surface,
    text,
    textSoft,
  } = useTheme();
  const [corSelecionada, setCorSelecionada] = useState(primary);
  const [fundoSelecionado, setFundoSelecionado] = useState(backgroundMode);
  const temaAtual = THEME_OPTIONS.find((tema) => tema.primary === primary);
  const fundoAtual = BACKGROUND_OPTIONS.find(
    (opcao) => opcao.value === backgroundMode
  );

  const voltarParaPerfil = () => {
    if (typeof voltar === 'function') {
      voltar();
      return;
    }

    if (navigation && typeof navigation.goBack === 'function' && navigation.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Perfil', { apelido, senha });
      return;
    }
  };

  const aplicarTema = () => {
    setPrimary(corSelecionada);
    setBackgroundMode(fundoSelecionado);
    voltarParaPerfil();
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <StatusBar
        barStyle={backgroundMode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={background}
      />

      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          activeOpacity={0.7}
          onPress={voltarParaPerfil}
          accessibilityLabel="Voltar ao perfil"
        >
          <Ionicons name="chevron-back" size={22} color={primary} />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require('./assets/PopMovielogo.png')}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={[styles.titulo, { color: primary }]}>Alterar tema</Text>
        <Text style={[styles.descricao, { color: textSoft }]}>
          Personalize a cor principal do PopMovie.
        </Text>

        <View style={[styles.cartaoAtual, { backgroundColor: surface, borderColor: border }]}>
          <Text style={[styles.rotuloAtual, { color: textSoft }]}>TEMA ATUAL</Text>

          <View style={styles.linhaTemaAtual}>
            <View style={[styles.amostraAtual, { backgroundColor: primary }]} />
            <View style={styles.infoTemaAtual}>
              <Text style={[styles.nomeTemaAtual, { color: text }]}>
                {temaAtual?.name || 'Roxo'}
              </Text>
              <Text style={[styles.codigoCor, { color: textSoft }]}>
                {primary.toUpperCase()}
              </Text>
            </View>
            <Ionicons name="checkmark-circle" size={25} color={primary} />
          </View>
        </View>

        <View style={styles.secaoTemas}>
          <Text style={[styles.subtitulo, { color: text }]}>Escolha uma cor</Text>
          <Text style={[styles.ajuda, { color: textSoft }]}>
            A cor escolhida será usada nos destaques do aplicativo.
          </Text>

          <View style={styles.gradeTemas}>
            {THEME_OPTIONS.map((tema) => {
              const selecionado = corSelecionada === tema.primary;

              return (
                <TouchableOpacity
                  key={tema.primary}
                  style={[
                    styles.cartaoTema,
                    { backgroundColor: surface, borderColor: border },
                    selecionado && {
                      borderColor: tema.primary,
                    },
                  ]}
                  onPress={() => setCorSelecionada(tema.primary)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`Selecionar tema ${tema.name}`}
                  accessibilityState={{ selected: selecionado }}
                >
                  <View
                    style={[
                      styles.amostraTema,
                      { backgroundColor: tema.primary },
                    ]}
                  >
                    {selecionado && (
                      <Ionicons name="checkmark" size={23} color="#FFFFFF" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.nomeTema,
                      { color: text },
                      selecionado && { color: tema.primary },
                    ]}
                  >
                    {tema.name}
                  </Text>
                  <Text style={[styles.codigoTema, { color: textSoft }]}>
                    {tema.primary.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.secaoFundo}>
          <Text style={[styles.subtitulo, { color: text }]}>
            Escolha o fundo
          </Text>
          <Text style={[styles.ajuda, { color: textSoft }]}>
            O texto se ajusta automaticamente ao fundo selecionado.
          </Text>

          <View style={styles.gradeFundos}>
            {BACKGROUND_OPTIONS.map((opcao) => {
              const selecionado = fundoSelecionado === opcao.value;

              return (
                <TouchableOpacity
                  key={opcao.value}
                  style={[
                    styles.cartaoFundo,
                    {
                      backgroundColor: opcao.background,
                      borderColor: selecionado ? primary : border,
                    },
                    selecionado && styles.cartaoFundoSelecionado,
                  ]}
                  onPress={() => setFundoSelecionado(opcao.value)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`Selecionar fundo ${opcao.name}`}
                  accessibilityState={{ selected: selecionado }}
                >
                  <View
                    style={[
                      styles.amostraFundo,
                      { backgroundColor: opcao.background },
                    ]}
                  >
                    {selecionado && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={primary}
                      />
                    )}
                  </View>
                  <Text style={[styles.nomeFundo, { color: opcao.text }]}>
                    {opcao.name}
                  </Text>
                  <Text style={[styles.exemploFundo, { color: opcao.text }]}>
                    Aa
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.fundoAtual, { color: textSoft }]}>
            Fundo atual: {fundoAtual?.name || 'Preto'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.botaoAplicar,
            { backgroundColor: corSelecionada, shadowColor: corSelecionada },
          ]}
          onPress={aplicarTema}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Aplicar tema</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    top: 18,
    left: 20,
    width: 38,
    height: 38,
    backgroundColor: '#121215',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#29252F',
    zIndex: 1,
  },

  logo: {
    width: 180,
    height: 75,
  },

  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },

  cartaoAtual: {
    width: '100%',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  rotuloAtual: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 14,
  },

  linhaTemaAtual: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  amostraAtual: {
    width: 46,
    height: 46,
    borderRadius: 14,
  },

  infoTemaAtual: {
    flex: 1,
    marginLeft: 13,
  },

  nomeTemaAtual: {
    fontSize: 17,
    fontWeight: '600',
  },

  codigoCor: {
    fontSize: 12,
    marginTop: 3,
    letterSpacing: 0.5,
  },

  secaoTemas: {
    width: '100%',
    marginTop: 30,
  },

  subtitulo: {
    fontSize: 17,
    fontWeight: '600',
  },

  ajuda: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  gradeTemas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },

  cartaoTema: {
    flex: 1,
    minHeight: 126,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 16,
    borderWidth: 1.5,
  },

  amostraTema: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  nomeTema: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  codigoTema: {
    fontSize: 10,
    marginTop: 3,
  },

  secaoFundo: {
    width: '100%',
    marginTop: 28,
  },

  gradeFundos: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },

  cartaoFundo: {
    flex: 1,
    minHeight: 112,
    borderRadius: 16,
    borderWidth: 2,
    padding: 14,
    justifyContent: 'space-between',
  },

  cartaoFundoSelecionado: {
    borderWidth: 2.5,
  },

  amostraFundo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nomeFundo: {
    fontSize: 15,
    fontWeight: '700',
  },

  exemploFundo: {
    fontSize: 13,
  },

  fundoAtual: {
    fontSize: 12,
    marginTop: 10,
  },

  botaoAplicar: {
    width: '100%',
    minHeight: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 7,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
