const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db", "contacts.json");

// Funkcja listContacts odczytuje plik za pomocą fs.readFile jednocześnie oczekując na zakończenie operacji(await).
// Następnie przetwarza odczytaną zawartość jako JSON i zwraca ją jako wynik funkcji listContacts.

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

// Funkcja getContactById wykorzystuje wcześniej zdefiniowaną funkcję listContacts() do odczytania listy kontaktów,
// a następnie poszukuje w tej liście kontaktu o określonym ID. // Zwraca znaleziony kontakt w przeciwnym wypadku „null”.
// Cała operacja odbywa się asynchronicznie.

async function getContactById(contactId) {
  const contactsArr = await listContacts();
  const result = contactsArr.find((el) => el.id === contactId);
  return result ? result : null;
}

// Funkcja removeContact pozwala na usunięcie kontaktu o określonym ID.
// Jeśli kontakt zostanie znaleziony i usunięty, zostaje on zwrócony jako wynik.
// W przeciwnym razie zwracane jest „null”.
// Cała operacja działa asynchronicznie.

async function removeContact(contactId) {
  const contactsArr = await listContacts();
  const index = contactsArr.findIndex((el) => el.id === contactId);
  const result = contactsArr[index];
  if (!result) {
    return null;
  } else {
    contactsArr.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
    return result;
  }
}

// Funkcja addContact pozwala na dodawanie nowych kontaktów do listy kontaktów.
// Nowy kontakt jest tworzony, dodawany do listy, a następnie lista jest zaktualizowana w pliku.
// Nowo dodany kontakt jest zwracany jako wynik funkcji. Operacja ta działa asynchronicznie.

async function addContact(name, email, phone) {
  const contactsArr = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return newContact;
}

// module.exports jest obiektem w Node.js,
// który pozwala na eksportowanie elementów z modułu,
// aby były dostępne dla innych modułów lub plików w aplikacji.

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
