import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS, commonStyles } from './theme';

export default function CadastroScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <StatusBar
        backgroundColor="#000000"
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={commonStyles.backButton}
          accessibilityLabel="Voltar"
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.backArrow}>‹</Text>
        </Pressable>

        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/Logo.png')}
            style={commonStyles.logo}
          />
        </View>

        <Text style={commonStyles.title}>Cadastro</Text>

        <View style={styles.form}>
          <Text style={commonStyles.label}>APELIDO</Text>
          <TextInput style={commonStyles.input} autoCapitalize="none" />

          <Text style={commonStyles.label}>E-MAIL</Text>
          <TextInput
            style={commonStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={commonStyles.label}>SENHA</Text>
          <TextInput style={commonStyles.input} secureTextEntry />

          <Text style={commonStyles.label}>CONFIRMAR SENHA</Text>
          <TextInput style={commonStyles.input} secureTextEntry />
        </View>

        <Pressable
          style={commonStyles.primaryButton}
          onPress={() => navigation.navigate('CadastroFavoritos')}
        >
          <Text style={commonStyles.primaryButtonText}>Adicionar favoritos</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },

  title: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  form: {
    width: '100%',
    maxWidth: 360,
    marginBottom: 20,
  },
});
