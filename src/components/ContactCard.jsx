import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ContactCard({ contact, onPress, onDelete }) {
  const { colors } = useTheme();
  const pan = useRef(new Animated.ValueXY()).current;
  const [isOpen, setIsOpen] = useState(false);

  // (swipe)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          // Deslizar hacia la izquierda (máximo -90px)
          pan.setValue({ x: Math.max(gestureState.dx, -90), y: 0 });
        } else if (isOpen) {
          // Regresar hacia la derecha si estaba abierto
          pan.setValue({ x: Math.min(-90 + gestureState.dx, 0), y: 0 });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -35) {
          Animated.spring(pan, {
            toValue: { x: -90, y: 0 },
            useNativeDriver: false,
          }).start();
          setIsOpen(true);
        } else {
          // Regresar a la posición original
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          setIsOpen(false);
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Botón rojo "Borrar" que queda oculto al fondo derecho */}
      <View style={styles.deleteBackground}>
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            resetPosition();
            if (onDelete) onDelete();
          }}
        >
          <Text style={styles.deleteText}>Borrar</Text>
        </Pressable>
      </View>

      {/* Tarjeta frontal  que se desplaza al arrastrar */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            backgroundColor: colors?.cardBg || '#ffffff',
            borderColor: colors?.border || '#e2e8f0',
            transform: [{ translateX: pan.x }],
          },
        ]}
      >
        <Pressable
          style={styles.info}
          onPress={() => {
            if (isOpen) {
              resetPosition();
            } else if (onPress) {
              onPress();
            }
          }}
        >
          <Text style={[styles.name, { color: colors?.text || '#0f172a' }]}>
            {contact.nombre} {contact.apellido}
          </Text>
          <Text style={[styles.detail, { color: colors?.subText || '#64748b' }]}>
            {contact.telefono}
          </Text>
          <Text style={[styles.detail, { color: colors?.subText || '#64748b' }]}>
            {contact.correo}
          </Text>
          <Text style={[styles.detail, { color: colors?.subText || '#64748b' }]}>
            {contact.edad ? `${contact.edad} años · ` : ''}{contact.fechaNacimiento}
          </Text>
        </Pressable>

        {contact.tipo ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{contact.tipo}</Text>
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  deleteBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 90,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
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