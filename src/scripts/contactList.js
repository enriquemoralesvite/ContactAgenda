import { getContacts } from "./utilities/storage.js";

function updateContactList(filter = "") {
  const list = document.getElementById("contactList");
  if (!list) return;

  list.innerHTML = "";

  const contacts = getContacts();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().startsWith(filter.toLowerCase()) ||
      contact.lastname.toLowerCase().startsWith(filter.toLowerCase()) ||
      contact.phone?.startsWith(filter)
  );

  if (filteredContacts.length === 0) {
    list.innerHTML =
      "<p class='text-center text-gray-500 mt-4'>No se encontraron Contactos.</p>";
    return;
  }
  //Agrego Reyner
  filteredContacts
    .filter((contact) => contact.active)
    .forEach((contact) => {
      const div = document.createElement("div");
      div.className =
        "p-3 border-b border-b-gray-300 flex justify-between items-center gap-2 contact-item hover:bg-gray-100 cursor-pointer transition text-gray-700";
      div.dataset.id = contact.id;

      div.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-full min-w-[30px] max-w-[30px] h-[30px] rounded-full overflow-hidden">
          ${
            contact.photo
              ? `
            <img class="w-full h-full object-cover" src="${contact.photo}" alt="img-perfil" />`
              : `<div class="flex justify-center items-center font-semibold bg-gray-400 w-full h-full text-white">
              ${contact.name.slice(0, 1).toUpperCase()}
            </div>`
          }
        </div>
          <span class="text-gray-700 text-sm">${contact.name} ${
        contact.lastname
      }
          </span>
        </div>

        <div>
          <a class="cursor-pointer text-sm" href="tel:${
            contact.phone
          }" onclick="event.stopPropagation()">
            <img src="/src/icons/phone.svg"> </img>
          </a>
        </div>
      `;

      // Evento click a toda la card
      div.addEventListener("click", () => {
        window.location.href = `/contacts/${contact.id}`;
      });

      list.appendChild(div);
    });
  const contactCountElement = document.getElementById("contactCount");
  if (contactCountElement) {
    contactCountElement.textContent = `Total de contactos: ${
      filteredContacts.filter((c) => c.active).length
    }`;
  }
}

// Add input event listener to search field
document.addEventListener("DOMContentLoaded", () => {
  updateContactList();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      updateContactList(searchInput.value.trim());
    });
  }
});
