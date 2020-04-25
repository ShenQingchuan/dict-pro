export default function logoutAction() {
  Object.keys(localStorage).forEach((key) => {
    if (key.includes("dp_u")) {
      localStorage.removeItem(key);
    }
  });
}
