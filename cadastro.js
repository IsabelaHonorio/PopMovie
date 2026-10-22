
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

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
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
          style={styles.backButton}
          accessibilityLabel="Voltar"
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>

        
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/Logo.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Apelido</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#777"
            autoCapitalize="none"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry
          />

          <Text style={styles.label}>
            Confirmar Senha
          </Text>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry
          />
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Adicionar favoritos
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 42,
    paddingBottom: 32,
  },

  backButton: {
    position: 'absolute',
    top: 27,
    left: 40,
    zIndex: 1,
    width: 32,
    height: 35,
    justifyContent: 'center',
  },

  backArrow: {
    color: '#963BFF',
    fontSize: 48,
    lineHeight: 48,
    marginTop: -7,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    height: 91,
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 47,
    lineHeight: 53,
  },

  logoName: {
    marginTop: -8,
    fontSize: 27,
    fontWeight: '900',
    fontStyle: 'italic',
  },

  logoPop: {
    color: '#FFC928',
  },

  logoMovie: {
    color: '#FFFFFF',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 24,
  },

  form: {
    width: '100%',
  },

  label: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
    marginBottom: 8,
  },

  input: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#000000',
    fontSize: 18,
    marginBottom: 21,
  },

  button: {
    alignSelf: 'center',
    backgroundColor: '#963BFF',
    borderRadius: 40,
    minHeight: 64,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    elevation: 8,
    shadowColor: '#963BFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
});
