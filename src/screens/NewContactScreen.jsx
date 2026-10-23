import React from 'react';
import ContactForm from '../components/ContactForm';
import { addContact } from '../data/contacts';

export default function NewContactScreen({ navigation }) {
  const handleSave = (data) => {
    addContact(data);
    navigation.navigate('Home');
  };

  return (
    <ContactForm
      buttonLabel="Guardar"
      onSubmit={handleSave}
    />
  );
}