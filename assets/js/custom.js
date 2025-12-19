document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LAB 5 – CONTACT FORM (UNCHANGED, SAFE)
  ====================================================== */
  const form = document.getElementById("raj-contact-form");
  if (form) {

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

      phoneInput.value = "+370 6" + digits.slice(0, 2) +
        (digits.length > 2 ? " " + digits.slice(2) : "");

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

    [
      nameInput, surnameInput, emailInput,
      phoneInput, addressInput,
      rating1, rating2, rating3
    ].forEach(el => el.addEventListener("input", checkForm));

    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!checkForm()) return;

      const avg = (
        Number(rating1.value) +
        Number(rating2.value) +
        Number(rating3.value)
      ) / 3;

      let color = avg < 4 ? "red" : avg < 7 ? "orange" : "green";

      resultsBox.innerHTML = `
        <p>Name: ${nameInput.value}</p>
        <p>Surname: ${surnameInput.value}</p>
        <p>Email: ${emailInput.value}</p>
        <p>Phone: ${phoneInput.value}</p>
        <p>Address: ${addressInput.value}</p>
        <hr>
        <p style="font-weight:bold;color:${color}">
          ${nameInput.value} ${surnameInput.value}: ${avg.toFixed(1)}
        </p>
      `;

      const popup = document.createElement("div");
      popup.textContent = "✔ Form submitted successfully!";
      popup.style.cssText =
        "position:fixed;top:20px;right:20px;background:#34b7a7;color:#fff;padding:14px 18px;border-radius:12px;font-weight:600;z-index:99999;";
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 2500);
    });
  }

  /* =====================================================
     LAB 6 – MEMORY GAME (FIXED, FULLY COMPLIANT)
  ====================================================== */
  const board = document.getElementById("gameBoard");
  if (!board) return;

  const movesEl = document.getElementById("moves");
  const matchesEl = document.getElementById("matches");
  const winMsg = document.getElementById("winMessage");
  const startBtn = document.getElementById("startGame");
  const restartBtn = document.getElementById("restartGame");
  const difficulty = document.getElementById("difficulty");

  const allEmojis = ['🍎','🍌','🍇','🍒','🍉','🍍','🥝','🍑','🍓','🍊','🍋','🥭'];

  let firstCard = null;
  let lock = false;
  let moves = 0;
  let matches = 0;
  let started = false;

  function setupGame() {
    board.innerHTML = "";
    winMsg.style.display = "none";
    moves = 0;
    matches = 0;
    firstCard = null;
    lock = false;

    movesEl.textContent = "0";
    matchesEl.textContent = "0";

    let pairs = difficulty.value === "hard" ? 12 : 6;
    let cols = difficulty.value === "hard" ? 6 : 4;

    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const deck = [...allEmojis.slice(0, pairs), ...allEmojis.slice(0, pairs)]
      .sort(() => Math.random() - 0.5);

    deck.forEach(e => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.emoji = e;
      card.onclick = () => flip(card);
      board.appendChild(card);
    });
  }

  function flip(card) {
    if (!started || lock || card === firstCard || card.classList.contains("matched")) return;

    card.textContent = card.dataset.emoji;
    card.classList.add("revealed");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    moves++;
    movesEl.textContent = moves;
    lock = true;

    if (firstCard.dataset.emoji === card.dataset.emoji) {
      firstCard.classList.add("matched");
      card.classList.add("matched");
      matches++;
      matchesEl.textContent = matches;
      reset();

      if (matches === board.children.length / 2) {
        winMsg.style.display = "block";
        started = false;
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = "";
        card.textContent = "";
        firstCard.classList.remove("revealed");
        card.classList.remove("revealed");
        reset();
      }, 800);
    }
  }

  function reset() {
    firstCard = null;
    lock = false;
  }

  startBtn.onclick = () => { started = true; setupGame(); };
  restartBtn.onclick = () => { started = true; setupGame(); };

});
