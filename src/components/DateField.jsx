import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, Pressable, Text, View, unstable_createElement } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const pad = (n) => String(n).padStart(2, '0');
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fromISO = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const WebDateInput = (props) => unstable_createElement('input', props);

export default function DateField({ value, onChange }) {
  const { colors, isDarkMode } = useTheme();
  const date = value ? fromISO(value) : new Date(2000, 0, 1);

  if (Platform.OS === 'web') {
    return (
      <WebDateInput
        type="date"
        value={value}
        max={toISO(new Date())}
        onChange={(e) => onChange(e.target.value)}
        style={{
          borderWidth: 1,
          borderColor: colors?.border || '#ccc',
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          backgroundColor: colors?.inputBg || '#fff',
          color: colors?.text || '#000',
          colorScheme: isDarkMode ? 'dark' : 'light',
        }}
      />
    );
  }

  // iOS: modo compact: un botón que abre el calendario
  if (Platform.OS === 'ios') {
    return (
      <View style={{ alignItems: 'flex-start' }}>
        <DateTimePicker
          value={date}
          mode="date"
          display="compact"
          maximumDate={new Date()}
          onChange={(_, selected) => onChange(toISO(selected))}
          themeVariant={isDarkMode ? 'dark' : 'light'}
        />
      </View>
    );
  }

  // Android: API imperativa que abre un diálogo.
  const open = () =>
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      maximumDate: new Date(),
      onChange: (_, selected) => onChange(toISO(selected)),
    });

  return (
    <Pressable
      style={{
        borderWidth: 1,
        borderColor: colors?.border || '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: colors?.inputBg || '#fff',
      }}
      onPress={open}
    >
      <Text
        style={{
          color: value ? (colors?.text || '#000') : (colors?.subText || '#999'),
          fontSize: 16,
        }}
      >
        {value || 'Seleccionar fecha'}
      </Text>
    </Pressable>
  );
}