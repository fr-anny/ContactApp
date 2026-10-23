import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import ContactListScreen from './src/screens/ContactListScreen';
import NewContactScreen from './src/screens/NewContactScreen';
import EditContactScreen from './src/screens/EditContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import InfoScreen from './src/screens/InfoScreen';
import HelpScreen from './src/screens/HelpScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function BackButton() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => navigation.navigate('MainTabs')}
      style={{ marginLeft: 16, padding: 4 }}
    >
      <Ionicons name="arrow-back" size={24} color={colors?.headerText || '#000'} />
    </Pressable>
  );
}

function HamburgerButton() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      style={{ marginRight: 16, padding: 4 }}
    >
      <Ionicons name="menu-outline" size={28} color={colors?.headerText || '#000'} />
    </Pressable>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        headerRight: () => <HamburgerButton />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ContactListScreen}
        options={{
          title: 'Home',
          headerTitle: 'Contactos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="New Contact"
        component={NewContactScreen}
        options={{
          title: 'Nuevo contacto',
          headerTitle: 'Agregar Contacto',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsScreen}
        options={{
          title: 'Configuración',
          headerTitle: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerMenu() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerRight: () => <HamburgerButton />,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={Tabs}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Informacion"
        component={InfoScreen}
        options={{
          title: 'Información',
          headerTitle: 'Información',
          headerLeft: () => <BackButton />,
        }}
      />
      <Drawer.Screen
        name="Ayuda"
        component={HelpScreen}
        options={{
          title: 'Ayuda',
          headerTitle: 'Ayuda',
          headerLeft: () => <BackButton />,
        }}
      />
    </Drawer.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditContact"
        component={EditContactScreen}
        options={{ title: 'Editar contacto' }}
      />
    </Stack.Navigator>
  );
}

function RootApp() {
  const { isDarkMode, colors } = useTheme();

  const customNavigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors?.background || '#ffffff',
      card: colors?.headerBg || '#ffffff',
      text: colors?.headerText || '#000000',
      border: colors?.border || '#e2e8f0',
    },
  };

  return (
    <NavigationContainer theme={customNavigationTheme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <MainStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}