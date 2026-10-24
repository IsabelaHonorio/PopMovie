import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { COLORS, commonStyles } from './theme';

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
              style={[styles.option, ativo && styles.optionActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: ativo }}
            >
              <Text
                style={[styles.optionText, ativo && styles.optionTextActive]}
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

export default function FiltrosScreen({ navigation, route }) {
  const { apelido, senha } = route.params || {};
  const voltarParaPrincipal = () => navigation.navigate('Principal', { apelido, senha });

  const [generosSelecionados, setGenerosSelecionados] = useState(['Todos']);
  const [duracaoSelecionada, setDuracaoSelecionada] = useState(['Qualquer duração']);
  const [plataformasSelecionadas, setPlataformasSelecionadas] = useState(['Todos']);
  const [anosSelecionados, setAnosSelecionados] = useState(['Todos']);

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
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <View style={styles.header}>
        <Pressable style={commonStyles.backButton} accessibilityLabel="Voltar" onPress={voltarParaPrincipal}>
          <Text style={commonStyles.backArrow}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Filtros</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        <FiltroCard
          titulo="Gênero"
          subtitulo="Escolha um ou mais gêneros"
          opcoes={generos}
          selecionados={generosSelecionados}
          onSelecionar={opcao => alternar(opcao, generosSelecionados, setGenerosSelecionados)}
        />

        <FiltroCard
          titulo="Duração"
          opcoes={duracoes}
          selecionados={duracaoSelecionada}
          onSelecionar={opcao => alternar(opcao, duracaoSelecionada, setDuracaoSelecionada, 'single')}
        />

        <FiltroCard
          titulo="Plataforma de Streaming"
          opcoes={plataformas}
          selecionados={plataformasSelecionadas}
          onSelecionar={opcao => alternar(opcao, plataformasSelecionadas, setPlataformasSelecionadas)}
        />

        <FiltroCard
          titulo="Ano de lançamento"
          opcoes={anos}
          selecionados={anosSelecionados}
          onSelecionar={opcao => alternar(opcao, anosSelecionados, setAnosSelecionados)}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.applyButton} onPress={voltarParaPrincipal}>
          <Text style={styles.applyText}>Aplicar Filtros</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: COLORS.text,
    fontSize: 42,
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
    borderColor: COLORS.primary,
    borderRadius: 22,
    backgroundColor: '#080008',
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 11,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    color: COLORS.textSoft,
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
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },

  optionActive: {
    backgroundColor: COLORS.primary,
  },

  optionText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },

  optionTextActive: {
    color: COLORS.white,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 105,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    paddingHorizontal: 12,
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },

  applyText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '600',
  },
});
