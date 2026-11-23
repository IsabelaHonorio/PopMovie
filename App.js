
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

import { supabase } from './lib/supabase';

import TelaInicial from './Tela_inicial';
import TelaLogin from './Tela_login';
import CadastroScreen from './cadastro';
import CadastroFavoritosScreen from './cadastroFavoritos';
import BuscaSemBarraScreen from './buscaSemBarra';
import BuscaComBarraScreen from './buscaComBarra';
import TelaPrincipal from './Tela_principal';
import ConteudoSorteadoScreen from './Conteudo_sorteado';
import DetalhesFilme from './DetalhesFilmes';
import MinhaListaScreen from './Minha_Lista';
import ConteudosAvaliadosScreen from './Conteudos_avaliados';
import PerfilScreen from './perfil';
import FiltrosScreen from './Filtros';
import { ThemeProvider } from './theme';
import RedefinirSenha from './redefinir_senha';

const Stack = createNativeStackNavigator();

// Prepara a sessão recebida pelo link de recuperação.
async function prepararSessaoRecuperacao(url) {
  if (Platform.OS === 'web') {
    return;
  }

  const urlRecebida = new URL(url);

  const parametrosQuery = new URLSearchParams(urlRecebida.search);
  const parametrosHash = new URLSearchParams(
    urlRecebida.hash.replace(/^#/, '')
  );

  const erro =
    parametrosQuery.get('error_description') ||
    parametrosHash.get('error_description');

  if (erro) {
    throw new Error(erro);
  }

  // Caso o Supabase envie um código PKCE.
  const code = parametrosQuery.get('code');

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw error;
    }

    return;
  }

  // Caso o Supabase envie os tokens diretamente.
  const access_token =
    parametrosQuery.get('access_token') ||
    parametrosHash.get('access_token');

  const refresh_token =
    parametrosQuery.get('refresh_token') ||
    parametrosHash.get('refresh_token');

  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      throw error;
    }

    return;
  }

  // Caso o link utilize token_hash.
  const token_hash =
    parametrosQuery.get('token_hash') ||
    parametrosHash.get('token_hash');

  const tipo =
    parametrosQuery.get('type') ||
    parametrosHash.get('type');

  if (token_hash && tipo === 'recovery') {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'recovery',
    });

    if (error) {
      throw error;
    }
  }
}

const linking = {
  prefixes: [Linking.createURL('/')],

  config: {
    screens: {
      RedefinirSenha: 'redefinir-senha',
    },
  },

  // No celular, prepara a sessão antes de abrir a tela.
  ...(Platform.OS !== 'web'
    ? {
        getInitialURL: async () => {
          const url = await Linking.getInitialURL();

          if (url) {
            try {
              await prepararSessaoRecuperacao(url);
            } catch (erro) {
              console.warn(
                'Erro ao preparar recuperação de senha:',
                erro.message
              );
            }
          }

          return url;
        },

        subscribe: (listener) => {
          const assinatura = Linking.addEventListener(
            'url',
            async ({ url }) => {
              try {
                await prepararSessaoRecuperacao(url);
              } catch (erro) {
                console.warn(
                  'Erro ao preparar recuperação de senha:',
                  erro.message
                );
              }

              listener(url);
            }
          );

          return () => assinatura.remove();
        },
      }
    : {}),
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Inicio" component={TelaInicial} />

          <Stack.Screen name="Login" component={TelaLogin} />

          <Stack.Screen
            name="RedefinirSenha"
            component={RedefinirSenha}
          />

          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
          />

          <Stack.Screen
            name="CadastroFavoritos"
            component={CadastroFavoritosScreen}
          />

          <Stack.Screen
            name="BuscaSemBarra"
            component={BuscaSemBarraScreen}
          />

          <Stack.Screen
            name="Principal"
            component={TelaPrincipal}
          />

          <Stack.Screen
            name="Buscar"
            component={BuscaComBarraScreen}
          />

          <Stack.Screen
            name="ConteudoSorteado"
            component={ConteudoSorteadoScreen}
          />

          <Stack.Screen
            name="DetalhesFilme"
            component={DetalhesFilme}
          />

          <Stack.Screen
            name="MinhaLista"
            component={MinhaListaScreen}
          />

          <Stack.Screen
            name="ConteudosAvaliados"
            component={ConteudosAvaliadosScreen}
          />

          <Stack.Screen
            name="Perfil"
            component={PerfilScreen}
          />

          <Stack.Screen
            name="Filtros"
            component={FiltrosScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
