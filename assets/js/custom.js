document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     FORM ELEMENTS
  ============================== */
  const form = document.getElementById("raj-contact-form");
  if (!form) return;

  const resultsBox = document.getElementById("form-results");
  const submitBtn = form.querySelector("button[type='submit']");

  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");

  const rating1 = document.getElementById("rating1");
  const rating2 = document.getElementById("rating2");
  const rating3 = document.getElementById("rating3");

  submitBtn.disabled = true;

  /* =============================
     HELPERS
  ============================== */
  function showError(input, msg) {
    input.classList.add("is-invalid");
    let small = input.nextElementSibling;
    if (small) small.textContent = msg;
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    let small = input.nextElementSibling;
    if (small) small.textContent = "";
  }

  /* =============================
     VALIDATION
  ============================== */
  function validateName() {
    const v = nameInput.value.trim();
    if (!/^[A-Za-z]+$/.test(v)) return showError(nameInput, "Letters only"), false;
    clearError(nameInput); return true;
  }

  function validateSurname() {
    const v = surnameInput.value.trim();
    if (!/^[A-Za-z]+$/.test(v)) return showError(surnameInput, "Letters only"), false;
    clearError(surnameInput); return true;
  }

  function validateEmail() {
    const v = emailInput.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) return showError(emailInput, "Invalid email"), false;
    clearError(emailInput); return true;
  }

  function validateAddress() {
    if (addressInput.value.trim().length < 5)
      return showError(addressInput, "Address too short"), false;
    clearError(addressInput); return true;
  }

  function validatePhone() {
    let digits = phoneInput.value.replace(/\D/g, "");
    if (digits.startsWith("370")) digits = digits.slice(3);
    digits = digits.slice(0, 8);

    phoneInput.value = "+370 6" + digits.slice(0,2) + (digits.length > 2 ? " " + digits.slice(2) : "");

    if (digits.length !== 8)
      return showError(phoneInput, "Format: +370 6xx xxxxx"), false;

    clearError(phoneInput); return true;
  }

  function validateRating(input) {
    const v = Number(input.value);
    if (isNaN(v) || v < 0 || v > 10)
      return showError(input, "0–10 only"), false;
    clearError(input); return true;
  }

  function checkForm() {
    const ok =
      validateName() &&
      validateSurname() &&
      validateEmail() &&
      validatePhone() &&
      validateAddress() &&
      validateRating(rating1) &&
      validateRating(rating2) &&
      validateRating(rating3);

    submitBtn.disabled = !ok;
    return ok;
  }

  /* =============================
     REAL-TIME VALIDATION
  ============================== */
  [
    nameInput, surnameInput, emailInput,
    phoneInput, addressInput,
    rating1, rating2, rating3
  ].forEach(el => el.addEventListener("input", checkForm));

  /* =============================
     SUBMIT
  ============================== */
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!checkForm()) return;

    const data = {
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
      r1: Number(rating1.value),
      r2: Number(rating2.value),
      r3: Number(rating3.value)
    };

    console.log("Form Data:", data);

    const avg = ((data.r1 + data.r2 + data.r3) / 3).toFixed(1);

    let color = "red";
    if (avg >= 4 && avg < 7) color = "orange";
    if (avg >= 7) color = "green";

    resultsBox.innerHTML = `
      <p>Name: ${data.name}</p>
      <p>Surname: ${data.surname}</p>
      <p>Email: ${data.email}</p>
      <p>Phone: ${data.phone}</p>
      <p>Address: ${data.address}</p>
      <hr>
      <p style="font-weight:bold;color:${color}">
        ${data.name} ${data.surname}: ${avg}
      </p>
    `;

    // Success popup
    const popup = document.createElement("div");
    popup.textContent = "✔ Form submitted successfully!";
    popup.style.cssText = `
      position:fixed;
      top:20px;
      right:20px;
      background:#34b7a7;
      color:#fff;
      padding:14px 18px;
      border-radius:12px;
      font-weight:600;
      z-index:99999;
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
  });

});






document.addEventListener("DOMContentLoaded", () => {

  const board = document.getElementById("gameBoard");
  const scoreEl = document.getElementById("score");
  const winMsg = document.getElementById("winMessage");

  // 👉 Safety check (agar page me game nahi hai)
  if (!board || !scoreEl || !winMsg) return;

  const emojis = ['🍎','🍌','🍇','🍒','🍉','🍍'];
  const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  let firstCard = null;
  let lockBoard = false;
  let score = 0;
  let matches = 0;

  // CREATE CARDS
  cards.forEach(emoji => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.emoji = emoji;
    card.textContent = "";

    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  function flipCard(card) {
    if (lockBoard) return;
    if (card.classList.contains("matched")) return;
    if (card === firstCard) return;

    card.classList.add("revealed");
    card.textContent = card.dataset.emoji;

    if (!firstCard) {
      firstCard = card;
      return;
    }

    lockBoard = true;

    if (firstCard.dataset.emoji === card.dataset.emoji) {
      // MATCH
      firstCard.classList.add("matched");
      card.classList.add("matched");

      score++;
      matches++;
      scoreEl.textContent = score;

      resetTurn();

      if (matches === emojis.length) {
        winMsg.style.display = "block";
      }
    } else {
      // NO MATCH
      setTimeout(() => {
        firstCard.textContent = "";
        card.textContent = "";
        firstCard.classList.remove("revealed");
        card.classList.remove("revealed");
        resetTurn();
      }, 800);
    }
  }

  function resetTurn() {
    firstCard = null;
    lockBoard = false;
  }

});
