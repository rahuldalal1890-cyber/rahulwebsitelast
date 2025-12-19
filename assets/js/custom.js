document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LAB 5 – CONTACT FORM (100% FIXED)
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

    function markInvalid(el) {
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");
    }

    function markValid(el) {
      el.classList.remove("is-invalid");
      el.classList.add("is-valid");
    }

    function checkForm() {
      let ok = true;

      [nameInput, surnameInput, phoneInput, addressInput].forEach(i => {
        if (i.value.trim().length < 2) {
          markInvalid(i); ok = false;
        } else markValid(i);
      });

      if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        markInvalid(emailInput); ok = false;
      } else markValid(emailInput);

      [rating1, rating2, rating3].forEach(r => {
        if (r.value < 1 || r.value > 10) {
          markInvalid(r); ok = false;
        } else markValid(r);
      });

      submitBtn.disabled = !ok;
      return ok;
    }

    form.querySelectorAll("input").forEach(i =>
      i.addEventListener("input", checkForm)
    );

    form.addEventListener("submit", e => {
      e.preventDefault();

      const data = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        rating1: rating1.value,
        rating2: rating2.value,
        rating3: rating3.value,
        savedAt: new Date().toLocaleString()
      };

      localStorage.setItem("rahul_contact_data", JSON.stringify(data));

      resultsBox.innerHTML = "✅ Data saved successfully (localStorage)";
      form.reset();
      submitBtn.disabled = true;
    });
  }

  
  /* =====================================================
     SMART WATCH – SAFE & WORKING (UNCHANGED)
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

    window.walk = () => {
      steps += Math.floor(Math.random() * 200);
      stepsEl.textContent = steps;
      if (battery > 0) battery--;
      batteryEl.textContent = battery + "%";
    };

    window.resetWatch = () => {
      steps = 3500;
      battery = 85;
      stepsEl.textContent = steps;
      batteryEl.textContent = battery + "%";
    };
  }

  /* =====================================================
     LAB 6 – MEMORY GAME + TIMER (UNCHANGED)
  ====================================================== */
  const board = document.getElementById("gameBoard");
  if (!board) return;

  const movesEl = document.getElementById("moves");
  const matchesEl = document.getElementById("matches");
  const winMsg = document.getElementById("winMessage");
  const startBtn = document.getElementById("startGame");
  const restartBtn = document.getElementById("restartGame");
  const difficulty = document.getElementById("difficulty");
  const timeGameEl = document.getElementById("gameTime");

  const emojis = ['🍎','🍌','🍇','🍒','🍉','🍍','🥝','🍑','🍓','🍊','🍋','🥭'];

  let firstCard = null;
  let lock = false;
  let moves = 0;
  let matches = 0;
  let totalPairs = 0;

  let seconds = 0;
  let timerInterval = null;

  function startTimer() {
    stopTimer();
    seconds = 0;
    timeGameEl.textContent = "0";
    timerInterval = setInterval(() => {
      seconds++;
      timeGameEl.textContent = seconds;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
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
    board.style.gridTemplateColumns =
      hard ? "repeat(6,1fr)" : "repeat(4,1fr)";

    const deck = [...emojis.slice(0, totalPairs), ...emojis.slice(0, totalPairs)]
      .sort(() => Math.random() - 0.5);

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
        stopTimer();
      }
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

  startBtn.addEventListener("click", setupGame);
  restartBtn.addEventListener("click", setupGame);
  difficulty.addEventListener("change", setupGame);

});


