import { getContacts, saveContacts } from "./utilities/storage.js";

let editIndex = -1;
// ----------- Esta funcion se encuentra en TOAST.JS  - se usa con   import { showToast } from "./toast.js";

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast p-4 rounded-lg shadow-lg text-white ${
    type === "success"
      ? "bg-green-500"
      : type === "warning"
      ? "bg-blue-500"
      : "bg-red-500"
  }`;
  toast.innerText = message;
  document.getElementById("toastContainer").appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
// -------------------------------------------------------------

// ----------- Esta funcion se encuentra en contactList.JS

function updateContactList() {
  const list = document.getElementById("contactList");
  list.innerHTML = "";
  const contacts = getContacts();

  contacts.forEach((contact, index) => {
    const div = document.createElement("div");
    div.className =
      "p-2 border-b flex justify-between items-center contact-item";
    div.dataset.id = contact.id;
    div.innerHTML = `
      <span>${contact.name} ${contact.lastname} - ${contact.phone}</span>
      <button class="select-btn bg-gray-200 px-2 py-1 rounded hover:bg-gray-300" data-index="${index}">Seleccionar</button>
    `;
    list.appendChild(div);
  });
}

function selectContact(index) {
  const contacts = getContacts();
  editIndex = index;
  document.getElementById("contactName").value = contacts[index].name;
  document.getElementById("contactLastName").value = contacts[index].lastname;
  document.getElementById("contactPhone").value = contacts[index].phone;
}
//---------------------------------------------------------

// ----------- Esta funcion se encuentra en FORM.JS  - se usa con

function addContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value;
  const lastname = document.getElementById("contactLastName").value;
  const phone = document.getElementById("contactPhone").value;

  if (name && phone && lastname) {
    const contacts = getContacts();
    const newContact = {
      id: Date.now(),
      name,
      lastname,
      phone,
    };

    contacts.push(newContact);
    saveContacts(contacts);

    document.getElementById("contactName").value = "";
    document.getElementById("contactLastName").value = "";
    document.getElementById("contactPhone").value = "";
    updateContactList();
    showToast("Contacto agregado exitosamente", "success");
  } else {
    showToast("Por favor, completa todos los campos", "error");
  }
}
//---------------------------------------

function editContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value;
  const lastname = document.getElementById("contactLastName").value;
  const phone = document.getElementById("contactPhone").value;
  const contacts = getContacts();

  if (editIndex >= 0 && name && phone && lastname) {
    contacts[editIndex] = {
      ...contacts[editIndex],
      name,
      lastname,
      phone,
    };
    saveContacts(contacts);
    editIndex = -1;
    document.getElementById("contactName").value = "";
    document.getElementById("contactLastName").value = "";
    document.getElementById("contactPhone").value = "";
    updateContactList();
    showToast("Contacto editado exitosamente", "warning");
  } else {
    showToast("Selecciona un contacto y completa todos los campos", "error");
  }
}

function deleteContact() {
  const contacts = getContacts();

  if (editIndex >= 0) {
    contacts.splice(editIndex, 1);
    saveContacts(contacts);
    editIndex = -1;
    document.getElementById("contactName").value = "";
    document.getElementById("contactLastName").value = "";
    document.getElementById("contactPhone").value = "";
    updateContactList();
    showToast("Contacto eliminado exitosamente", "error");
  } else {
    showToast("Selecciona un contacto para eliminar", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    .toast {
      transition: all 0.5s ease-in-out;
      opacity: 0;
      transform: translateY(20px);
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  document.getElementById("contactList").addEventListener("click", (e) => {
    const selectBtn = e.target.closest(".select-btn");
    if (selectBtn) {
      e.preventDefault();
      const index = parseInt(selectBtn.dataset.index);
      selectContact(index);
    }
  });

  document.getElementById("btnAdd")?.addEventListener("click", addContact);
  document.getElementById("btnEdit")?.addEventListener("click", editContact);
  document
    .getElementById("btnDelete")
    ?.addEventListener("click", deleteContact);

  updateContactList();
});
