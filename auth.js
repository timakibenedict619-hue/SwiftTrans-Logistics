import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ADMIN LOGIN
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const error = document.getElementById("error");

    error.textContent = "";

    try {

      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "admin.html";

    } catch (err) {

      error.textContent = err.message;

    }

  });
}

// Protect admin.html
onAuthStateChanged(auth, (user) => {

  if (window.location.pathname.includes("admin.html")) {

    if (!user) {

      window.location.href = "admin-login.html";

    }

  }

});

// Logout
window.logout = async function () {

  await signOut(auth);

  window.location.href = "admin-login.html";

};
