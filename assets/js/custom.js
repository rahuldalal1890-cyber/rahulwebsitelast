document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LAB 5 – CONTACT FORM (SAVE + COLOR – WORKING)
  ====================================================== */
  const contactForm = document.getElementById("rahul-contact-form");
  if (contactForm) {

    const resultBox = document.getElementById("form-results");
    const submitBtn = contactForm.querySelector("button[type='submit']");

    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const r1 = document.getElementById("rating1");
    const r2 = document.getElementById("rating2");
    const r3 = document.getElementById("rating3");

    submitBtn.disabled = true;

    function valid(el, ok) {
      el.classList.toggle("is-valid", ok);
      el.classList.toggle("is-invalid", !ok);
    }

    function check() {
      const ok =
        name.value.length > 1 &&
        surname.value.length > 1 &&
        /^\S+@\S+\.\S+$/.test(email.value) &&
        phone.value.length > 5 &&
        address.value.length > 3 &&
        r1.value >= 1 && r1.value <= 10 &&
        r2.value >= 1 && r2.value <= 10 &&
        r3.value >= 1 && r3.value <= 10;

      valid(name, name.value.length > 1);
      valid(surname, surname.value.length > 1);
      valid(email, /^\S+@\S+\.\S+$/.test(email.value));
      valid(phone, phone.value.length > 5);
      valid(address, address.value.length > 3);
      valid(r1, r1.value >= 1 && r1.value <= 10);
      valid(r2, r2.value >= 1 && r2.value <= 10);
      valid(r3, r3.value >= 1 && r3.value <= 10);

      submitBtn.disabled = !ok;
      return ok;
    }

    [name, surname, email, phone, address, r1, r2, r3]
      .forEach(el => el.addEventListener("input", check));

    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!check()) return;

      localStorage.setItem("rahul_contact_data", JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        rating1: r1.value,
        rating2: r2.value,
        rating3: r3.value
      }));

      resultBox.innerHTML = "✅ Data saved successfully";
      resultBox.style.color = "green";

      contactForm.reset();
      submitBtn.disabled = true;
      document.querySelectorAll(".is-valid,.is-invalid")
        .forEach(el => el.classList.remove("is-valid","is-invalid"));
    });
  }

  /* =====================================================
     SMART WATCH – CLOCK + BUTTONS (SAFE)
  ====================================================== */
  const timeEl = document.getElementById("time");
  if (timeEl) {

    const dateEl = document.getElementById("date");
    const heart = document.getElementById("heart");
    const stepsEl = document.getElementById("steps");
    const batteryEl = document.getElementById("battery");

    let steps = 3500, battery = 85;

    function updateTime() {
      const d = new Date();
      timeEl.textContent =
        String(d.getHours()).padStart(2,"0") + ":" +
        String(d.getMinutes()).padStart(2,"0");
      dateEl.textContent = d.toDateString();
    }

    updateTime();
    setInterval(updateTime, 1000);
    setInterval(() => heart.textContent = 60 + Math.floor(Math.random()*20), 2000);

    window.walk = () => {
      steps += 100;
      stepsEl.textContent = steps;
      if (battery > 0) battery--;
      batteryEl.textContent = battery + "%";
    };

    window.resetWatch = () => {
      steps = 3500; battery = 85;
      stepsEl.textContent = steps;
      batteryEl.textContent = battery + "%";
    };
  }

  /* =====================================================
     LAB 6 – MEMORY GAME + TIMER (WORKING)
  ====================================================== */
  const board = document.getElementById("gameBoard");
  if (board) {

    const movesEl = document.getElementById("moves");
    const matchesEl = document.getElementById("matches");
    const timeEl = document.getElementById("gameTime");
    const winMsg = document.getElementById("winMessage");
    const startBtn = document.getElementById("startGame");
    const restartBtn = document.getElementById("restartGame");

    const emojis = ['🍎','🍌','🍇','🍒','🍉','🍍'];
    let first = null, lock = false, moves = 0, matches = 0;
    let seconds = 0, timer = null;

    function startTimer() {
      clearInterval(timer);
      seconds = 0;
      timeEl.textContent = "0";
      timer = setInterval(() => timeEl.textContent = ++seconds, 1000);
    }

    function setup() {
      board.innerHTML = "";
      first = null; lock = false;
      moves = matches = 0;
      movesEl.textContent = matchesEl.textContent = "0";
      winMsg.style.display = "none";

      startTimer();

      [...emojis, ...emojis].sort(() => Math.random() - 0.5)
        .forEach(e => {
          const c = document.createElement("div");
          c.className = "card";
          c.onclick = () => flip(c, e);
          board.appendChild(c);
        });
    }

    function flip(card, val) {
      if (lock || card === first) return;
      card.textContent = val;

      if (!first) { first = card; return; }

      movesEl.textContent = ++moves;
      lock = true;

      if (first.textContent === card.textContent) {
        matchesEl.textContent = ++matches;
        first = null; lock = false;

        if (matches === emojis.length) {
          clearInterval(timer);
          winMsg.style.display = "block";
        }
      } else {
        setTimeout(() => {
          card.textContent = "";
          first.textContent = "";
          first = null; lock = false;
        }, 700);
      }
    }

    startBtn.onclick = setup;
    restartBtn.onclick = setup;
  }

});
