const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// // Funkcja invokeAction, która wykonuje procesy na podstawie dostarczonych argumentów wiersza poleceń.
// Procesy te są realizowane w oparciu o wartość argumentu action.

// - "list": Pobiera wszystkie kontakty za pomocą funkcji listContacts i wyświetla je w konsoli.
// - "get": Pobiera konkretny kontakt na podstawie identyfikatora ID za pomocą funkcji getContactById i wyświetla go w konsoli.
// - "add": Dodaje nowy kontakt za pomocą funkcji addContact, przekazując name, email i phone, a następnie wyświetla ten nowo dodany kontakt w konsoli.
// - "remove": Usuwa kontakt na podstawie identyfikatora ID za pomocą funkcji removeContact i wyświetla informacje o usuniętym kontakcie w konsoli.
// - w sytuacji nieznanego procesu: Wyświetla w konsoli ostrzeżenie o nieznanej akcji.

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// contactsArraytworzy tablicę contactsArray zawierającą argumenty wiersza poleceń po usunięciu pierwszego argumentu (hideBin).
// W tym miejscu dokonuje się przetworzenia tablicy contactsArray i utworzenie obiektu argv.
// Obiekt ten zawiera przetworzone argumenty w formie kluczy i wartości.

const contactsArray = hideBin(process.argv);
const { argv } = yargs(contactsArray);

invokeAction(argv);
