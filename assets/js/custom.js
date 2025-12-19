document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LAB 5 – CONTACT FORM (SAFE)
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
    }

    function clearError(input) {
      input.classList.remove("is-invalid");
    }

    function validate(input, regex) {
      if (!regex.test(input.value.trim())) {
        showError(input);
        return false;
      }
      clearError(input);
      return true;
    }

    function validatePhone() {
      let digits = phoneInput.value.replace(/\D/g, "");
      if (digits.length !== 11) return false;
      return true;
    }

    function checkForm() {
      const ok =
        validate(nameInput, /^[A-Za-z]+$/) &&
        validate(surnameInput, /^[A-Za-z]+$/) &&
        validate(emailInput, /^\S+@\S+\.\S+$/) &&
        validatePhone();

      submitBtn.disabled = !ok;
      return ok;
    }

    [nameInput, surnameInput, emailInput, phoneInput, addressInput, rating1, rating2, rating3]
      .forEach(el => el.addEventListener("input", checkForm));

    form.addEventListener("submit", e => {
      e.preventDefault();
      resultsBox.innerHTML = `<p>Form submitted successfully</p>`;
    });
  }

  /* =====================================================
     SMART WATCH – UI PROJECT (FINAL FIX)
  ====================================================== */
  const timeEl = document.getElementById("time");
  if (timeEl) {

    const dateEl = document.getElementById("date");
    const heartEl = document.getElementById("heart");
    const stepsEl = document.getElementById("steps");
    const batteryEl = document.getElementById("battery");

    let steps = 3500;
    let battery = 85;

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

    setInterval(() => {
      heartEl.textContent = Math.floor(Math.random() * 20) + 60;
    }, 2000);

    window.walk = function () {
      steps += Math.floor(Math.random() * 200);
      stepsEl.textContent = steps;
      if (battery > 0) battery--;
      batteryEl.textContent = battery + "%";
    };

    window.resetWatch = function () {
      steps = 3500;
      battery = 85;
      stepsEl.textContent = steps;
      batteryEl.textContent = battery + "%";
    };
  }

  /* =====================================================
     LAB 6 – MEMORY GAME (FINAL, SAFE)
  ====================================================== */
  const board = document.getElementById("gameBoard");
  if (board) {

    const movesEl = document.getElementById("moves");
    const matchesEl = document.getElementById("matches");
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

    function setupGame() {
      board.innerHTML = "";
      moves = 0;
      matches = 0;
      movesEl.textContent = "0";
      matchesEl.textContent = "0";
      winMsg.style.display = "none";

      const hard = difficulty.value === "hard";
      totalPairs = hard ? 12 : 6;
      board.style.gridTemplateColumns = hard ? "repeat(6,1fr)" : "repeat(4,1fr)";

      const deck = [...emojis.slice(0, totalPairs), ...emojis.slice(0, totalPairs)]
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
      if (lock || card === firstCard || card.classList.contains("matched")) return;

      card.textContent = card.dataset.emoji;

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
        if (matches === totalPairs) winMsg.style.display = "block";
      } else {
        setTimeout(() => {
          firstCard.textContent = "";
          card.textContent = "";
          reset();
        }, 800);
      }
    }

    function reset() {
      firstCard = null;
      lock = false;
    }

    startBtn.onclick = setupGame;
    restartBtn.onclick = setupGame;
    difficulty.onchange = setupGame;
  }

});
