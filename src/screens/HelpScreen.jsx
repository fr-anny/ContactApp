import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function HelpScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors?.background || '#ffffff' }]}>
      <Text style={[styles.title, { color: colors?.text || '#000000' }]}>Ayuda</Text>
      <Text style={[styles.text, { color: colors?.text || '#333333' }]}>
        1. Para agregar un contacto, presiona el botón 'Agregar contacto' o ve a la pestaña 'Nuevo Contacto'.
      </Text>
      <Text style={[styles.text, { color: colors?.text || '#333333' }]}>
        2. Haz clic en la tarjeta de cualquier contacto para editar sus datos.
      </Text>
      <Text style={[styles.text, { color: colors?.text || '#333333' }]}>
        3. Utiliza la barra superior de búsqueda para filtrar la lista.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 15, marginBottom: 10 },
});