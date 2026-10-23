import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ContactCard({ contact, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: colors?.cardBg || '#ffffff', borderColor: colors?.border || '#e2e8f0' }
      ]}
      onPress={onPress}
    >
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors?.text || '#0f172a' }]}>
          {contact.nombre} {contact.apellido}
        </Text>
        <Text style={[styles.detail, { color: colors?.subText || '#64748b' }]}>{contact.telefono}</Text>
        <Text style={[styles.detail, { color: colors?.subText || '#64748b' }]}>{contact.correo}</Text>
        <Text style={[styles.detail, { color: colors?.subText || '#64748b' }]}>
          {contact.edad} años · {contact.fechaNacimiento}
        </Text>
      </View>

      {contact.tipo ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{contact.tipo}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 8,
  },
  badgeText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '500',
  },
});