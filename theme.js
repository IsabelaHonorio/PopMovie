
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { StyleSheet } from 'react-native';
import { supabase } from './lib/supabase';

const DEFAULT_PRIMARY = '#963BFF';
const DEFAULT_BACKGROUND = 'dark';

export const THEME_OPTIONS = [
  { name: 'Roxo', primary: DEFAULT_PRIMARY, primaryDark: '#7A2DE8' },
  { name: 'Rosa', primary: '#FF69B4', primaryDark: '#D94691' },
  { name: 'Azul', primary: '#00A5CF', primaryDark: '#0085A8' },
];

export const BACKGROUND_OPTIONS = [
  { name: 'Preto', value: 'dark', background: '#000000', text: '#FFFFFF' },
  { name: 'Branco', value: 'light', background: '#FFFFFF', text: '#000000' },
];

const TEMAS_BANCO = {
  1: { primary: '#963BFF', backgroundMode: 'dark' },
  2: { primary: '#FF69B4', backgroundMode: 'dark' },
  3: { primary: '#00A5CF', backgroundMode: 'dark' },
  4: { primary: '#963BFF', backgroundMode: 'light' },
  5: { primary: '#FF69B4', backgroundMode: 'light' },
  6: { primary: '#00A5CF', backgroundMode: 'light' },
};

const ThemeContext = createContext({
  primary: DEFAULT_PRIMARY,
  primaryDark: '#7A2DE8',
  backgroundMode: DEFAULT_BACKGROUND,
  background: '#000000',
  text: '#FFFFFF',
  textSoft: '#D9D4DD',
  border: '#2A2A2F',
  surface: '#121215',
  surfaceElevated: '#202020',
  setPrimary: () => {},
  setBackgroundMode: () => {},
  salvarTema: async () => {},
});

export function ThemeProvider({ children }) {
  const [primary, setPrimary] = useState(DEFAULT_PRIMARY);
  const [backgroundMode, setBackgroundMode] = useState(DEFAULT_BACKGROUND);

  // RESTAURAR TEMA PADRÃO
  function restaurarTemaPadrao() {
    setPrimary(DEFAULT_PRIMARY);
    setBackgroundMode(DEFAULT_BACKGROUND);
  }

  // CARREGAR O TEMA DA CONTA ATUAL
  useEffect(() => {
    let ativo = true;
    let numeroRequisicao = 0;

    async function carregarTema(idUsuario) {
      const requisicaoAtual = ++numeroRequisicao;

      // Enquanto consulta a conta, utiliza o tema padrão.
      restaurarTemaPadrao();

      if (!idUsuario) return;

      try {
        const { data, error } = await supabase
          .from('usuario')
          .select('tema')
          .eq('id_usuario', idUsuario)
          .maybeSingle();

        if (error) throw error;

        // Impede que uma resposta antiga altere o tema da conta atual.
        if (!ativo || requisicaoAtual !== numeroRequisicao) return;

        if (data?.tema == null) {
          restaurarTemaPadrao();
          return;
        }

        const temaSalvo = TEMAS_BANCO[data.tema];

        if (temaSalvo) {
          setPrimary(temaSalvo.primary);
          setBackgroundMode(temaSalvo.backgroundMode);
        } else {
          restaurarTemaPadrao();
        }
      } catch (erro) {
        console.error('Erro ao carregar tema:', erro);

        if (ativo && requisicaoAtual === numeroRequisicao) {
          restaurarTemaPadrao();
        }
      }
    }

    // OBSERVA LOGIN, LOGOUT E RECUPERAÇÃO DA SESSÃO
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((evento, sessao) => {
      if (
        evento === 'INITIAL_SESSION' ||
        evento === 'SIGNED_IN' ||
        evento === 'SIGNED_OUT'
      ) {
        if (sessao?.user) {
          carregarTema(sessao.user.id);
        } else {
          numeroRequisicao++;
          restaurarTemaPadrao();
        }
      }
    });

    // CONSULTA A SESSÃO EXISTENTE AO ABRIR O APLICATIVO
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Erro ao recuperar sessão:', error);
        return;
      }

      if (!ativo) return;

      if (data?.session?.user) {
        carregarTema(data.session.user.id);
      } else {
        numeroRequisicao++;
        restaurarTemaPadrao();
      }
    });

    return () => {
      ativo = false;
      numeroRequisicao++;
      subscription.unsubscribe();
    };
  }, []);

  const selectedTheme =
    THEME_OPTIONS.find((option) => option.primary === primary) ||
    THEME_OPTIONS[0];

  const isLight = backgroundMode === 'light';

  // SALVAR TEMA NO SUPABASE
  const value = useMemo(() => {
    async function salvarTema(novaCor, novoFundo) {
      const codigoTema = Object.keys(TEMAS_BANCO).find((codigo) => {
        const tema = TEMAS_BANCO[codigo];

        return (
          tema.primary === novaCor &&
          tema.backgroundMode === novoFundo
        );
      });

      if (!codigoTema) {
        throw new Error('Combinação de tema inválida.');
      }

      const { data: dadosUsuario, error: erroUsuario } =
        await supabase.auth.getUser();

      if (erroUsuario) throw erroUsuario;

      const usuario = dadosUsuario?.user;

      if (!usuario) {
        throw new Error('Você precisa estar logado para salvar o tema.');
      }

      const { data, error } = await supabase
        .from('usuario')
        .update({ tema: Number(codigoTema) })
        .eq('id_usuario', usuario.id)
        .select('tema')
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        throw new Error(
          'Não foi possível atualizar o tema no Supabase. Verifique o cadastro e as permissões da tabela usuario.'
        );
      }

      setPrimary(novaCor);
      setBackgroundMode(novoFundo);
    }

    return {
      primary: selectedTheme.primary,
      primaryDark: selectedTheme.primaryDark,
      backgroundMode,
      background: isLight ? '#FFFFFF' : '#000000',
      text: isLight ? '#000000' : '#FFFFFF',
      textSoft: isLight ? '#555555' : '#D9D4DD',
      border: isLight ? '#D1D1D6' : '#2A2A2F',
      surface: isLight ? '#F2F2F5' : '#121215',
      surfaceElevated: isLight ? '#E5E5EA' : '#202020',
      setPrimary,
      setBackgroundMode,
      salvarTema,
    };
  }, [backgroundMode, isLight, selectedTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const COLORS = {
  background: '#000000',
  primary: DEFAULT_PRIMARY,
  primaryDark: '#7A2DE8',
  text: '#FFFFFF',
  textSoft: '#D9D4DD',
  border: '#2A2A2F',
  white: '#FFFFFF',
  black: '#000000',
  input: '#FFFFFF',
  inputText: '#111111',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 260,
    height: 91,
    resizeMode: 'contain',
  },

  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    color: COLORS.textSoft,
    fontSize: 16,
    textAlign: 'center',
  },

  label: {
    width: '100%',
    maxWidth: 360,
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 6,
  },

  input: {
    width: '100%',
    maxWidth: 360,
    height: 46,
    backgroundColor: COLORS.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    color: COLORS.inputText,
    fontSize: 16,
    marginBottom: 18,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },

  backButton: {
    position: 'absolute',
    top: 30,
    left: 22,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  backArrow: {
    color: COLORS.primary,
    fontSize: 46,
    lineHeight: 46,
    marginTop: -7,
  },
});
