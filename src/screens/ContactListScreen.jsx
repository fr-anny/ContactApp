import React, { useState, useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ContactCard from '../components/ContactCard';
import { getContacts } from '../data/contacts';
import { globalStyles } from '../styles/globalStyles';
import { useTheme } from '../theme/ThemeContext';

export default function ContactListScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const currentContacts = getContacts();
      const q = query.trim().toLowerCase();
      const filtered = currentContacts.filter((c) =>
        [c.nombre, c.apellido, c.correo, c.telefono, c.tipo].some((v) =>
          String(v).toLowerCase().includes(q)
        )
      );
      setList(filtered);
    }, [query])
  );

  const openContact = (item) => {
    navigation.navigate('EditContact', { id: item.id });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors?.background || '#ffffff' }]}>
      <TextInput
        style={[
          styles.search,
          {
            backgroundColor: colors?.inputBg || '#ffffff',
            borderColor: colors?.border || '#e2e8f0',
            color: colors?.text || '#000000',
          }
        ]}
        placeholder="Buscar contacto..."
        placeholderTextColor={colors?.subText || "#94a3b8"}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={list}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => openContact(item)} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors?.subText || '#64748b' }]}>No hay contactos.</Text>
        }
        contentContainerStyle={styles.list}
      />

      <Pressable
        style={[globalStyles.button, styles.addButton]}
        onPress={() => navigation.navigate('New Contact')}
      >
        <Text style={globalStyles.buttonText}>Agregar contacto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
  },
});