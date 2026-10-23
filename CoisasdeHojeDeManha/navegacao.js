
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from './Tela_inicial';
import TelaLogin from './Tela_login';
import TelaPrincipal from './Tela_principal';

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
        <Stack.Screen
          name="Inicio"
          component={TelaInicial}
        />

        <Stack.Screen
          name="Login"
          component={TelaLogin}
        />

        <Stack.Screen
          name="Principal"
          component={TelaPrincipal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
