import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#000000',
  primary: '#963BFF',
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
