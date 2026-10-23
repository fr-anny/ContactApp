export const CONTACT_TYPES = ['Personal', 'Trabajo', 'Familia', 'Amigos'];

export let contacts = [
  { id: '1', nombre: 'Juan', apellido: 'Pérez', edad: 30, correo: 'juan@example.com', telefono: '123-456-7890', fechaNacimiento: '1995-04-12', tipo: 'Personal' },
  { id: '2', nombre: 'María', apellido: 'López', edad: 25, correo: 'maria@example.com', telefono: '987-654-3210', fechaNacimiento: '2000-09-30', tipo: 'Trabajo' },
  { id: '3', nombre: 'Pedro', apellido: 'García', edad: 41, correo: 'pedro@example.com', telefono: '555-555-5555', fechaNacimiento: '1984-01-05', tipo: 'Familia' },
];

export function getContacts() {
  return contacts;
}

export function getContact(id) {
  return contacts.find((c) => c.id === id) ?? null;
}

export function addContact(data) {
  contacts = [{ ...data, id: Date.now().toString() }, ...contacts];
}

export function updateContact(id, data) {
  contacts = contacts.map((c) => (c.id === id ? { ...c, ...data, id } : c));
}

export function deleteContact(id) {
  contacts = contacts.filter((c) => c.id !== id);
}