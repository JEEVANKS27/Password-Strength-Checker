// Variables for multilingual support
const translations = {
  en: {
    title: "Password Strength Checker",
    description: "Check your password strength and improve your security.",
    usernameLabel: "👤 Username",
    passwordLabel: "🔑 Password",
    historyTitle: "Password Strength History",
    footerText: "💡 Powered by modern design | Built for security",
  },
  es: {
    title: "Comprobador de Fortaleza de Contraseña",
    description: "Comprueba la fortaleza de tu contraseña y mejora tu seguridad.",
    usernameLabel: "👤 Nombre de usuario",
    passwordLabel: "🔑 Contraseña",
    historyTitle: "Historial de Fortaleza de Contraseña",
    footerText: "💡 Impulsado por un diseño moderno | Construido para seguridad",
  },
  kn: {
    title: "ಪಾಸ್ವರ್ಡ್ ಶಕ್ತಿ ಪರಿಶೀಲಕ",
    description: "ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಶಕ್ತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಭದ್ರತೆಯನ್ನು ಸುಧಾರಿಸಿ.",
    usernameLabel: "👤 ಬಳಕೆದಾರ ಹೆಸರು",
    passwordLabel: "🔑 ಪಾಸ್ವರ್ಡ್",
    historyTitle: "ಪಾಸ್ವರ್ಡ್ ಶಕ್ತಿ ಇತಿಹಾಸ",
    footerText: "💡 ಆಧುನಿಕ ವಿನ್ಯಾಸದಿಂದ ಚಾಲಿತ | ಭದ್ರತೆಗೆ ನಿರ್ಮಿತವಾಗಿದೆ",
  },
};

let passwordHistory = [];

// Enhanced Password Strength Checking Logic
function checkPasswordStrength() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const strengthBar = document.getElementById("strength-bar");
  const feedback = document.getElementById("feedback");
  const userMessage = document.getElementById("user-message");

  const minLength = 12; // Minimum length for a secure password
  const commonPasswords = [
    "password", "123456", "qwerty", "letmein", "12345", "welcome", "admin", "123123", "iloveyou"
  ]; // Common passwords
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const noRepeats = /^(?!.*([a-zA-Z0-9])\1{2,}).*$/.test(password); // No repeated characters
  const noSequential = !/(012|123|234|345|456|567|678|789|890|1234|2345|3456)/.test(password); // No sequential patterns

  let strength = 0;

  // Check if password meets each criteria
  if (password.length >= minLength) strength++;
  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumbers) strength++;
  if (hasSpecialChar) strength++;
  if (noRepeats) strength++;
  if (noSequential) strength++;

  // Check for common passwords
  if (commonPasswords.includes(password.toLowerCase())) {
    feedback.innerText = "Your password is too common. Please choose a stronger password.";
    strength = 0; // Set as weak if it's common
  }

  // Determine password strength
  let barWidth = "0%";
  let barColor = "#f44336"; // Red for weak
  let strengthLabel = "Weak";

  if (strength >= 6) {
    barWidth = "100%";
    barColor = "#4caf50"; // Green for strong
    strengthLabel = "Strong";
    feedback.innerText = "Strong password. Great job!";
  } else if (strength >= 4) {
    barWidth = "70%";
    barColor = "#ffeb3b"; // Yellow for moderate
    strengthLabel = "Moderate";
    feedback.innerText = "Moderate password. Consider improving it.";
  } else {
    barWidth = "30%";
    barColor = "#f44336"; // Red for weak
    feedback.innerText = "Weak password. Please make it stronger.";
  }

  strengthBar.style.width = barWidth;
  strengthBar.style.backgroundColor = barColor;

  if (username) userMessage.innerText = `${username}, your password is "${strengthLabel}".`;

  // Add to history
  if (password) {
    passwordHistory.push(`${new Date().toLocaleTimeString()} - ${strengthLabel}`);
    updateHistory();
  }
}

// Update History
function updateHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = passwordHistory
    .slice(-5) // Show the last 5 entries
    .map((entry) => `<li>${entry}</li>`)
    .join("");
}

// Toggle Dark Mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Change Language
function changeLanguage() {
  const lang = document.getElementById("language-select").value;
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("description").innerText = translations[lang].description;
  document.getElementById("username-label").innerText = translations[lang].usernameLabel;
  document.getElementById("password-label").innerText = translations[lang].passwordLabel;
  document.getElementById("history-title").innerText = translations[lang].historyTitle;
  document.getElementById("footer-text").innerText = translations[lang].footerText;
}
