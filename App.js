import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from './Tela_inicial';
import TelaLogin from './Tela_login';
import CadastroScreen from './cadastro';
import CadastroFavoritosScreen from './cadastroFavoritos';
import BuscaSemBarraScreen from './buscaSemBarra';
import TelaPrincipal from './Tela_principal';
import ConteudoSorteadoScreen from './Conteudo_sorteado';
import MinhaListaScreen from './Minha_Lista';
import ConteudosAvaliadosScreen from './Conteudos_avaliados';
import PerfilScreen from './perfil';
import FiltrosScreen from './Filtros';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Inicio" component={TelaInicial} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroFavoritos" component={CadastroFavoritosScreen} />
        <Stack.Screen name="BuscaSemBarra" component={BuscaSemBarraScreen} />
        <Stack.Screen name="Principal" component={TelaPrincipal} />
        <Stack.Screen name="ConteudoSorteado" component={ConteudoSorteadoScreen} />
        <Stack.Screen name="MinhaLista" component={MinhaListaScreen} />
        <Stack.Screen name="ConteudosAvaliados" component={ConteudosAvaliadosScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Filtros" component={FiltrosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
