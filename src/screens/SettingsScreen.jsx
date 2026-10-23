import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors?.background || '#fff' }]}>
      <Text style={[styles.title, { color: colors?.text || '#000' }]}>Configuración</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors?.text || '#000' }]}>Modo Oscuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16 },
});