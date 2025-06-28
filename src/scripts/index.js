//Archivo JS principal para cargar scripts
import { getContacts, saveContacts } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContact");
  const list = document.getElementById("contactList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const phone = document.getElementById("phone").value;

    const contacts = getContacts();

    const newContact = {
      id: Date.now(),
      name,
      lastname,
      phone,
    };

    contacts.push(newContact);
    saveContacts(contacts);

    form.reset();
    renderContacts();
  });

  function renderContacts() {
    list.innerHTML = "";
    const contacts = getContacts();

    contacts.forEach((contact) => {
      const card = document.createElement("div");
      card.className =
        "flex justify-between items-center p-3 mb-3 bg-white rounded shadow";

      card.innerHTML = `
        <div>
          <p class="text-lg font-semibold text-gray-800">${contact.name} ${contact.lastname}</p>
          <p class="text-gray-600">${contact.phone}</p>
        </div>
        <div class="flex gap-2">
          <button class="edit-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition" data-id="${contact.id}">Editar</button>
          <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" data-id="${contact.id}">Eliminar</button>
        </div>
      `;

      list.appendChild(card);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        deleteContact(id);
      });
    });
  }

  function deleteContact(id) {
    const contacts = getContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    saveContacts(updatedContacts);
    renderContacts();
  }

  renderContacts();
});