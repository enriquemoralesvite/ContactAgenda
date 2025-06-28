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
        </div>
        <button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Editar</button>
      `;

      list.appendChild(card);
    });
  }

  renderContacts();
});
