document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LAB 5 – CONTACT FORM (SAFE, UNCHANGED)
  ====================================================== */
  const form = document.getElementById("rahul-contact-form");
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
      const small = input.nextElementSibling;
      if (small) small.textContent = msg;
    }
/* =====================================================
   SMART WATCH – UI PROJECT (LAST LAB)
   Author: Rahul Dalal
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== SAFETY CHECK ===== */
  const timeEl = document.getElementById("time");
  if (!timeEl) return;   // agar smartwatch page nahi hai → kuch mat karo

  const dateEl = document.getElementById("date");
  const heartEl = document.getElementById("heart");
  const stepsEl = document.getElementById("steps");
  const batteryEl = document.getElementById("battery");

  /* ===== DEFAULT VALUES ===== */
  let steps = 3500;
  let battery = 85;

  /* ===== TIME & DATE ===== */
  function updateTime() {
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;

    timeEl.textContent = h + ":" + m;
    dateEl.textContent = now.toDateString();
  }

  updateTime();
  setInterval(updateTime, 1000);

  /* ===== HEART RATE SIMULATION ===== */
  setInterval(() => {
    heartEl.textContent = Math.floor(Math.random() * 20) + 60;
  }, 2000);

  /* ===== WALK BUTTON ===== */
  window.walk = function () {
    steps += Math.floor(Math.random() * 200);
    stepsEl.textContent = steps;

    if (battery > 0) {
      battery--;
      batteryEl.textContent = battery + "%";
    }
  };

  /* ===== RESET BUTTON ===== */
  window.resetWatch = function () {
    steps = 3500;
    battery = 85;

    stepsEl.textContent = steps;
    batteryEl.textContent = battery + "%";
  };

});

    function clearError(input) {
      input.classList.remove("is-invalid");
      const small = input.nextElementSibling;
      if (small) small.textContent = "";
    }

    function validate(input, regex, msg) {
      if (!regex.test(input.value.trim())) {
        showError(input, msg);
        return false;
      }
      clearError(input);
      return true;
    }

    function validatePhone() {
      let digits = phoneInput.value.replace(/\D/g, "");
      if (digits.startsWith("370")) digits = digits.slice(3);
      digits = digits.slice(0, 8);

      phoneInput.value =
        "+370 6" + digits.slice(0, 2) +
        (digits.length > 2 ? " " + digits.slice(2) : "");

      if (digits.length !== 8) {
        showError(phoneInput, "Format: +370 6xx xxxxx");
        return false;
      }
      clearError(phoneInput);
      return true;
    }

    function checkForm() {
      const ok =
        validate(nameInput, /^[A-Za-z]+$/, "Letters only") &&
        validate(surnameInput, /^[A-Za-z]+$/, "Letters only") &&
        validate(emailInput, /^\S+@\S+\.\S+$/, "Invalid email") &&
        validatePhone() &&
        addressInput.value.trim().length >= 5 &&
        [rating1, rating2, rating3].every(r => r.value >= 0 && r.value <= 10);

      submitBtn.disabled = !ok;
      return ok;
    }

    [nameInput, surnameInput, emailInput, phoneInput, addressInput, rating1, rating2, rating3]
      .forEach(el => el.addEventListener("input", checkForm));

    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!checkForm()) return;

      const avg = ((+rating1.value + +rating2.value + +rating3.value) / 3).toFixed(1);
      const color = avg < 4 ? "red" : avg < 7 ? "orange" : "green";

      resultsBox.innerHTML = `
        <p><b>${nameInput.value} ${surnameInput.value}</b></p>
        <p>Average: <span style="color:${color}">${avg}</span></p>
      `;
    });
  }

  /* =====================================================
     LAB 6 – MEMORY GAME + OPTIONAL TIMER (FINAL)
  ====================================================== */
  const board = document.getElementById("gameBoard");
  if (!board) return;

  const movesEl = document.getElementById("moves");
  const matchesEl = document.getElementById("matches");
  const timeEl = document.getElementById("time");
  const winMsg = document.getElementById("winMessage");
  const startBtn = document.getElementById("startGame");
  const restartBtn = document.getElementById("restartGame");
  const difficulty = document.getElementById("difficulty");

  const emojis = ['🍎','🍌','🍇','🍒','🍉','🍍','🥝','🍑','🍓','🍊','🍋','🥭'];

  let firstCard = null;
  let lock = false;
  let moves = 0;
  let matches = 0;
  let totalPairs = 0;

  /* TIMER */
  let seconds = 0;
  let timerInterval = null;

  function startTimer() {
    stopTimer();
    seconds = 0;
    timeEl.textContent = "0";
    timerInterval = setInterval(() => {
      seconds++;
      timeEl.textContent = seconds;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function setupGame() {
    board.innerHTML = "";
    firstCard = null;
    lock = false;
    moves = 0;
    matches = 0;

    movesEl.textContent = "0";
    matchesEl.textContent = "0";
    winMsg.style.display = "none";

    const hard = difficulty.value === "hard";
    totalPairs = hard ? 12 : 6;

    board.style.gridTemplateColumns = hard ? "repeat(6,1fr)" : "repeat(4,1fr)";

    const selected = emojis.slice(0, totalPairs);
    const deck = [...selected, ...selected].sort(() => Math.random() - 0.5);

    deck.forEach(e => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.emoji = e;
      card.addEventListener("click", () => flip(card));
      board.appendChild(card);
    });

    startTimer();
  }

  function flip(card) {
    if (lock || card === firstCard || card.classList.contains("matched")) return;

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

      if (matches === totalPairs) {
        winMsg.style.display = "block";
        stopTimer(); // ✅ STOP TIMER ON WIN
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

  startBtn.addEventListener("click", setupGame);
  restartBtn.addEventListener("click", setupGame);
  difficulty.addEventListener("change", setupGame);

});

