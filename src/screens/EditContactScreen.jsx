import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { getContact, updateContact } from '../data/contacts';

export default function EditContactScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [currentContact, setCurrentContact] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let contact = getContact(id);
    setCurrentContact(contact);
    setLoaded(true);
  }, [id]);

  const handleUpdate = (data) => {
    updateContact(id, data);
    navigation.goBack();
  };

  if (!loaded) return null;

  return (
    <ContactForm
      buttonLabel="Editar"
      initialData={currentContact}
      onSubmit={handleUpdate}
    />
  );
}