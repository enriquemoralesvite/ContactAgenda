export function showToast(message, type) {
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

  setTimeout(() => toast.classList.add("show"), 500);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 1000);
  }, 3000);
}
