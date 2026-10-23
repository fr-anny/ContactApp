import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CONTACT_TYPES } from '../data/contacts';
import { globalStyles } from '../styles/globalStyles';
import DateField from './DateField';
import { useTheme } from '../theme/ThemeContext';

export default function ContactForm({ initialData = null, buttonLabel = "Guardar", onSubmit }) {
  const { colors } = useTheme();

  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [apellido, setApellido] = useState(initialData?.apellido || '');
  const [edad, setEdad] = useState(initialData?.edad || '');
  const [correo, setCorreo] = useState(initialData?.correo || '');
  const [telefono, setTelefono] = useState(initialData?.telefono || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(initialData?.fechaNacimiento || '');
  const [tipo, setTipo] = useState(initialData?.tipo || 'Personal');
  const [error, setError] = useState('');

  // Estilo Modo Oscuro
  const dynamicInputStyle = [
    styles.input,
    {
      backgroundColor: colors?.inputBg || '#ffffff',
      borderColor: colors?.border || '#ccc',
      color: colors?.text || '#000000',
    },
  ];

  const handleSubmit = async () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !String(edad).trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !fechaNacimiento.trim()
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const edadNum = Number(edad);
    if (!Number.isInteger(edadNum) || edadNum < 0 || edadNum > 150) {
      setError('La edad debe ser un número válido.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(correo.trim())) {
      setError('El correo no es válido.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento.trim())) {
      setError('La fecha debe tener el formato AAAA-MM-DD.');
      return;
    }

    setError('');

    const data = {
      id: initialData?.id,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      edad: edadNum,
      correo: correo.trim(),
      telefono: telefono.trim(),
      fechaNacimiento: fechaNacimiento.trim(),
      tipo,
    };

    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors?.background || '#ffffff' }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Nombre</Text>
      <TextInput
        style={dynamicInputStyle}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
        placeholderTextColor={colors?.subText || '#94a3b8'}
      />

      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Apellido</Text>
      <TextInput
        style={dynamicInputStyle}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Apellido"
        placeholderTextColor={colors?.subText || '#94a3b8'}
      />

      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Edad</Text>
      <TextInput
        style={dynamicInputStyle}
        value={String(edad)}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholder="Edad"
        placeholderTextColor={colors?.subText || '#94a3b8'}
      />

      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Correo</Text>
      <TextInput
        style={dynamicInputStyle}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="correo@ejemplo.com"
        placeholderTextColor={colors?.subText || '#94a3b8'}
      />

      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Teléfono</Text>
      <TextInput
        style={dynamicInputStyle}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        placeholder="123-456-7890"
        placeholderTextColor={colors?.subText || '#94a3b8'}
      />

      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Fecha de nacimiento</Text>
      <DateField value={fechaNacimiento} onChange={setFechaNacimiento} />

      <Text style={[styles.label, { color: colors?.text || '#0f172a' }]}>Tipo de contacto</Text>
      <View
        style={[
          styles.pickerBox,
          {
            backgroundColor: colors?.inputBg || '#ffffff',
            borderColor: colors?.border || '#ccc',
          },
        ]}
      >
        <Picker
          selectedValue={tipo}
          onValueChange={setTipo}
          style={[
            Platform.OS === 'web' && styles.webSelect,
            { color: colors?.text || '#000000' },
          ]}
          dropdownIconColor={colors?.text || '#000000'}
        >
          {CONTACT_TYPES.map((t) => (
            <Picker.Item key={t} label={t} value={t} color={colors?.text || '#000000'} />
          ))}
        </Picker>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[globalStyles.button, globalStyles.buttonFormSpacing]}
        onPress={handleSubmit}
      >
        <Text style={globalStyles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  pickerBox: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 4,
  },
  webSelect: {
    padding: 10,
    fontSize: 16,
  },
  error: {
    color: '#dc2626',
    marginTop: 12,
    fontWeight: '600',
  },
});