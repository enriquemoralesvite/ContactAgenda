export function open(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.showModal();
}

export function cancel(dialogId) {
  const dialog = document.getElementById(dialogId);
  const cancelButton = document.getElementById(dialogId + "-cancel");
  // Form cancel button closes the dialog box
  cancelButton.addEventListener("click", function () {
    dialog.close();
  });
}

export function confirm(dialogId, action) {
  const dialog = document.getElementById(dialogId);
  const confirmButton = document.getElementById(dialogId + "-confirm");
  confirmButton.addEventListener("click", function () {
    action();
    dialog.close();
  });
}
