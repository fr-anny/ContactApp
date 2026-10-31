export const CONTACT_TYPES = ['Personal', 'Trabajo', 'Familia', 'Amigos'];

const RAW_URL = process.env.EXPO_PUBLIC_API_URL || 'https://cesun.vkinf-software.com:7800';
const BASE_URL = RAW_URL.replace(/"/g, ''); 
const SERIAL_NUMBER = process.env.EXPO_PUBLIC_SERIAL_NUMBER || '24010120';

const ENDPOINT = `${BASE_URL}/api/contacts/${SERIAL_NUMBER}/`;

// Convertir de formato API (inglés) a App (español)
const mapFromApi = (item) => ({
  id: String(item.id),
  nombre: item.first_name || '',
  apellido: item.last_name || '',
  edad: String(item.age || ''),
  correo: item.email || '',
  telefono: item.phone || '',
  fechaNacimiento: item.birth_date || '',
  tipo: item.contact_type || 'Personal',
});

// Convertir de formato App (español) a API (inglés)
const mapToApi = (data) => ({
  first_name: data.nombre,
  last_name: data.apellido,
  age: parseInt(data.edad, 10) || 0,
  email: data.correo,
  phone: data.telefono,
  birth_date: data.fechaNacimiento,
  contact_type: data.tipo,
});

// GET /contactos
export async function getContacts() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudieron cargar los contactos`);
  const data = await res.json();
  return data.map(mapFromApi);
}

// GET /contactos/{id}
export async function getContact(id) {
  const res = await fetch(`${ENDPOINT}${id}/`);
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener el contacto`);
  const data = await res.json();
  return mapFromApi(data);
}

// POST /contactos
export async function addContact(data) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapToApi(data)),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo agregar el contacto`);
  const result = await res.json();
  return mapFromApi(result);
}

// PUT /contactos/{id}
export async function updateContact(id, data) {
  const res = await fetch(`${ENDPOINT}${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapToApi(data)),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo actualizar el contacto`);
  const result = await res.json();
  return mapFromApi(result);
}

// DELETE /contactos/{id}
export async function deleteContact(id) {
  const res = await fetch(`${ENDPOINT}${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo eliminar el contacto`);
  return true;
}