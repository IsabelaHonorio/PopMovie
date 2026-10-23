
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

const generos = [
  'Todos', 'Ação', 'Aventura',
  'Animação', 'Comédia', 'Drama',
  'Terror', 'Suspense', 'Fantasia',
  'Ficção Científica', 'Romance',
  'Crime', 'Documentário',
];

const duracoes = [
  'Qualquer duração', 'Até 1h',
  '1h - 1h30', '2h - 2h30',
  '1h30 - 2h', '2h30+',
];

const plataformas = [
  'Todos', 'Netflix', 'Prime Video',
  'Max', 'Disney+', 'Outra',
];

const anos = [
  'Todos', 'Antes de 2000',
  '2000 - 2009', '2010 - 2019',
  '2020 - 2024', '2025+',
];

function FiltroCard({
  titulo,
  subtitulo,
  opcoes,
  selecionados,
  onSelecionar,
  tipo = 'multi',
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{titulo}</Text>

      {subtitulo ? (
        <Text style={styles.subtitle}>{subtitulo}</Text>
      ) : null}

      <View style={styles.options}>
        {opcoes.map((opcao) => {
          const ativo = selecionados.includes(opcao);

          return (
            <Pressable
              key={opcao}
              onPress={() => onSelecionar(opcao)}
              style={[
                styles.option,
                ativo && styles.optionActive,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: ativo }}
            >
              <Text
                style={[
                  styles.optionText,
                  ativo && styles.optionTextActive,
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {opcao}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function FiltrosScreen() {
  const [generosSelecionados, setGenerosSelecionados] =
    useState(['Todos']);

  const [duracaoSelecionada, setDuracaoSelecionada] =
    useState(['Qualquer duração']);

  const [plataformasSelecionadas, setPlataformasSelecionadas] =
    useState(['Todos']);

  const [anosSelecionados, setAnosSelecionados] =
    useState(['Todos']);

  function alternar(opcao, selecionados, setSelecionados, tipo = 'multi') {
    if (tipo === 'single') {
      setSelecionados([opcao]);
      return;
    }

    if (opcao === 'Todos' || opcao === 'Qualquer duração') {
      setSelecionados([opcao]);
      return;
    }

    const base = selecionados.filter(
      item => item !== 'Todos' && item !== 'Qualquer duração'
    );

    const novos = base.includes(opcao)
      ? base.filter(item => item !== opcao)
      : [...base, opcao];

    setSelecionados(novos.length ? novos : ['Todos']);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#000000"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          accessibilityLabel="Voltar"
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Filtros</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <FiltroCard
          titulo="Gênero"
          subtitulo="Escolha um ou mais gêneros"
          opcoes={generos}
          selecionados={generosSelecionados}
          onSelecionar={opcao =>
            alternar(opcao, generosSelecionados, setGenerosSelecionados)
          }
        />

        <FiltroCard
          titulo="Duração"
          opcoes={duracoes}
          selecionados={duracaoSelecionada}
          onSelecionar={opcao =>
            alternar(opcao, duracaoSelecionada, setDuracaoSelecionada, 'single')
          }
          tipo="single"
        />

        <FiltroCard
          titulo="Plataforma de Streaming"
          opcoes={plataformas}
          selecionados={plataformasSelecionadas}
          onSelecionar={opcao =>
            alternar(opcao, plataformasSelecionadas, setPlataformasSelecionadas)
          }
        />

        <FiltroCard
          titulo="Ano de lançamento"
          opcoes={anos}
          selecionados={anosSelecionados}
          onSelecionar={opcao =>
            alternar(opcao, anosSelecionados, setAnosSelecionados)
          }
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.applyButton}
          onPress={() => {}}
        >
          <Text style={styles.applyText}>Aplicar Filtros</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 40,
    top: 26,
    zIndex: 1,
    width: 32,
    height: 40,
    justifyContent: 'center',
  },

  backArrow: {
    color: '#963BFF',
    fontSize: 48,
    lineHeight: 48,
    marginTop: -7,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 46,
    fontWeight: '700',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: '#C800FF',
    borderRadius: 22,
    backgroundColor: '#080008',
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 11,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 41,
    marginTop: 1,
    marginBottom: 10,
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 9,
    marginTop: 10,
  },

  option: {
    minHeight: 29,
    paddingHorizontal: 13,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#963BFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    flexGrow: 1,
  },

  optionActive: {
    backgroundColor: '#963BFF',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  optionTextActive: {
    color: '#FFFFFF',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 105,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  applyButton: {
    backgroundColor: '#963BFF',
    borderRadius: 40,
    paddingHorizontal: 12,
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#963BFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },

  applyText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '600',
  },
});
