import { showToast } from "./utilities/toast.js";
import { getContacts, saveContacts } from "./utilities/storage.js";

// Event listener para activar BTN GUARDAR
document.getElementById("formContact").addEventListener("input", (e) => {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;

  if (name && phone) {
    document.getElementById("btnSave").disabled = false;
  } else {
    document.getElementById("btnSave").disabled = true;
  }
});

document.getElementById("btnSave").addEventListener("click", addContact);

//Funcion agregar contacto
function addContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName");
  const lastname = document.getElementById("contactLastName");
  const phone = document.getElementById("contactPhone");
  const email = document.getElementById("contactEmail");

  //Si los campos requeridos estan completos, se guarda en NewContact
  if (name.value && phone.value) {
    const contacts = getContacts();
    const newContact = {
      id: Date.now(),
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      email: email.value,
    };

    contacts.push(newContact);
    saveContacts(contacts);

    //Limpiar formulario
    document.getElementById("formContact").reset();
    //Mostrar Toast
    showToast("Contacto agregado exitosamente", "success");
    //Redirigir al inicio
    window.location.href = "/contacts";
  } else {
    showToast("Por favor, completa todos los campos", "error");
  }
}
