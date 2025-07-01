import { getContacts } from "./utilities/storage.js";

function updateContactList() {
  const list = document.getElementById("contactList");
  if (!list) return;

  list.innerHTML = "";

  const contacts = getContacts();

  contacts.forEach((contact) => {
    const div = document.createElement("div");
    div.className =
      "p-3 border-b border-b-gray-300 flex justify-between items-center contact-item hover:bg-gray-100 cursor-pointer transition text-gray-700";
    div.dataset.id = contact.id;

    div.innerHTML = `
      <span>${contact.name} ${contact.lastname}</span>
    `;

    // Evento click a toda la card
    div.addEventListener("click", () => {
      window.location.href = `/contacts/${contact.id}`;
    });

    list.appendChild(div);
  });
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", updateContactList);
