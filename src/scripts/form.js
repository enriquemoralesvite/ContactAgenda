import { showToast } from "./utilities/toast.js";
import { getContacts, saveContacts } from "./utilities/storage.js";

// Detectar si estamos editando o agregando
const params = new URLSearchParams(window.location.search);
const contactId = params.get("id");

// Referencias a elementos
const form = document.getElementById("formContact");
const btnSave = document.getElementById("btnSave");

// Si hay id en URL → editar contacto
if (contactId) {
  const contacts = getContacts();
  const contact = contacts.find((c) => c.id == contactId);

  if (contact) {
    // Al cancelar, regresar a la información del contacto.
    document.getElementById("btnCancel").href = `/contacts/${contactId}`;
    // Rellenar formulario
    document.getElementById("contactName").value = contact.name;
    document.getElementById("contactLastName").value = contact.lastname;
    document.getElementById("contactPhone").value = contact.phone;
    document.getElementById("contactEmail").value = contact.email;

    // Cambiar título si quieres
    const title = document.querySelector(".font-semibold");
    if (title) title.textContent = "Editar Contacto";

    // Cambiar texto de botón si quieres
    btnSave.textContent = "Actualizar";

    // Activar botón porque ya hay datos cargados
    btnSave.disabled = false;

    // Evento guardar para actualizar
    btnSave.addEventListener("click", (e) => {
      e.preventDefault();

      contact.name = document.getElementById("contactName").value;
      contact.lastname = document.getElementById("contactLastName").value;
      contact.phone = document.getElementById("contactPhone").value;
      contact.email = document.getElementById("contactEmail").value;

      saveContacts(contacts);
      showToast("Contacto actualizado correctamente", "success");
      window.location.href = "/contacts";
    });
  } else {
    showToast("Contacto no encontrado", "error");
    btnSave.disabled = true;
  }
} else {
  document.getElementById("btnSave").addEventListener("click", addContact);
}

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
