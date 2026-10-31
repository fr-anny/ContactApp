import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ContactCard from '../components/ContactCard';
import { getContacts, deleteContact } from '../data/contacts';
import { globalStyles } from '../styles/globalStyles';
import { useTheme } from '../theme/ThemeContext';

export default function ContactListScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const { colors } = useTheme();

  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContacts();
      console.log("Datos recibidos del servidor:", data);
      setList(data);
    } catch (err) {
      console.error("Error al cargar contactos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Listener de navegación (focus)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("reload focus");
      loadContacts();
    });

    return unsubscribe;
  }, [navigation]);

  // Función para eliminar contacto vía DELETE
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      loadContacts(); // Recarga la lista desde la API
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
      Alert.alert("Error", "No se pudo eliminar el contacto.");
    }
  };

  // Filtrado para la barra de búsqueda
  const q = query.trim().toLowerCase();
  const filteredList = list.filter((c) =>
    [c.nombre, c.apellido, c.correo, c.telefono, c.tipo].some((v) =>
      String(v || '').toLowerCase().includes(q)
    )
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
          },
        ]}
        placeholder="Buscar contacto..."
        placeholderTextColor={colors?.subText || "#94a3b8"}
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={[styles.statusText, { color: colors?.text || '#000000' }]}>
            Cargando contactos...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadContacts}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredList}
          keyExtractor={(c) => String(c.id)}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onPress={() => openContact(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors?.subText || '#64748b' }]}>
              No hay contactos.
            </Text>
          }
          contentContainerStyle={styles.list}
        />
      )}

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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 12,
    fontSize: 15,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});