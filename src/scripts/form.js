import { showToast } from "./utilities/toast.js";
import { getContacts, saveContacts } from "./utilities/storage.js";


// Convertir imagen a base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject("Error al leer la imagen");
    reader.readAsDataURL(file);
  });
}

// Detectar si estamos editando o agregando
const params = new URLSearchParams(window.location.search);
const contactId = params.get("id");

// Referencias a elementos
const form = document.getElementById("formContact");
const btnSave = document.getElementById("btnSave");

// Si hay id en URL → editar contacto
if (contactId) {
  const contacts = getContacts();
  const contact = contacts.find((c) => c.id == contactId && c.active);

  if (contact) {
    // Al cancelar, regresar a la información del contacto.
    document.getElementById("btnCancel").href = `/contacts/${contactId}`;
    // Rellenar formulario
    document.getElementById("contactName").value = contact.name;
    document.getElementById("contactLastName").value = contact.lastname;
    document.getElementById("contactPhone").value = contact.phone;
    document.getElementById("contactEmail").value = contact.email;


    // Mostrar imagen si existe
    if (contact.photo) {
      const previewImg = document.getElementById("photoPreview");
      const defaultIcon = document.getElementById("defaultIcon");

      previewImg.src = contact.photo;
      previewImg.classList.remove("hidden");
      defaultIcon.style.display = "none";
    }


    // Cambiar título si quieres
    const title = document.getElementById("formTitle");
    if (title) title.textContent = "Editar Contacto";

    // Cambiar texto de botón si quieres
    btnSave.textContent = "Actualizar";

    // Activar botón porque ya hay datos cargados
    btnSave.disabled = false;
    form.dispatchEvent(new Event("input"));
    // Evento guardar para actualizar
    btnSave.addEventListener("click", async (e) => {
      e.preventDefault();

      contact.name = document.getElementById("contactName").value;
      contact.lastname = document.getElementById("contactLastName").value;
      contact.phone = document.getElementById("contactPhone").value;
      contact.email = document.getElementById("contactEmail").value;

      const photoInput = document.getElementById("contactPhoto");
      if (photoInput?.files[0]) {
        const newPhoto = await toBase64(photoInput.files[0]);
        contact.photo = newPhoto;
      }

      saveContacts(contacts);
      showToast("Contacto actualizado correctamente", "success");
      window.location.href = "/contacts";
    });
  } else {
    showToast("Contacto no encontrado", "error");
    btnSave.disabled = true;
    window.location.href = "/contacts";
  }
} else {
  document.getElementById("btnSave").addEventListener("click", (e) => {
    addContact(e).catch((error) => {
      console.error("Error al agregar contacto:", error);
      showToast("Ocurrió un error al guardar el contacto", "error");
    });
  });
}

// Event listener para activar BTN GUARDAR
document.getElementById("formContact").addEventListener("input", (e) => {
  const form = document.getElementById("formContact");

  // Revisar si se cumplen las restricciones del formulario
  if (form.checkValidity()) {
    document.getElementById("btnSave").disabled = false;
  } else {
    document.getElementById("btnSave").disabled = true;
  }
});

//Funcion agregar contacto
async function addContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName");
  const lastname = document.getElementById("contactLastName");
  const phone = document.getElementById("contactPhone");
  const email = document.getElementById("contactEmail");
  const photoInput = document.getElementById("contactPhoto");

  if (name.value && phone.value) {
    const contacts = getContacts();
    const newContact = {
      id: Date.now(),
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      email: email.value,
      active: true,
      photo: photoInput?.files[0]
        ? await toBase64(photoInput.files[0])
        : "",
    };

    contacts.push(newContact);
    saveContacts(contacts);
    document.getElementById("formContact").reset();
    showToast("Contacto agregado exitosamente", "success");
    window.location.href = "/contacts";
  } else {
    showToast("Por favor, completa todos los campos", "error");
  }
}


// Mostrar imagen

document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById("contactPhoto");
  const previewImg = document.getElementById("photoPreview");
  const defaultIcon = document.getElementById("defaultIcon");

  if (photoInput && previewImg && defaultIcon) {
    photoInput.addEventListener("change", () => {
      const file = photoInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        previewImg.src = url;
        previewImg.classList.remove("hidden");
        defaultIcon.style.display = "none";
      }
    });
  }
});

//Validacion para el campo telefono

const inputPhone = document.getElementById('contactPhone')
const inputMenssageError = document.getElementById('error-tel')

inputPhone.addEventListener("change", e => {
  const value = e.target.value

  if (isNaN(Number(value))) {
    inputMenssageError.innerText = "El numero ingresado no es valido."
  }
  else if (value.length != 9) {
    inputMenssageError.innerText = "Numero debe tener 9 digitos"
  } else {
    inputMenssageError.innerText = '';
  }
})