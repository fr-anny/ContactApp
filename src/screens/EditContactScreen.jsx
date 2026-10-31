import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { getContact, updateContact } from '../data/contacts';

export default function EditContactScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [currentContact, setCurrentContact] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contact = await getContact(id);
        setCurrentContact(contact);
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
      } finally {
        setLoaded(true);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateContact(id, data);
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el contacto:', error);
    }
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