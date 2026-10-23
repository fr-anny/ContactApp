import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function InfoScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors?.background || '#ffffff' }]}>
      <View style={[styles.card, { backgroundColor: colors?.cardBg || '#ffffff', borderColor: colors?.border || '#e2e8f0' }]}>
        <Text style={[styles.label, { color: colors?.subText || '#64748b' }]}>Nombre</Text>
        <Text style={[styles.value, { color: colors?.text || '#0f172a' }]}>Contacts App</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors?.cardBg || '#ffffff', borderColor: colors?.border || '#e2e8f0' }]}>
        <Text style={[styles.label, { color: colors?.subText || '#64748b' }]}>Versión</Text>
        <Text style={[styles.value, { color: colors?.text || '#0f172a' }]}>1.0.0</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors?.cardBg || '#ffffff', borderColor: colors?.border || '#e2e8f0' }]}>
        <Text style={[styles.label, { color: colors?.subText || '#64748b' }]}>Autor</Text>
        <Text style={[styles.value, { color: colors?.text || '#0f172a' }]}>Annita y Laura</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
});