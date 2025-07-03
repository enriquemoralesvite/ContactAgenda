export function getContacts() {
  return JSON.parse(sessionStorage.getItem("contacts")) || [];
}

export function saveContacts(contacts) {
  sessionStorage.setItem("contacts", JSON.stringify(contacts));
}
