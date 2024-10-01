function showToast(message) {
  const toastBody = document.querySelector(".toast-body");
  toastBody.textContent = message;

  const toastEl = document.getElementById("toast");
  const toast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 5000,
  });
  toast.show();
}
