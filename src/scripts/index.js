import { getContacts, saveContacts } from "./utilities/storage.js";

let editIndex = -1;

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

export function deleteContact(id) {
  const contacts = getContacts();

  const contact = contacts.find((contact) => contact.id == id);
  contact.active = false;
  saveContacts(contacts);

  showToast("Contacto eliminado exitosamente", "error");
  window.location.href = "/contacts";
}
